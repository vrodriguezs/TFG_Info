package com.tfg.automaticmenu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.cloud.FirestoreClient;
import com.tfg.automaticmenu.entity.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static com.tfg.automaticmenu.utilities.ConstantGeneralUtilities.*;
import static com.tfg.automaticmenu.utilities.ConstantMeals.*;
import static com.tfg.automaticmenu.utilities.ConstantDays.*;

@Service
public class DishService {
    public String saveDish(Dish dish) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        ApiFuture< WriteResult > collectionApiFuture = dbFirestore.collection(COLLECTION_DISH_NAME).document().set(dish);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public String generateMenu(User user, String userId) throws Exception {
        System.out.println("COMENÇA "+userId);

        Firestore db = FirestoreClient.getFirestore();
        DocumentReference documentReference = db.collection("users").document(userId);
        CollectionReference recipesCollection = db.collection("dishes");

        Map<String, Object> updates = new HashMap<>();
        updates.put("weeklyMenu", Collections.emptyList());
        documentReference.update(updates);

        int kcal = (int) Math.round(calculateTotalKcal(user));
        List<String> intoAler = user.getIntoAler();
        List<String> ingredients = user.getIngredients();
        Boolean veg = vegToBoolean(user.getVeg());

        //map de les kcal per meal
        Map<String, Integer> kcalPerMeal = calculateKcalPerMeal(kcal, user.getDishes());
        //filtrar les receptes aptes per a l'usuari
        List<Dish> filteredRecipes = filterRecipes(recipesCollection, intoAler, veg, ingredients);
        List<DailyMenu> weeklyMenu = menuAlgorythm(user, kcalPerMeal, filteredRecipes);

        updateMenuField(documentReference, weeklyMenu);

        return "FUNCIONA:";
    }

    public Dish getSimilarDish(Dish dish, List<String> userIntoAler) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference recipesCollection = db.collection("dishes");
        ApiFuture<QuerySnapshot> future = recipesCollection.get();
        QuerySnapshot querySnapshot = future.get();

        boolean userHasAllergies = !userIntoAler.isEmpty();

        Dish similarDish = null;

        for (DocumentSnapshot document : querySnapshot.getDocuments()) {
            Dish newDish = document.toObject(Dish.class);
            if (hasMinimumRequisits(dish, newDish, userHasAllergies, userIntoAler)) {
                if (similarDish != null && isBetterDish(dish, similarDish, newDish)) similarDish = newDish;
                else similarDish = newDish;
            }
        }

        return similarDish;
    }

    private boolean hasMinimumRequisits(Dish dish, Dish newDish, boolean userHasAllergies, List<String> userIntoAler) {
        return isIntoAlerValid(userHasAllergies, newDish, userIntoAler)
                && newDish.getVeg() == dish.getVeg()
                && newDish.getDish().compareTo(dish.getDish()) == 0
                && newDish.getMeals().containsAll(dish.getMeals())
                && (newDish.getKcal() <= dish.getKcal() + 50  && newDish.getKcal() >= dish.getKcal() - 50);
    }

    private boolean isBetterDish(Dish dish, Dish similarDish, Dish newDish) {
        return Math.abs(dish.getKcal() - similarDish.getKcal()) < Math.abs(dish.getKcal() - newDish.getKcal());
    }

    private static void updateMenuField(DocumentReference documentRef, List<DailyMenu> weeklyMenu) throws Exception {
        Map<String, Object> updates = new HashMap<>();
        updates.put("weeklyMenu", weeklyMenu);

        ApiFuture<WriteResult> future = documentRef.update(updates);
        future.get();

        System.out.println("Menu field updated successfully.");
    }

    private Boolean vegToBoolean(String veg) {
        return !veg.equals("No");
    }

    private double calculateTotalKcal(User user) {
        double tmb = calculateTMB(user.getSex(), user.getWeight(), user.getHeight(), user.getAge());
        return Math.round(tmb * user.getExerciseCombination().getExFactor());
    }

    private double calculateTMB(String sex, int weight, int height, int age) {
        if(sex == WOMAN) {
            return Math.round(447.593 + (9.247*weight) + (3.098*height) - (4.330*age));
        }
        else {
            return Math.round(88.362 + (13.397*weight) + (4.799*height) - (5.677*age));
        }
    }

    private Map<String, Integer> calculateKcalPerMeal(int kcal, int meals) {
        Map<String, Integer> kcalPerMeal = new LinkedHashMap<>();

        switch(meals) {
            case 2:
                putMealMap(kcalPerMeal, BREAKFAST, kcal, 0.4);
                putMealMap(kcalPerMeal, LUNCH, kcal, 0.6);
                break;
            case 3:
                putMealMap(kcalPerMeal, BREAKFAST, kcal, 0.35);
                putMealMap(kcalPerMeal, LUNCH, kcal, 0.45);
                putMealMap(kcalPerMeal, DINNER, kcal, 0.2);
                break;
            case 4:
                putMealMap(kcalPerMeal, BREAKFAST, kcal, 0.3);
                putMealMap(kcalPerMeal, LUNCH, kcal, 0.4);
                putMealMap(kcalPerMeal, SNACK, kcal, 0.1);
                putMealMap(kcalPerMeal, DINNER, kcal, 0.2);
                break;
            case 5:
                putMealMap(kcalPerMeal, BREAKFAST, kcal, 0.25);
                putMealMap(kcalPerMeal, BRUNCH, kcal, 0.1);
                putMealMap(kcalPerMeal, LUNCH, kcal, 0.35);
                putMealMap(kcalPerMeal, SNACK, kcal, 0.1);
                putMealMap(kcalPerMeal, DINNER, kcal, 0.2);
                break;
        }

        return kcalPerMeal;
    }

    private void putMealMap(Map<String, Integer> kcalPerMeal, String meal, int kcal, double percent) {
        kcalPerMeal.put(meal, (int) Math.round(kcal*percent));
    }

    private List<DailyMenu> menuAlgorythm(User user, Map<String, Integer> kcalPerMeal, List<Dish> filteredRecipes) throws Exception {
        List<DailyMenu> weeklyMenu = new ArrayList<>();

        for (int weekDaysNumber = 1; weekDaysNumber < 8 ; weekDaysNumber ++) {
            weeklyMenu.add(new DailyMenu(user, getWeekDayName(weekDaysNumber), filteredRecipes, kcalPerMeal));
        }

        return weeklyMenu;
    }

    private String getWeekDayName(int day) throws Exception {
        switch (day) {
            case 1: return MONDAY;
            case 2: return TUESDAY;
            case 3: return WEDNESDAY;
            case 4: return THURSDAY;
            case 5: return FRIDAY;
            case 6: return SATURDAY;
            case 7: return SUNDAY;
            default: throw new Exception("Invalid number for getWeekDayNumber");
        }
    }

    private static List<Dish> filterRecipes(CollectionReference recipesCollection, List<String> userIntoAler, boolean isUserVegan,
                                            List<String> userDislikedIngredients) throws ExecutionException, InterruptedException {
        List<Dish> filteredRecipes = new ArrayList<>();

        //agafar receptes de la col·lecció
        ApiFuture<QuerySnapshot> future = recipesCollection.get();
        QuerySnapshot querySnapshot = future.get();

        boolean userHasAllergies = !userIntoAler.isEmpty();

        //recórrer totes les receptes
        for (DocumentSnapshot document : querySnapshot.getDocuments()) {
            Dish dish = document.toObject(Dish.class);

            boolean isIntoAlerValid = isIntoAlerValid(userHasAllergies, dish, userIntoAler);

            //verificar si la recepta és apte per a vegs
            boolean isDishVegan = dish.getVeg();
            boolean isVeganValid = isVeganValid(isDishVegan, isUserVegan);

            boolean hasDislikedIngredients = hasDislikedIngredients(userDislikedIngredients, dish);

            if (isIntoAlerValid && isVeganValid && !hasDislikedIngredients) {
                Dish newdish = new Dish();
                newdish.setName(dish.getName());
                newdish.setIngredients(dish.getIngredients());
                filteredRecipes.add(dish);
            }
        }

        return filteredRecipes;
    }

    private static boolean isIntoAlerValid(boolean userHasAllergies, Dish dish, List<String> userIntoAler) {
        //verificar si la recepta té les intoAler de l'usuari
        boolean dishHasAllergies = false;
        if(userHasAllergies) {
            List<String> recipeIntoAler = dish.getIntoAler();
            dishHasAllergies = userIntoAler.stream().anyMatch(recipeIntoAler::contains);
        }
        return (!userHasAllergies || !dishHasAllergies);
    }

    private static boolean isVeganValid(boolean isDishVegan, boolean isUserVegan) {
        return (!isUserVegan || (isDishVegan == isUserVegan));
    }

    private static boolean hasDislikedIngredients(List<String> userDislikedIngredients, Dish dish) {
        List<String> recipeIngredients = dish.getIngredients().stream()
                .map(Ingredient::getName)
                .collect(Collectors.toList());

        //convertir a minúsculas
        List<String> lowercaseUserDislikedIngredients = userDislikedIngredients.stream()
                .map(String::toLowerCase)
                .collect(Collectors.toList());

        List<String> lowercaseRecipeIngredients = recipeIngredients.stream()
                .map(String::toLowerCase)
                .collect(Collectors.toList());

        //verificar si la recepta té els ingredients que li agraden a l'usuari
        boolean hasDislikedIngredients = lowercaseUserDislikedIngredients.stream().anyMatch(lowercaseRecipeIngredients::contains);
        return hasDislikedIngredients;
    }
}
