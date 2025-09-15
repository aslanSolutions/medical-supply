package com.vgr.med_supply.controller;

import com.vgr.med_supply.dto.ArticleDto;
import com.vgr.med_supply.dto.RegisterArticleRequest;
import com.vgr.med_supply.dto.UpdateArticleRequest;
import com.vgr.med_supply.entity.ArticleUsage;
import com.vgr.med_supply.mapper.ArticleMapper;
import com.vgr.med_supply.repository.ArticleRepository;
import com.vgr.med_supply.repository.ArticleUsageRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Set;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {
    private final ArticleRepository articleRepository;
    private final ArticleUsageRepository articleUsageRepository;
    private final ArticleMapper articleMapper;

    @GetMapping
    public Iterable<ArticleDto> getAllArticle(
            // In case of a future field changes we set defaultValue to empty
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


    @PostMapping
    public ResponseEntity<ArticleDto> createArticle(
            @RequestBody @Valid RegisterArticleRequest request,
            UriComponentsBuilder uriBuilder
            ) {
        System.out.println("request Param: " + request);
        var article = articleMapper.toEntity(request);
        articleRepository.save(article);
        var articleDto = articleMapper.toDto(article);
        var uri = uriBuilder.path("/api/v1/articles/{id}").buildAndExpand(articleDto).toUri();
        return ResponseEntity.created(uri).body(articleDto);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ArticleDto> updateArticleCount (
            @PathVariable(name="id") Long id,
            @RequestBody @Valid UpdateArticleRequest request
    ) {
        var article = articleRepository.findById(id).orElse(null);
        if( article == null ) {
            return ResponseEntity.notFound().build();
        }
        int oldCount = article.getCount() == null ? 0 : article.getCount();
        articleMapper.update(request, article);
        if (request.getCount() == null) {
            articleRepository.save(article);
            return ResponseEntity.ok(articleMapper.toDto(articleRepository.save(article)));
        }
        int newCount = Math.max(0, article.getCount() == null ? 0 : article.getCount());
        article.setCount(newCount);

        int used = Math.max(0, oldCount - newCount);

        // Save article first, then usage row if decreased
        articleRepository.save(article);

        if (used > 0) {
            var today = java.time.LocalDate.now(java.time.ZoneId.of("Europe/Stockholm"));
            var usage = ArticleUsage.builder()
                    .article(article)
                    .usageDate(today)
                    .used(used)
                    .build();
            articleUsageRepository.save(usage);
        }

        return  ResponseEntity.ok(articleMapper.toDto(articleRepository.save(article)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle (@PathVariable(name="id") Long id) {
        var article = articleRepository.findById(id).orElse(null);
        if( article == null ) {
            return ResponseEntity.notFound().build();
        }
        articleRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
