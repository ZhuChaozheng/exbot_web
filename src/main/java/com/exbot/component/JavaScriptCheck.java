package com.exbot.component;

/**
 * @author: tan
 * @Date: 2018/12/28 12:37
 * Describe:过滤js脚本
 */
public class JavaScriptCheck {

    public static String javaScriptCheck(String comment){
        int begin,end,theEnd;
        String newStr = "";
        begin = comment.indexOf("<script");
        end = comment.indexOf("</script>");
        if (begin == -1){
            return comment;
        }
        while (begin != -1){
            theEnd = comment.indexOf(">");
            newStr += comment.substring(0, begin);
            newStr += "[removed]" + comment.substring(theEnd+1,end) + "[removed]";

            comment = comment.substring(end+9);

            begin = comment.indexOf("<script");
            end = comment.indexOf("</script>");
        }
        return newStr;
    }

}
