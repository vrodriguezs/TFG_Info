package com.tfg.automaticmenu.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.tfg.automaticmenu.entity.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class DishService {

    private static final String COLLECTION_DISH_NAME = "dishes";
    private static final String COLLECTION_DAY_NAME = "days";
    private static final String WOMAN = "Dona";
    private static final int KCAL_MARGIN = 100;
    public static final String BREAKFAST = "Esmorzar";
    public static final String BRUNCH = "Mig Matí";
    public static final String LUNCH = "Dinar";
    public static final String SNACK = "Berenar";
    public static final String DINNER = "Sopar";

    public String saveDish(Dish dish) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        ApiFuture< WriteResult > collectionApiFuture = dbFirestore.collection(COLLECTION_DISH_NAME).document().set(dish);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public boolean generateMenu(User user) throws ExecutionException, InterruptedException, JsonProcessingException {
        int kcal = (int) Math.round(calculateTotalKcal(user));
        int maxKcal = kcal+KCAL_MARGIN;
        int minKcal = kcal-KCAL_MARGIN;

        //calculate kcal per dish, depending on the dishes the user does

        /*Day day1 = new Day("Dilluns");
        Meal meal1Day1 = new Meal("Esmorzar");
        Course course1Meal1Day1 = new Course("Primer");

        Dish dish1Course1Meal1Day1 = new Dish();
        dish1Course1Meal1Day1.setName("Torrades amb xocolata");
        dish1Course1Meal1Day1.addIngredient(new Ingredient("Ingrediente 1"));
        dish1Course1Meal1Day1.addIngredient(new Ingredient("Ingrediente 2"));
        course1Meal1Day1.addDish(dish1Course1Meal1Day1);

        Dish dish2Course1Meal1Day1 = new Dish();
        dish1Course1Meal1Day1.setName("Entrepà de pernil");
        dish2Course1Meal1Day1.addIngredient(new Ingredient("Ingrediente 3"));
        dish2Course1Meal1Day1.addIngredient(new Ingredient("Ingrediente 4"));
        course1Meal1Day1.addDish(dish2Course1Meal1Day1);

        meal1Day1.addCourse(course1Meal1Day1);
        day1.addMeal(meal1Day1);

        Firestore dbFirestore = FirestoreClient.getFirestore();

        ApiFuture< WriteResult > collectionApiFuture = dbFirestore.collection(COLLECTION_DAY_NAME).document().set(day1);

        System.out.println(collectionApiFuture.get().getUpdateTime().toString());*/

        System.out.println("COMENÇA");
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference recipesCollection = db.collection("dishes");

        List<String> intoAler = user.getIntoAler();
        List<String> ingredients = user.getIngredients();
        Boolean veg = vegToBoolean(user.getVeg());

        // Filtrar las recetas aptas para el usuario
        Map<String, Integer> kcalPerMeal = calculateKcalPerMeal(kcal, user.getDishes());
        List<Dish> filteredRecipes = filterRecipes(recipesCollection, intoAler, veg, ingredients);
        menuAlgorythm(kcalPerMeal, filteredRecipes);

        return true;
    }

    private Boolean vegToBoolean(String veg) {
        return !veg.equals("No");
    }

    private double calculateTotalKcal(User user) {
        double tmb = calculateTMB(user.getSex(), user.getWeight(), user.getHeight(), user.getAge());
        double exFactor = calculateExFactor(user.getExRoutine(), user.getExIntensity());

        return Math.round(tmb * exFactor);
    }

    private double calculateTMB(String sex, int weight, int height, int age) {
        if(sex == WOMAN) {
            return Math.round(447.593 + (9.247*weight) + (3.098*height) - (4.330*age));
        }
        else {
            return Math.round(88.362 + (13.397*weight) + (4.799*height) - (5.677*age));
        }
    }

    private double calculateExFactor(String exRoutine, String exIntensity) {
        return 1.2;
    }

    //fix percentages
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

    private String menuAlgorythm(Map<String, Integer> kcalPerMeal, List<Dish> filteredRecipes) throws JsonProcessingException {
        List<DailyMenu> menu = new ArrayList<>();

        for (int weekDaysNumber = 7; weekDaysNumber > 0; weekDaysNumber --) {
            menu.add(new DailyMenu(getWeekDayName(weekDaysNumber), filteredRecipes, kcalPerMeal)
        }

        return null;
    }

    private String getWeekDayName(int day) {
        switch (day) {
            case 1: return "Dl"; break;
            case 2: return "Dm"; break;
            case 3: return "Dm"; break;
            case 4: return "Dj"; break;
            case 5: return "Dv"; break;
            case 6: return "Ds"; break;
            case 7: return "Dg"; break;
            default: throw new Exception("Invalid number for getWeekDayNumber")
        }
    }

    /*
    * menu: dias con su menu diario (esmorzar, dinar, brenar, sopar)
    * menu diari: esmorzar + list(plat), dinar + list(plat), brenar + list(plat), sopar + list(plat)
    * */

    private Map<String, Dish> dailyMenu ( Map<String, Dish> menu, Map<String, Integer> kcalPerMeal, List<Dish> filteredRecipes) {
        for (Map.Entry<String, Integer> entry : kcalPerMeal.entrySet()) {
            String meal = entry.getKey();
            List<Dish> allMealsAvailable = filteredRecipes.stream().filter((recipes) -> recipes.getMeals().contains(meal)).toList();
            menu.put(meal, allMealsAvailable.remove())
        }
    }

    private static List<Dish> filterRecipes(CollectionReference recipesCollection, List<String> userIntoAler, boolean isUserVegan, List<String> userDislikedIngredients) throws ExecutionException, InterruptedException {
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
