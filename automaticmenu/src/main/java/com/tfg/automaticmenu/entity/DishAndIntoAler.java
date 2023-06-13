package com.tfg.automaticmenu.entity;

import java.util.List;

public class DishAndIntoAler {

    List<DailyMenu> menuData;
    Dish dish;
    String day;
    String meal;
    List<String> intoAlerUser;

    public DishAndIntoAler(List<DailyMenu> menuData, Dish dish, String day, String meal, List<String> intoAlerUser) {
        this.menuData = menuData;
        this.dish = dish;
        this.day = day;
        this.meal = meal;
        this.intoAlerUser = intoAlerUser;
    }

    public List<DailyMenu> getMenuData() {
        return menuData;
    }

    public Dish getDish() {
        return dish;
    }

    public String getDay() {
        return day;
    }

    public String getMeal() {
        return meal;
    }

    public List<String> getIntoAlerUser() {
        return intoAlerUser;
    }
}
