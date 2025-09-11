package com.vgr.med_supply.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterArticleRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Count is required")
    @Min(value = 0, message = "Count must be 0 or greater")
    private Integer count;

    @NotBlank(message = "Unit is required")
    private String unit;
}
