package com.tfg.automaticmenu.entity;

import java.util.ArrayList;
import java.util.List;

public class Course {

    String name;
    List<Dish> dishes;

    public Course(String name) {
        this.name = name;
        dishes = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Dish> getDishes() {
        return dishes;
    }

    public void setDishes(List<Dish> dishes) {
        this.dishes = dishes;
    }

    public void addDish(Dish dish) {
        dishes.add(dish);
    }
}
