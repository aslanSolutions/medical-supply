package com.vgr.med_supply.repository;

import com.vgr.med_supply.entity.ArticleUsage;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ArticleUsageRepository extends JpaRepository<ArticleUsage, Long> {

    interface DailyUsageSum {
        LocalDate getUsageDate();
        Integer getTotal();
    }

    @Query("""
    SELECT u.usageDate AS usageDate, SUM(u.used) AS total
    FROM ArticleUsage u
    WHERE u.article.id = :articleId
      AND u.usageDate BETWEEN :start AND :end
    GROUP BY u.usageDate
    """)
    List<DailyUsageSum> sumByArticleAndDateRange(
            @Param("articleId") Long articleId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );
}
