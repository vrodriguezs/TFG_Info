package com.tfg.automaticmenu.entity;

import java.util.ArrayList;
import java.util.List;

public class Dish {

    private String name;
    private String time;
    private int kcal;
    private List<Ingredient> ingredients;
    private Boolean veg;
    private Boolean includeRecipe;
    private List<String> meals;
    private String dish;
    private List<String> recipe;
    private List<String> optional;
    private List<String> intoAler;


    public Dish() {
        ingredients = new ArrayList<>();
    }

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

    public void addIngredient(Ingredient ingredient) {
        ingredients.add(ingredient);
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
