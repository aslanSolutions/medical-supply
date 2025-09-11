package com.vgr.med_supply.controller;

import com.vgr.med_supply.dto.ArticleDto;
import com.vgr.med_supply.repository.ArticleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {
    private final ArticleRepository articleRepository;

    @GetMapping
    public Iterable<ArticleDto> getAllArticle() {
        return articleRepository.findAll()
                .stream()
                .map(article -> new ArticleDto(article.getId(), article.getName(),
                        article.getUnit(), article.getCount()))
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> getArticleById(@PathVariable Long id){
        var article =  articleRepository.findById(id).orElse(null);
        if (article == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ArticleDto(article.getId(), article.getName(),
                article.getUnit(), article.getCount()));
    }

}
