package com.raydar.context;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * Created by mamun on 1/25/16.
 */
@Component
public class AppContextManager implements ApplicationContextAware {
    private static ApplicationContext _appCtx;

    public void setApplicationContext(ApplicationContext ctx){
        _appCtx = ctx;
    }

    public static ApplicationContext getAppContext(){
        return _appCtx;
    }
}
