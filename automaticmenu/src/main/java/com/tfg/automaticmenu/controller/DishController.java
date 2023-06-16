package com.tfg.automaticmenu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tfg.automaticmenu.entity.*;
import com.tfg.automaticmenu.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class DishController {

    @Autowired
    private DishService dishService;

    @PostMapping("/dishes")
    public String saveDish(@RequestBody Dish dish) throws ExecutionException, InterruptedException {
        return dishService.saveDish(dish);
    }

    @PostMapping("/generate-menu")
    public void generateMenu(@RequestBody UserAndId userAndId) throws Exception {
        String userId = userAndId.getUserId();
        User user = userAndId.getUser();
        dishService.generateMenu(user, userId);
    }

    @PostMapping("/similar-dish")
    public Dish getSimilarDish(@RequestBody DishAndIntoAler dishAndIntoAler) throws Exception {
        Dish dish = dishAndIntoAler.getDish();
        List<String> intoAlerUser = dishAndIntoAler.getIntoAlerUser();
        return dishService.getSimilarDish(dish, intoAlerUser);
    }


}
