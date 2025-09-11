package com.vgr.med_supply.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateArticleRequest {
    // Only patch the count according to the specification
    // More fields could be added for update in the future
    @NotNull(message = "Count is required")
    @Min(value = 0, message = "Count must be 0 or greater")
    private Integer count;
}
