package com.vgr.med_supply.dto;

import lombok.Data;

@Data
public class ArticleDto {
    private Long id;
    private String name;
    private Integer count;
    private String unit;
    private String icon;
    private String description;
    private String supplier;
    private String price;
    private String category;
}
