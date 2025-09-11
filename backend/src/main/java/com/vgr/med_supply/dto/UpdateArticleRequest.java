package com.vgr.med_supply.dto;

import lombok.Data;

@Data
public class UpdateArticleRequest {
    // Only patch the count according to the specification
    // More fields could be added for update in the future
    private int count;
}
