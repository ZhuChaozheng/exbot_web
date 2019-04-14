package com.exbot.repository.mybatis;

import com.exbot.model.User;
import org.springframework.stereotype.Repository;

/**
 * @author: tan
 * @Date: 2019/1/5 19:37
 * Describe:
 */
@Repository
public interface UserRepository {

    /**
     *  通过手机号查找用户
     * @param phone 手机号
     * @return 用户
     */
    User findByPhone(String phone);

}
