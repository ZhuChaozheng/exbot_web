package com.exbot.controller;

import com.exbot.service.ArticleService;
import com.exbot.service.TagService;
import com.exbot.utils.TransCodingUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author: tan
 * @Date: 2019/1/16 21:27
 * Describe:标签
 */
@RestController
public class TagsControl {

    @Autowired
    TagService tagService;
    @Autowired
    ArticleService articleService;

    /**
     * 分页获得该标签下的文章
     * @param tag
     * @return
     */
    @PostMapping("/getTagArticle")
    public JSONObject getTagArticle(@RequestParam("tag") String tag,
                                    HttpServletRequest request){
        try {
            tag = TransCodingUtil.unicodeToString(tag);
        } catch (Exception e){
        }
        if("".equals(tag)){
            return tagService.findTagsCloud();
        } else {
            int rows = Integer.parseInt(request.getParameter("rows"));
            int pageNum = Integer.parseInt(request.getParameter("pageNum"));
            return articleService.findArticleByTag(tag, rows, pageNum);
        }
    }

}
