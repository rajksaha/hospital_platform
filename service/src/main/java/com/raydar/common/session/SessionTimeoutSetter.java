package com.raydar.common.session;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Created by raj on 11/13/2016.
 */
public class SessionTimeoutSetter implements HttpSessionListener {

    public void sessionCreated(HttpSessionEvent event) {
        event.getSession().setMaxInactiveInterval(5);
    }

    public void sessionDestroyed(HttpSessionEvent event) {
        // not needed
    }
}