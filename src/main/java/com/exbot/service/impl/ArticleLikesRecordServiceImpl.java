package com.exbot.service.impl;

import com.exbot.mapper.ArticleLikesMapper;
import com.exbot.model.ArticleLikesRecord;
import com.exbot.service.ArticleLikesRecordService;
import com.exbot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author: tan
 * @Date: 2019/1/7 15:50
 * Describe:
 */
@Service
public class ArticleLikesRecordServiceImpl implements ArticleLikesRecordService {

    @Autowired
    ArticleLikesMapper articleLikesMapper;
    @Autowired
    UserService userService;

    @Override
    public boolean isLiked(long articleId, String originalAuthor, String username) {
        ArticleLikesRecord articleLikesRecord = articleLikesMapper.isLiked(articleId, originalAuthor, userService.findIdByUsername(username));

        return articleLikesRecord != null;
    }

    @Override
    public void insertArticleLikesRecord(ArticleLikesRecord articleLikesRecord) {
        articleLikesMapper.insertArticleLikesRecord(articleLikesRecord);
    }

    @Override
    public void deleteArticleLikesRecordByArticleId(long articleId) {
        articleLikesMapper.deleteArticleLikesRecordByArticleId(articleId);
    }

}
