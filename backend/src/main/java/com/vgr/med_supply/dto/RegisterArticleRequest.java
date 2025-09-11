package com.vgr.med_supply.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleRequest {
    private String name;
    private int count;
    private String unit;
}
