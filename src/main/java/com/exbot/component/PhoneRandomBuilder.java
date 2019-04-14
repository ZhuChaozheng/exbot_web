package com.exbot.component;

import org.springframework.stereotype.Component;

/**
 * @author: tan
 * @Date: 2019/1/4 15:07
 * Describe: 手机验证码随机生成
 */
@Component
public class PhoneRandomBuilder {

    public static String randomBuilder(){

        String result = "";
        for(int i=0;i<4;i++){
            result += Math.round(Math.random() * 9);
        }

        return result;

    }

}
