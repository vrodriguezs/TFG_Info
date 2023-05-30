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
            int targetKcal = entry.getValue();
            int botBound = targetKcal - 100;
            int topBound = targetKcal + 100;
            System.out.println("Àpat: "+meal.toUpperCase());
            List<Dish> temporaryDishesForDailyMenu = new ArrayList<>();
            List<Dish> dishesForDailyMenu = new ArrayList<>();

            if (meal == LUNCH || meal == DINNER || meal == BREAKFAST) {
                dishesForDailyMenu = addComplexDishes(allMealsAvailable, botBound, topBound, meal);
            }
            else {
                System.out.println("UNIQUE COURSE");
                Dish simpleDish = getOneDish(UNIQUE_COURSE, allMealsAvailable, meal);
                dishesForDailyMenu.add(simpleDish);
                System.out.println("\nChosen unique dish: "+simpleDish.getName()+"\n");
                System.out.println(botBound+" "+this.kcal+" "+topBound+"\n\n");
            }

            this.menu.put(meal, dishesForDailyMenu);
        }
    }

    private List<Dish> addComplexDishes(List<Dish> allMealsAvailable, int botBound, int topBound, String meal) {
        List<Dish> dishes = new ArrayList<>();
        while(this.kcal < botBound || this.kcal > topBound) {
            this.kcal = 0;
            if(!dishes.isEmpty()) dishes.clear();
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
                Dish secondDish = getOneDish(SECOND_COURSE, allMealsAvailable, meal);
                dishes.add(secondDish);
                System.out.println("\nChosen second dish: "+secondDish.getName()+"\n");
            }
            Dish dessert;
            System.out.println("DESERT");
            dessert = getOneDish(DESSERT_COURSE, allMealsAvailable, meal);
            dishes.add(dessert);
            System.out.println("\nChosen dessert: "+dessert.getName());
            System.out.println(botBound+" "+this.kcal+" "+topBound+"\n\n");
        }

        return dishes;
    }

    private Dish getOneDish(String typeOfCourse, List<Dish> allMealsAvailable, String meal) {
        List<Dish> allDishesWithTypeOfCourse = allMealsAvailable.stream().filter((dish ->
                dish.getDish().equals(typeOfCourse) && dish.getMeals().contains(meal))).toList();
        System.out.println("\tNumber of "+typeOfCourse+" dishes in the "+meal+": "+allDishesWithTypeOfCourse.size());
        /*for(Dish d : allDishesWithTypeOfCourse) {
            System.out.println("\t\t"+d.getName());
        }*/
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
