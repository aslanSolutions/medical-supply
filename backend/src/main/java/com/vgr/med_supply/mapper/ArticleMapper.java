package com.vgr.med_supply.mapper;

import com.vgr.med_supply.dto.ArticleDto;
import com.vgr.med_supply.entity.Article;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
    ArticleDto toDto(Article article);
}
