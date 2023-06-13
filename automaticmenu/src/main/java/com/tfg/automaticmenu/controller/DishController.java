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

    //s'ha d canviar a q retorni una list o algo amb el menu
    //o simplement q guardi el menu a la bbdd i segueixi sent void
    @PostMapping("/generate-menu")
    public String generateMenu(@RequestBody UserAndId userAndId) throws Exception {
        String userId = userAndId.getUserId();
        User user = userAndId.getUser();
        System.out.println(userId);
        return dishService.generateMenu(user, userId);
    }

    @PostMapping("/similar-dish")
    public Dish getSimilarDish(@RequestBody DishAndIntoAler dishAndIntoAler) throws Exception {
        Dish dish = dishAndIntoAler.getDish();
        List<String> intoAlerUser = dishAndIntoAler.getIntoAlerUser();
        return dishService.getSimilarDish(dish, intoAlerUser);
    }


}
