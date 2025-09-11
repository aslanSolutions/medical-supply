package com.vgr.med_supply.controller;

import com.vgr.med_supply.dto.ArticleDto;
import com.vgr.med_supply.mapper.ArticleMapper;
import com.vgr.med_supply.repository.ArticleRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {
    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;

    @GetMapping
    public Iterable<ArticleDto> getAllArticle(
            // In case of a field changes we set defaultValue to empty
            @RequestParam(required = false, defaultValue = "", name = "sort") String sort
    ) {
        if( !Set.of("name", "count", "id", "unit").contains(sort) ) {
            sort = "name";
        }

        return articleRepository.findAll(Sort.by(sort))
                .stream()
                .map(articleMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> getArticleById(@PathVariable Long id){
        var article =  articleRepository.findById(id).orElse(null);
        if (article == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(articleMapper.toDto(article));
    }

}
