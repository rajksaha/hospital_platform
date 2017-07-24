package com.raydar.common.audit;

import com.raydar.mybatis.domain.EchoUserDetail;

/**
 * Created by raj on 1/25/16.
 */
public class CallerPrinciple {

    private static final ThreadLocal<EchoUserDetail> userThreadLocal = new ThreadLocal<EchoUserDetail>() {
        @Override
        protected EchoUserDetail initialValue() {
            return null;
        }
    };

    public static EchoUserDetail getUser() {
        return userThreadLocal.get();
    }

    public static String getUsername() {
        EchoUserDetail echoUserDetail = getUser();
        return echoUserDetail == null ? "anonymous" : echoUserDetail.getUsername();
    }

    public static void setUser(EchoUserDetail famsUserDetails) {
        userThreadLocal.set(famsUserDetails);
    }
}
