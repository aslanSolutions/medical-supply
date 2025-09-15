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

    private Integer count;

    private String icon;

    @Column(length = 1000)
    private String description;

    private String supplier;

    private String price;

    private String category;
}
