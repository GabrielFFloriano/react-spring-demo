package com.example.cardapio.food;

import jakarta.persistence.*;

@Entity(name = "foods")
@Table(name = "foods")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String img;
    private Integer price;
}
