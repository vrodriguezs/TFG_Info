package com.tfg.automaticmenu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.tfg.automaticmenu.entity.Dish;
import com.tfg.automaticmenu.entity.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class DishService {

    private static final String COLLECTION_NAME = "dishes";
    private static final String WOMAN = "Dona";
    private static final int KCAL_MARGIN = 200;
    private static final String BREAKFAST = "Esmorzar";
    private static final String BRUNCH = "Mig Matí";
    private static final String LUNCH = "Dinar";
    private static final String SNACK = "Berenar";
    private static final String DINNER = "Sopar";

    public String saveDish(Dish dish) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        ApiFuture< WriteResult > collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document().set(dish);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public void generateMenu(User user) {
        int kcal = (int) Math.round(calculateTotalKcal(user));
        int maxKcal = kcal+KCAL_MARGIN;
        int minKcal = kcal-KCAL_MARGIN;

        //calculate kcal per dish, depending on the dishes the user does
        calculateKcalPerDish(kcal, user.getDishes());
    }

    private double calculateTotalKcal(User user) {
        double tmb = calculateTMB(user.getSex(), user.getWeight(), user.getHeight(), user.getAge());
        double exFactor = calculateExFactor(user.getExRoutine(), user.getExIntensity());

        return Math.round(tmb * exFactor);
    }

    private double calculateTMB(String sex, int weight, int height, int age) {
        if(sex == WOMAN) {
            return Math.round(447.593 + (9.247*weight) + (3.098*height) - (4.330*age));
        }
        else {
            return Math.round(88.362 + (13.397*weight) + (4.799*height) - (5.677*age));
        }
    }

    private double calculateExFactor(String exRoutine, String exIntensity) {
        return 0;
    }

    //fix percentages
    private Map<String, Integer> calculateKcalPerDish(int kcal, int dishes) {
        Map<String, Integer> kcalPerDish = new HashMap<>();
        switch(dishes) {
            case 2:
                putDishMap(kcalPerDish, BREAKFAST, kcal, 0.4);
                putDishMap(kcalPerDish, LUNCH, kcal, 0.6);
            case 3:
                putDishMap(kcalPerDish, BREAKFAST, kcal, 0.35);
                putDishMap(kcalPerDish, LUNCH, kcal, 0.45);
                putDishMap(kcalPerDish, DINNER, kcal, 0.2);
            case 4:
                putDishMap(kcalPerDish, BREAKFAST, kcal, 0.3);
                putDishMap(kcalPerDish, LUNCH, kcal, 0.4);
                putDishMap(kcalPerDish, SNACK, kcal, 0.1);
                putDishMap(kcalPerDish, DINNER, kcal, 0.2);
            case 5:
                putDishMap(kcalPerDish, BREAKFAST, kcal, 0.25);
                putDishMap(kcalPerDish, BRUNCH, kcal, 0.1);
                putDishMap(kcalPerDish, LUNCH, kcal, 0.35);
                putDishMap(kcalPerDish, SNACK, kcal, 0.1);
                putDishMap(kcalPerDish, DINNER, kcal, 0.2);
        }

        return kcalPerDish;
    }

    private void putDishMap(Map<String, Integer> kcalPerDish, String dish, int kcal, double percent) {
        kcalPerDish.put(dish, (int) Math.round(kcal*percent));
    }
}
