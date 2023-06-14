package com.tfg.automaticmenu.entity;

import java.util.*;

import static com.tfg.automaticmenu.utilities.ConstantCourses.*;
import static com.tfg.automaticmenu.utilities.ConstantGeneralUtilities.PERCENTAGE_CATEGORIES_MARGIN;
import static com.tfg.automaticmenu.utilities.ConstantGeneralUtilities.KCAL_MARGIN;
import static com.tfg.automaticmenu.utilities.ConstantMeals.*;

public class DailyMenu {
    public String weekId;
    public Map<String, List<Dish>> weeklyMenu;
    private int kcal;

    public DailyMenu(User user, String weekId, List<Dish> allMealsAvailable, Map<String, Integer> kcalPerMeal) {
        this.weekId = weekId;
        this.weeklyMenu = new HashMap<>();
        generateDailyMenu(user, allMealsAvailable, kcalPerMeal);
    }

    private void generateDailyMenu(User user, List<Dish> allMealsAvailable, Map<String, Integer> kcalPerMeal) {
        boolean repeat = true;
        while(repeat) {
            if(!weeklyMenu.isEmpty()) weeklyMenu.clear();
            for (Map.Entry<String, Integer> entry : kcalPerMeal.entrySet()) {
                this.kcal = 0;
                String meal = entry.getKey();
                int targetKcal = entry.getValue();
                int botBound = targetKcal - KCAL_MARGIN;
                int topBound = targetKcal + KCAL_MARGIN;
                List<Dish> dishesForDailyMenu = new ArrayList<>();

                if (meal == LUNCH || meal == DINNER || meal == BREAKFAST) {
                    dishesForDailyMenu = addComplexDishes(allMealsAvailable, botBound, topBound, meal);
                }
                else {
                    Dish simpleDish = getOneDish(UNIQUE_COURSE, allMealsAvailable, meal);
                    dishesForDailyMenu.add(simpleDish);
                }

                this.weeklyMenu.put(meal, dishesForDailyMenu);
            }
            repeat = !checkIngredientCategoriesPercentages(user, weeklyMenu);
        }
    }

    private List<Dish> addComplexDishes(List<Dish> allMealsAvailable, int botBound, int topBound, String meal) {
        List<Dish> dishes = new ArrayList<>();
        while(this.kcal < botBound || this.kcal > topBound) {
            this.kcal = 0;
            if(!dishes.isEmpty()) dishes.clear();
            if (justOneCourse()) {
                Dish unique = getOneDish(UNIQUE_COURSE, allMealsAvailable, meal);
                dishes.add(unique);
            } else {
                Dish firstDish = getOneDish(FIRST_COURSE, allMealsAvailable, meal);
                dishes.add(firstDish);
                Dish secondDish = getOneDish(SECOND_COURSE, allMealsAvailable, meal);
                dishes.add(secondDish);
            }
            Dish dessert;
            dessert = getOneDish(DESSERT_COURSE, allMealsAvailable, meal);
            dishes.add(dessert);
        }

        return dishes;
    }

    private Dish getOneDish(String typeOfCourse, List<Dish> allMealsAvailable, String meal) {
        List<Dish> allDishesWithTypeOfCourse = allMealsAvailable.stream().filter((dish ->
                dish.getDish().equals(typeOfCourse) && dish.getMeals().contains(meal))).toList();

        Dish dish = allDishesWithTypeOfCourse.get((int) (Math.random() * allDishesWithTypeOfCourse.size()));
        this.kcal += dish.getKcal();
        return dish;
    }

    private boolean justOneCourse() {
        Random random = new Random();
        return random.nextInt(4) == 0;
    }

    private boolean checkIngredientCategoriesPercentages(User user, Map<String, List<Dish>> menu) {
        double vegetables = 0;
        double carbohydrates = 0;
        double proteins = 0;
        for (Map.Entry<String, List<Dish>> entry : menu.entrySet()) {
            List<Dish> dishes = entry.getValue();
            double vegetablesMeal = 0;
            double carbohydratesMeal = 0;
            double proteinsMeal = 0;

            //recorre llista i sumar puntuació
            //dins del dish
            for(Dish dish : dishes) {
                List<Ingredient> ingredients = dish.getIngredients();
                double vegetablesDish = 0;
                double carbohydratesDish = 0;
                double proteinsDish = 0;
                //dins dels ingredients
                for(Ingredient ingredient : ingredients) {
                    ingredient.setIngredientCategory(ingredient.getCategory());
                    IngredientCategory ingredientCategory = ingredient.getIngredientCategory();
                    if(ingredientCategory == IngredientCategory.VEGETABLES && vegetablesDish == 0) {
                        if(dish.getDish().equals(DESSERT_COURSE)) vegetablesDish = 0.5;
                        else vegetablesDish++;
                    } else if(ingredientCategory == IngredientCategory.CARBOHYDRATES && carbohydratesDish == 0) {
                        if(dish.getDish().equals(DESSERT_COURSE)) carbohydrates = 0.5;
                        else carbohydratesDish++;
                    } else if(ingredientCategory == IngredientCategory.PROTEINS && proteinsDish == 0) {
                        if(dish.getDish().equals(DESSERT_COURSE)) proteins = 0.5;
                        else proteinsDish++;
                    }
                }
                vegetablesMeal += vegetablesDish;
                carbohydratesMeal += carbohydratesDish;
                proteinsMeal += proteinsDish;
            }
            vegetables += vegetablesMeal;
            carbohydrates += carbohydratesMeal;
            proteins += proteinsMeal;
        }

        double sum = vegetables + carbohydrates + proteins;

        //percentatges
        double vegetablesPercent = calculatePercentage(sum, vegetables);
        double carbohydratesPercent = calculatePercentage(sum, carbohydrates);
        double proteinsPercent = calculatePercentage(sum, proteins);

        return (percentagesAreValid(user, vegetablesPercent, carbohydratesPercent, proteinsPercent));
    }

    private double calculatePercentage(double sum, double category) {
        return category/sum*100;
    }

    private boolean percentagesAreValid(User user, double vegetablesPercent, double carbohydratesPercent, double proteinsPercent) {
        return(percentageCategoryIsValid(vegetablesPercent, user.getExerciseCombination().getVegetablesPercent()) &&
                percentageCategoryIsValid(carbohydratesPercent, user.getExerciseCombination().getCarbohydratesPercent()) &&
                percentageCategoryIsValid(proteinsPercent, user.getExerciseCombination().getProteinsPercent()));
    }

    private boolean percentageCategoryIsValid(double categoryPercentage, int targetPercentage) {
        return (categoryPercentage > targetPercentage-PERCENTAGE_CATEGORIES_MARGIN &&
                categoryPercentage < targetPercentage+PERCENTAGE_CATEGORIES_MARGIN);
    }

    public String getWeekId() {
        return weekId;
    }
    public Map<String, List<Dish>> getMenu() {
        return weeklyMenu;
    }
}
