package com.tfg.automaticmenu.entity;

public class Ingredient {

    String name;
    String category;

    public Ingredient() {
    }
    public Ingredient(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
