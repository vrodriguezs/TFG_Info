package com.tfg.automaticmenu.entity;

import static com.tfg.automaticmenu.utilities.ConstantIngredientsCategories.*;

public class Ingredient {

    String name;
    String category;

    IngredientCategory ingredientCategory;

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

    public IngredientCategory getIngredientCategory() {
        return ingredientCategory;
    }

    public void setIngredientCategory(String category) {
        if(category.equalsIgnoreCase(FRUITS) || category.equalsIgnoreCase(VEGETABLES)) {
            this.ingredientCategory = IngredientCategory.VEGETABLES;
        }
        else if(category.equalsIgnoreCase(GRAINS) || category.equalsIgnoreCase(LEGUMES)) {
            this.ingredientCategory = IngredientCategory.CARBOHYDRATES;
        }
        else if(category.equalsIgnoreCase(PROTEINS) || category.equalsIgnoreCase(MILK_AND_DERIVATIVES)) {
            this.ingredientCategory = IngredientCategory.PROTEINS;
        }
    }
}