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
            List<Dish> dishesForDailyMenu = new ArrayList<>();

            if (meal == LUNCH || meal == DINNER || meal == BREAKFAST) {
                dishesForDailyMenu = addComplexDishes(allMealsAvailable, maxKcal);
            }
            else {
                dishesForDailyMenu.add(getOneDish(UNIQUE_COURSE, allMealsAvailable));
            }

            this.menu.put(meal, dishesForDailyMenu);

        }
    }

    private List<Dish> addComplexDishes(List<Dish> allMealsAvailable, int maxKcal) {
        List<Dish> dishes = new ArrayList<>();
        if (justOneCourse()) {
            dishes.add(getOneDish(UNIQUE_COURSE, allMealsAvailable));
        } else {
            dishes.add(getOneDish(FIRST_COURSE, allMealsAvailable));
            Dish secondDish;
            do { secondDish = getOneDish(SECOND_COURSE, allMealsAvailable); }
            while (this.kcal < maxKcal);
            dishes.add(secondDish);
        }
        Dish dessert;
        do { dessert = getOneDish(DESSERT_COURSE, allMealsAvailable); }
        while (this.kcal + dessert.getKcal() > maxKcal + 5);
        dishes.add(dessert);

        return dishes;
    }

    private Dish getOneDish(String typeOfCourse, List<Dish> allMealsAvailable) {
        List<Dish> allDishesWithTypeOfCourse = allMealsAvailable.stream().filter((dish -> dish.getDish() == typeOfCourse)).toList();
        Dish dish = allDishesWithTypeOfCourse.get((int) (Math.random() * allDishesWithTypeOfCourse.size() - 1));
        this.kcal += dish.getKcal();
        return dish;
    }
    private boolean justOneCourse() { return true; }
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
