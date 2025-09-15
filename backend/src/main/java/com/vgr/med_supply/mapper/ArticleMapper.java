package com.vgr.med_supply.mapper;

import com.vgr.med_supply.dto.ArticleDto;
import com.vgr.med_supply.dto.RegisterArticleRequest;
import com.vgr.med_supply.dto.UpdateArticleRequest;
import com.vgr.med_supply.entity.Article;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE
)
public interface ArticleMapper {
    ArticleDto toDto(Article article);

    // Force MapStruct to wire the fields cause of compatibility issue with lombok
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", source = "name")
    @Mapping(target = "unit", source = "unit")
    @Mapping(target = "count", source = "count")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "supplier", source = "supplier")
    @Mapping(target = "price", source = "price")
    @Mapping(target = "category", source = "category")
    Article toEntity(RegisterArticleRequest registerArticleRequest);

    void update(UpdateArticleRequest request, @MappingTarget Article article);
}
