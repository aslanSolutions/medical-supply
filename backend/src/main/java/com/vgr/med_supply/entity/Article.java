package com.vgr.med_supply.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String unit;

    private int count;
}
