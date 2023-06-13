package com.tfg.automaticmenu.entity;

public enum ExerciseCombination {
    POC_O_CAP_EXERCICI("Poc o cap exercici", 1.2, 50, 30, 20),
    EXERCICI_LLEUGER("Exercici lleuger", 1.375, 40, 35, 25),
    EXERCICI_MODERAT("Exercici moderat", 1.55, 35, 40, 25),
    EXERCICI_FORT("Exercici fort", 1.725, 25, 45, 30);

    private final String name;
    private final double exFactor;
    private final int vegetablesPercent;
    private final int carbohydratesPercent;
    private final int proteinsPercent;

    ExerciseCombination(String name, double exFactor, int vegetablesPercent, int carbohydratesPercent, int proteinsPercent) {
        this.name = name;
        this.exFactor = exFactor;
        this.vegetablesPercent = vegetablesPercent;
        this.carbohydratesPercent = carbohydratesPercent;
        this.proteinsPercent = proteinsPercent;
    }

    public String getName() {
        return name;
    }

    public double getExFactor() {
        return exFactor;
    }

    public int getVegetablesPercent() {
        return vegetablesPercent;
    }

    public int getCarbohydratesPercent() {
        return carbohydratesPercent;
    }

    public int getProteinsPercent() {
        return proteinsPercent;
    }
}