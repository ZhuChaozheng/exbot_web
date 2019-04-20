package com.exbot.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

/**
 * @author: tan
 * @Date: 2019/1/17 20:52
 * Describe:分类业务操作
 */
@Service
public interface CategoryService {

    /**
     * 获得所有的分类以及该分类的文章总数
     * @return
     */
    JSONObject findCategoriesNameAndArticleNum();

    /**
     * 获得所有的分类
     * @return
     */
    JSONArray findCategoriesName();

    /**
     * 获得所有的封面图片
     * @return
     */
    JSONArray findImgUrls();

    /**
     * 获得分类数目
     * @return
     */
    int countCategoriesNum();


}
