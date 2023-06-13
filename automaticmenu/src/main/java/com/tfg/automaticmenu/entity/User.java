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
    ExerciseCombination exerciseCombination;

    public String getName() {
        return name;
    }

    public String getExRoutine() {
        return exRoutine;
    }

    public String getExIntensity() {
        return exIntensity;
    }

    public String getSex() {
        return sex;
    }

    public int getAge() {
        return age;
    }

    public int getWeight() {
        return weight;
    }

    public int getHeight() {
        return height;
    }

    public String getVeg() {
        return veg;
    }

    public int getDishes() {
        return dishes;
    }

    public List<String> getIntoAler() {
        return intoAler;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public ExerciseCombination getExerciseCombination() {
        if (exRoutine.equals("A vegades") && exIntensity.equals("Alta")) {
            return ExerciseCombination.EXERCICI_LLEUGER;
        } else if (exRoutine.equals("Sovint")) {
            if (exIntensity.equals("Mitjana") || exIntensity.equals("Alta")) {
                return ExerciseCombination.EXERCICI_MODERAT;
            }
        } else if (exRoutine.equals("Diari")) {
            if (exIntensity.equals("Mitjana") || exIntensity.equals("Alta")) {
                return ExerciseCombination.EXERCICI_FORT;
            }
        }
        return ExerciseCombination.POC_O_CAP_EXERCICI;
    }



}
