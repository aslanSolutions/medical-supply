package com.vgr.med_supply.controller;

import com.vgr.med_supply.dto.ArticleUsageDto;
import com.vgr.med_supply.repository.ArticleUsageRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/usage")
public class ArticleUsageController {
    private final ArticleUsageRepository articleUsageRepository;


    @GetMapping
    public ResponseEntity<List<ArticleUsageDto>> getDailyUsageTotals(
            @RequestParam("articleId") Long articleId,
            @RequestParam(value = "start", required = false) String startStr,
            @RequestParam(value = "end", required = false) String endStr
    ) {


        ZoneId zone = ZoneId.of("Europe/Stockholm");

        // Defaults: last 14 days (inclusive)
        LocalDate defaultEnd = LocalDate.now(zone);
        LocalDate defaultStart = defaultEnd.minusDays(13);

        LocalDate start = (startStr != null && !startStr.isBlank())
                ? LocalDate.parse(startStr)
                : defaultStart;

        LocalDate end = (endStr != null && !endStr.isBlank())
                ? LocalDate.parse(endStr)
                : defaultEnd;

        if (end.isBefore(start)) {
            return ResponseEntity.badRequest().build();
        }

        List<ArticleUsageRepository.DailyUsageSum> rows =
                articleUsageRepository.sumByArticleAndDateRange(articleId, start, end);

        List<ArticleUsageDto> result = rows.stream()
                .map(r -> new ArticleUsageDto(
                        r.getUsageDate(),
                        r.getTotal() == null ? 0 : r.getTotal()
                ))
                .toList();

        return ResponseEntity.ok(result);
    }

}
