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

@Service
public class DishService {

    private static final String COLLECTION_DISH_NAME = "dishes";
    private static final String COLLECTION_DAY_NAME = "days";
    private static final String WOMAN = "Dona";
    private static final int KCAL_MARGIN = 100;
    private static final String BREAKFAST = "Esmorzar";
    private static final String BRUNCH = "Mig Matí";
    private static final String LUNCH = "Dinar";
    private static final String SNACK = "Berenar";
    private static final String DINNER = "Sopar";

    public String saveDish(Dish dish) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        ApiFuture< WriteResult > collectionApiFuture = dbFirestore.collection(COLLECTION_DISH_NAME).document().set(dish);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public boolean generateMenu(User user) throws ExecutionException, InterruptedException, JsonProcessingException {
        /*int kcal = (int) Math.round(calculateTotalKcal(user));
        int maxKcal = kcal+KCAL_MARGIN;
        int minKcal = kcal-KCAL_MARGIN;

        //calculate kcal per dish, depending on the dishes the user does
        Map<String, Integer> kcalPerDish = calculateKcalPerDish(kcal, user.getDishes());
        System.out.println("Total kcal "+kcal);
        for (Map.Entry<String, Integer> entry : kcalPerDish.entrySet()) {
            String dish = entry.getKey();
            int kcalDish = entry.getValue();
            System.out.println(dish+": "+kcalDish+" kcal");
        }
        System.out.println(user.getIntoAler());
        System.out.println(user.getIngredients());

        List<String> intoAler = user.getIntoAler();
        List<String> ingredients = user.getIngredients();
        String dayJson = menuAlgorythm(kcalPerDish, intoAler, ingredients);

        Firestore dbFirestore = FirestoreClient.getFirestore();

        ApiFuture< WriteResult > collectionApiFuture;

        //el COLLECTION_DAY_NAME ha d'anar canviant d nom (dia)
        for (int i = 0; i<7; i++) {
            collectionApiFuture = dbFirestore.collection(COLLECTION_DAY_NAME).document().set(dayJson);
            System.out.println("Time: "+collectionApiFuture.get().getUpdateTime());
        }*/

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
        List<Dish> filteredRecipes = filterRecipes(recipesCollection, intoAler, veg, ingredients);

        System.out.println("Size: "+filteredRecipes.size());

        // Imprimir las recetas filtradas
        for (Dish dish : filteredRecipes) {
            System.out.print("Recipe: " + dish.getName());
            System.out.print("\t\tIngredients: " + ingredientToName(dish.getIngredients()));
            System.out.println("\t\tAlergies: " + dish.getIntoAler());
        }

        System.out.println("ACABA");
        return true;
    }

    private List<String> ingredientToName(List<Ingredient> ingredients) {
        List<String> names = new ArrayList<>();
        for(Ingredient i : ingredients) {
            names.add(i.getName());
        }
        return names;
    }

    private Boolean vegToBoolean(String veg) {
        if(veg.equals("No")) return false;
        else return true;
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
        return 1;
    }

    //fix percentages
    private Map<String, Integer> calculateKcalPerDish(int kcal, int dishes) {
        Map<String, Integer> kcalPerDish = new LinkedHashMap<>();
        switch(dishes) {
            case 2:
                putDishMap(kcalPerDish, BREAKFAST, kcal, 0.4);
                putDishMap(kcalPerDish, LUNCH, kcal, 0.6);
                break;
            case 3:
                putDishMap(kcalPerDish, BREAKFAST, kcal, 0.35);
                putDishMap(kcalPerDish, LUNCH, kcal, 0.45);
                putDishMap(kcalPerDish, DINNER, kcal, 0.2);
                break;
            case 4:
                putDishMap(kcalPerDish, BREAKFAST, kcal, 0.3);
                putDishMap(kcalPerDish, LUNCH, kcal, 0.4);
                putDishMap(kcalPerDish, SNACK, kcal, 0.1);
                putDishMap(kcalPerDish, DINNER, kcal, 0.2);
                break;
            case 5:
                putDishMap(kcalPerDish, BREAKFAST, kcal, 0.25);
                putDishMap(kcalPerDish, BRUNCH, kcal, 0.1);
                putDishMap(kcalPerDish, LUNCH, kcal, 0.35);
                putDishMap(kcalPerDish, SNACK, kcal, 0.1);
                putDishMap(kcalPerDish, DINNER, kcal, 0.2);
                break;
        }

        return kcalPerDish;
    }

    private void putDishMap(Map<String, Integer> kcalPerDish, String dish, int kcal, double percent) {
        kcalPerDish.put(dish, (int) Math.round(kcal*percent));
    }

    /*private String menuAlgorythm(Map<String, Integer> kcalPerDish, List<String> intoAler, List<String> ingredients) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();



        return mapper.writeValueAsString(day);
    }*/

    private static List<Dish> filterRecipes(CollectionReference recipesCollection, List<String> userIntoAler, boolean isUserVegan, List<String> userDislikedIngredients) throws ExecutionException, InterruptedException {
        List<Dish> filteredRecipes = new ArrayList<>();

        //agafar receptes de la col·lecció
        ApiFuture<QuerySnapshot> future = recipesCollection.get();
        QuerySnapshot querySnapshot = future.get();

        System.out.println("Longitut inicial de les receptes: " + querySnapshot.size());
        System.out.println("Ingredients que no agraden: "+userDislikedIngredients);

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
