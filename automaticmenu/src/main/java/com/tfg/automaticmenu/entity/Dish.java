package com.tfg.automaticmenu.entity;

import java.util.List;

public class Dish {

    String name;
    String time;
    int kcal;
    List<Ingredient> ingredients;
    Boolean veg;
    Boolean includeRecipe;
    List<String> meals;
    String dish;
    List<String> recipe;

    List<String> optional;
    List<String> intoAler;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getKcal() {
        return kcal;
    }

    public void setKcal(int kcal) {
        this.kcal = kcal;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Boolean getVeg() {
        return veg;
    }

    public void setVeg(Boolean veg) {
        this.veg = veg;
    }

    public Boolean getIncludeRecipe() {
        return includeRecipe;
    }

    public void setIncludeRecipe(Boolean includeRecipe) {
        this.includeRecipe = includeRecipe;
    }

    public List<String> getMeals() {
        return meals;
    }

    public void setMeals(List<String> meals) {
        this.meals = meals;
    }

    public String getDish() {
        return dish;
    }

    public void setDish(String dish) {
        this.dish = dish;
    }

    public List<String> getRecipe() {
        return recipe;
    }

    public void setRecipe(List<String> recipe) {
        this.recipe = recipe;
    }

    public List<String> getOptional() {
        return optional;
    }

    public void setOptional(List<String> optional) {
        this.optional = optional;
    }

    public List<String> getIntoAler() {
        return intoAler;
    }

    public void setIntoAler(List<String> intoAler) {
        this.intoAler = intoAler;
    }
}
