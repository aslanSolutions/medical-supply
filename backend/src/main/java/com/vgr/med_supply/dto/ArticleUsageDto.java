package com.vgr.med_supply.dto;

import java.time.LocalDate;

public record ArticleUsageDto(
        LocalDate usageDate,
        int used
) {}
