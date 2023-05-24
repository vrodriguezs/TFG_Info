package com.tfg.automaticmenu.entity;

import java.util.List;

public class User {

    String name;
    int age;
    int weight;
    int height;
    String sex;
    String exRoutine;
    String exIntensity;
    String veg;
    int dishes;

    List<String> intoAler;
    List<String> ingredients;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExRoutine() {
        return exRoutine;
    }

    public void setExRoutine(String exRoutine) {
        this.exRoutine = exRoutine;
    }

    public String getExIntensity() {
        return exIntensity;
    }

    public void setExIntensity(String exIntensity) {
        this.exIntensity = exIntensity;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public String getVeg() {
        return veg;
    }

    public void setVeg(String veg) {
        this.veg = veg;
    }

    public int getDishes() {
        return dishes;
    }

    public void setDishes(int dishes) {
        this.dishes = dishes;
    }

    public List<String> getIntoAler() {
        return intoAler;
    }

    public void setIntoAler(List<String> intoAler) {
        this.intoAler = intoAler;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
}
