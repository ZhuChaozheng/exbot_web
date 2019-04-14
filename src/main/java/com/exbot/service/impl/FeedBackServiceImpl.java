package com.exbot.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.exbot.mapper.FeedBackMapper;
import com.exbot.model.FeedBack;
import com.exbot.service.FeedBackService;
import com.exbot.service.UserService;
import com.exbot.utils.TimeUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author: tan
 * @Date: 2019/1/23 17:21
 * Describe:
 */
@Service
public class FeedBackServiceImpl implements FeedBackService {

    @Autowired
    FeedBackMapper feedBackMapper;
    @Autowired
    UserService userService;

    @Override
    public JSONObject submitFeedback(FeedBack feedBack) {
        TimeUtil timeUtil = new TimeUtil();
        feedBack.setFeedbackDate(timeUtil.getFormatDateForSix());
        feedBackMapper.insertFeedback(feedBack);
        JSONObject returnJson = new JSONObject();
        returnJson.put("status",200);
        return returnJson;
    }

    @Override
    public JSONObject getAllFeedback(int rows, int pageNum) {
        PageHelper.startPage(pageNum, rows);
        List<FeedBack> feedBacks = feedBackMapper.getAllFeedback();
        PageInfo<FeedBack> pageInfo = new PageInfo<>(feedBacks);

        JSONObject returnJson = new JSONObject();
        returnJson.put("status",200);
        JSONArray jsonArray = new JSONArray();
        JSONObject feedbackJson;

        for(FeedBack feedBack : feedBacks){
            feedbackJson = new JSONObject();
            feedbackJson.put("feedbackContent", feedBack.getFeedbackContent());
            feedbackJson.put("person", userService.findUsernameById(feedBack.getPersonId()));
            feedbackJson.put("feedbackDate", feedBack.getFeedbackDate());
            if(feedBack.getContactInfo() == null){
                feedbackJson.put("contactInfo", "");
            } else {
                feedbackJson.put("contactInfo", feedBack.getContactInfo());
            }
            jsonArray.add(feedbackJson);
        }

        returnJson.put("result",jsonArray);

        JSONObject pageJson = new JSONObject();
        pageJson.put("pageNum",pageInfo.getPageNum());
        pageJson.put("pageSize",pageInfo.getPageSize());
        pageJson.put("total",pageInfo.getTotal());
        pageJson.put("pages",pageInfo.getPages());
        pageJson.put("isFirstPage",pageInfo.isIsFirstPage());
        pageJson.put("isLastPage",pageInfo.isIsLastPage());
        returnJson.put("pageInfo",pageJson);
        return returnJson;
    }
}
