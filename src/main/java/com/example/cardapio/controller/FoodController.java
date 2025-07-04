package com.example.cardapio.controller;

import com.example.cardapio.food.Food;
import com.example.cardapio.food.FoodRepository;
import com.example.cardapio.food.FoodRequestDTO;
import com.example.cardapio.food.FoodResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("food")
public class FoodController {

    @Autowired
    private FoodRepository repo;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<FoodResponseDTO> getAll(){
        List<FoodResponseDTO> foodList = repo.findAllByOrderByIdAsc().stream().map(FoodResponseDTO::new).toList();
        return foodList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveFood(@RequestBody FoodRequestDTO data){
        Food food = new Food(data);
        repo.save(food);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable long id, @RequestBody FoodRequestDTO data){
        Optional<Food> food = repo.findById(id);
        if (food.isPresent()){
            Food updatedFood = food.get();
            updatedFood.setTitle(data.title());
            updatedFood.setImage(data.image());
            updatedFood.setPrice(data.price());

            repo.save(updatedFood);
            return ResponseEntity.ok(updatedFood);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable long id){
        Optional<Food> food = repo.findById(id);
        if (food.isPresent()){
            repo.deleteById(id);
        }
    }
}