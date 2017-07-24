package com.raydar.web.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;


public class AppStartupListener implements ServletContextListener {

    private static final Logger LOGGER = LoggerFactory.getLogger(AppStartupListener.class);

    public void contextInitialized(ServletContextEvent sContext) {

        try {
            WebApplicationContext wcontext = WebApplicationContextUtils.getRequiredWebApplicationContext(sContext.getServletContext());

        } catch (Exception e) {
            LOGGER.warn("Failed to AppStartupListener", e);
        }
    }

    public void contextDestroyed(ServletContextEvent arg0) {
    }


}