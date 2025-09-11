package com.vgr.med_supply.dto;

import lombok.Data;

@Data
public class ArticleDto {
    private Long id;
    private String name;
    private int count;
    private String unit;
}
