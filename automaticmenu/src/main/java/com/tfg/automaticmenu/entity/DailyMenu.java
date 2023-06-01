package com.tfg.automaticmenu.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.tfg.automaticmenu.utilities.ConstantCourses.*;
import static com.tfg.automaticmenu.utilities.ConstantGeneralUtilities.PERCENTAGE_CATEGORIES_MARGIN;
import static com.tfg.automaticmenu.utilities.ConstantMeals.*;

public class DailyMenu {
    public String weekId;
    public Map<String, List<Dish>> menu;
    private int kcal;

    public DailyMenu(String weekId, List<Dish> allMealsAvailable, Map<String, Integer> kcalPerMeal) {
        this.weekId = weekId;
        this.menu = new HashMap<>();
        generateDailyMenu(allMealsAvailable, kcalPerMeal);
        System.out.println("FINAL MENU");
        for (Map.Entry<String, List<Dish>> entry : menu.entrySet()) {
            String meal = entry.getKey();
            List<Dish> dishes = entry.getValue();
            System.out.println(meal);
            for(Dish dish : dishes) {
                System.out.println("\t- "+dish.getName());
            }
            System.out.println();
        }
    }

    private void generateDailyMenu(List<Dish> allMealsAvailable, Map<String, Integer> kcalPerMeal) {
        boolean repeat = true;
        while(repeat) {
            if(!menu.isEmpty()) menu.clear();
            for (Map.Entry<String, Integer> entry : kcalPerMeal.entrySet()) {
                this.kcal = 0;
                String meal = entry.getKey();
                int targetKcal = entry.getValue();
                int botBound = targetKcal - 100;
                int topBound = targetKcal + 100;
                //System.out.println("Àpat: "+meal.toUpperCase());
                List<Dish> temporaryDishesForDailyMenu = new ArrayList<>();
                List<Dish> dishesForDailyMenu = new ArrayList<>();

                if (meal == LUNCH || meal == DINNER || meal == BREAKFAST) {
                    dishesForDailyMenu = addComplexDishes(allMealsAvailable, botBound, topBound, meal);
                }
                else {
                    //System.out.println("UNIQUE COURSE");
                    Dish simpleDish = getOneDish(UNIQUE_COURSE, allMealsAvailable, meal);
                    dishesForDailyMenu.add(simpleDish);
                    //System.out.println("\nChosen unique dish: "+simpleDish.getName()+"\n");
                    //System.out.println(botBound+" "+this.kcal+" "+topBound+"\n\n");
                }

                this.menu.put(meal, dishesForDailyMenu);
            }
            repeat = !checkIngredientCategoriesPercentages(menu);
        }
    }

    private List<Dish> addComplexDishes(List<Dish> allMealsAvailable, int botBound, int topBound, String meal) {
        List<Dish> dishes = new ArrayList<>();
        while(this.kcal < botBound || this.kcal > topBound) {
            this.kcal = 0;
            if(!dishes.isEmpty()) dishes.clear();
            if (justOneCourse()) {
                //System.out.println("UNIQUE COURSE");
                Dish unique = getOneDish(UNIQUE_COURSE, allMealsAvailable, meal);
                dishes.add(unique);
                //System.out.println("\nChosen unique dish: "+unique.getName()+"\n");
            } else {
                //System.out.println("FIRST COURSE");
                Dish firstDish = getOneDish(FIRST_COURSE, allMealsAvailable, meal);
                dishes.add(firstDish);
                //System.out.println("\nChosen first dish: "+firstDish.getName()+"\n");
                //System.out.println("SECOND COURSE");
                Dish secondDish = getOneDish(SECOND_COURSE, allMealsAvailable, meal);
                dishes.add(secondDish);
                //System.out.println("\nChosen second dish: "+secondDish.getName()+"\n");
            }
            Dish dessert;
            //System.out.println("DESERT");
            dessert = getOneDish(DESSERT_COURSE, allMealsAvailable, meal);
            dishes.add(dessert);
            //System.out.println("\nChosen dessert: "+dessert.getName());
            //System.out.println(botBound+" "+this.kcal+" "+topBound+"\n\n");
        }

        return dishes;
    }

    private Dish getOneDish(String typeOfCourse, List<Dish> allMealsAvailable, String meal) {
        List<Dish> allDishesWithTypeOfCourse = allMealsAvailable.stream().filter((dish ->
                dish.getDish().equals(typeOfCourse) && dish.getMeals().contains(meal))).toList();
        //System.out.println("\tNumber of "+typeOfCourse+" dishes in the "+meal+": "+allDishesWithTypeOfCourse.size());
        /*for(Dish d : allDishesWithTypeOfCourse) {
            System.out.println("\t\t"+d.getName());
        }*/
        Dish dish = allDishesWithTypeOfCourse.get((int) (Math.random() * allDishesWithTypeOfCourse.size()));
        this.kcal += dish.getKcal();
        return dish;
    }
    private boolean justOneCourse() { return false; }

    //acabar d mirar tema enum, constantExercises... se li ha d passar x paràmetre
    private boolean checkIngredientCategoriesPercentages(Map<String, List<Dish>> menu) {
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

        return (percentagesAreValid(vegetablesPercent, carbohydratesPercent, proteinsPercent));
    }

    private double calculatePercentage(double sum, double category) {
        return category/sum*100;
    }

    private boolean percentagesAreValid(double vegetablesPercent, double carbohydratesPercent, double proteinsPercent) {
        return(percentageCategoryIsValid(vegetablesPercent, 50) &&
                percentageCategoryIsValid(carbohydratesPercent, 30) &&
                percentageCategoryIsValid(proteinsPercent, 20));
    }

    private boolean percentageCategoryIsValid(double categoryPercentage, int targetPercentage) {
        return (categoryPercentage > targetPercentage-PERCENTAGE_CATEGORIES_MARGIN &&
                categoryPercentage < targetPercentage+PERCENTAGE_CATEGORIES_MARGIN);
    }

    public String getWeekId() {
        return weekId;
    }

    public void setWeekId(String weekId) {
        this.weekId = weekId;
    }

    public Map<String, List<Dish>> getMenu() {
        return menu;
    }

    public void setMenu(Map<String, List<Dish>> menu) {
        this.menu = menu;
    }
}
