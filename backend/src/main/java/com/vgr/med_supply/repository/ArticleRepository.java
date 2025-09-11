package com.vgr.med_supply.repository;

import com.vgr.med_supply.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article,Long> {
}
