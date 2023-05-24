package com.tfg.automaticmenu.entity;

import java.util.ArrayList;
import java.util.List;

public class Day {

    String name;
    List<Meal> meals;

    public Day(String name) {
        this.name = name;
        meals = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Meal> getMeals() {
        return meals;
    }

    public void setMeals(List<Meal> meals) {
        this.meals = meals;
    }

    public void addMeal(Meal meal) {
        meals.add(meal);
    }
}
