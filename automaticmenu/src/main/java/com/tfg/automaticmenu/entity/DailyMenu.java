package com.tfg.automaticmenu.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.tfg.automaticmenu.service.DishService.*;

public class DailyMenu {
    public String weekId;
    public Map<String, List<Dish>> menu;

    public static final String FIRST_COURSE = "Primer";
    public static final String SECOND_COURSE = "Segon";
    public static final String DESSERT_COURSE = "Postre";
    public static final String UNIQUE_COURSE = "Unic";

    private int kcal;

    public DailyMenu(String weekId, List<Dish> allMealsAvailable, Map<String, Integer> kcalPerMeal) {
        this.weekId = weekId;
        this.menu = new HashMap<>();
        generateDailyMenu(allMealsAvailable, kcalPerMeal);
    }

    private void generateDailyMenu(List<Dish> allMealsAvailable, Map<String, Integer> kcalPerMeal) {
        for (Map.Entry<String, Integer> entry : kcalPerMeal.entrySet()) {
            this.kcal = 0;
            String meal = entry.getKey();
            int maxKcal = entry.getValue();
            System.out.println("Àpat: "+meal.toUpperCase());
            List<Dish> temporaryDishesForDailyMenu = new ArrayList<>();
            List<Dish> dishesForDailyMenu = new ArrayList<>();


            if (meal == LUNCH || meal == DINNER || meal == BREAKFAST) {
                dishesForDailyMenu = addComplexDishes(allMealsAvailable, maxKcal, meal);
            }
            else {
                dishesForDailyMenu.add(getOneDish(UNIQUE_COURSE, allMealsAvailable, meal));
            }

            this.menu.put(meal, dishesForDailyMenu);
        }
    }

    private List<Dish> addComplexDishes(List<Dish> allMealsAvailable, int maxKcal, String meal) {
        List<Dish> dishes = new ArrayList<>();
        if (justOneCourse()) {
            System.out.println("UNIQUE COURSE");
            Dish unique = getOneDish(UNIQUE_COURSE, allMealsAvailable, meal);
            dishes.add(unique);
            System.out.println("\nChosen unique dish: "+unique.getName()+"\n");
        } else {
            System.out.println("FIRST COURSE");
            Dish firstDish = getOneDish(FIRST_COURSE, allMealsAvailable, meal);
            dishes.add(firstDish);
            System.out.println("\nChosen first dish: "+firstDish.getName()+"\n");
            System.out.println("SECOND COURSE");
            Dish secondDish;
            secondDish = getOneDish(SECOND_COURSE, allMealsAvailable, meal);
            while (this.kcal > maxKcal) {
                this.kcal -= secondDish.getKcal();
                secondDish = getOneDish(SECOND_COURSE, allMealsAvailable, meal);
            }
            System.out.println("\nChosen second dish: "+secondDish.getName()+"\n");
            dishes.add(secondDish);
        }
        if(this.kcal < maxKcal) {
            Dish dessert;
            System.out.println("DESERT");
            dessert = getOneDish(DESSERT_COURSE, allMealsAvailable, meal);
            while (this.kcal + dessert.getKcal() > maxKcal) {
                this.kcal -= dessert.getKcal();
                dessert = getOneDish(DESSERT_COURSE, allMealsAvailable, meal);
            }
            /*do { dessert = getOneDish(DESSERT_COURSE, allMealsAvailable); }
            while (this.kcal + dessert.getKcal() > maxKcal + 5);*/
            System.out.println("\nChosen dessert: "+dessert.getName()+"\n\n");
            dishes.add(dessert);
        }

        return dishes;
    }

    private Dish getOneDish(String typeOfCourse, List<Dish> allMealsAvailable, String meal) {
        List<Dish> allDishesWithTypeOfCourse = allMealsAvailable.stream().filter((dish ->
                dish.getDish().equals(typeOfCourse) && dish.getMeals().contains(meal))).toList();
        System.out.println("\tDishes with type of course "+typeOfCourse+" and meal "+meal+ ": ");
        for(Dish d : allDishesWithTypeOfCourse) {
            System.out.println("\t\t"+d.getName());
        }
        Dish dish = allDishesWithTypeOfCourse.get((int) (Math.random() * allDishesWithTypeOfCourse.size()));
        this.kcal += dish.getKcal();
        return dish;
    }
    private boolean justOneCourse() { return false; }
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
