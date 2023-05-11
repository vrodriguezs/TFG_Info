package com.tfg.automaticmenu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.tfg.automaticmenu.entity.Dish;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class DishService {

    private static final String COLLECTION_NAME = "dishes";

    public String saveDish(Dish dish) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        ApiFuture< WriteResult > collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document().set(dish);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

}
