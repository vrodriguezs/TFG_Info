package com.tfg.automaticmenu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tfg.automaticmenu.entity.Dish;
import com.tfg.automaticmenu.entity.User;
import com.tfg.automaticmenu.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public boolean generateMenu(@RequestBody User user) throws ExecutionException, InterruptedException, JsonProcessingException {
        return dishService.generateMenu(user);
    }

}
