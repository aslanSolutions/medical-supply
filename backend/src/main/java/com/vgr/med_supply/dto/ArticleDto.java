package com.vgr.med_supply.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ArticleDto {
    private Long id;
    private String name;
    private String unit;
    private int count;
}
