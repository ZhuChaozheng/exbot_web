package com.exbot.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author: tan
 * @Date: 2019/1/17 20:54
 * Describe: 分类sql
 */
@Mapper
@Repository
public interface CategoryMapper {

    @Select("select categoryName from categories")
    List<String> findCategoriesName();

    @Select("select description from imgurl")
    List<String> findImgUrls();

    @Select("select count(*) from categories")
    int countCategoriesNum();

}
