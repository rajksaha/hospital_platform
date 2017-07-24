package com.raydar.common.utility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;

/**
 * Created by Mamun on 7/22/2016.
 */
public enum EchoProperties {
    INSTANCE;

    private Properties echoProperties;
    private static final Logger log = LoggerFactory.getLogger(EchoProperties.class);

    EchoProperties() {
        init();
    }

    private void init() {
        try {
            //load two resource files
            Resource resource = new ClassPathResource("echo.properties");
            //load properties
            echoProperties = PropertiesLoaderUtils.loadProperties(resource);
        } catch (IOException ex) {
            log.error("error loading echo.properties", ex);
        }
    }

    public String getProperty(String key) {
        return echoProperties.getProperty(key);
    }

    public boolean getBooleanProperty(String key) {
        return Boolean.valueOf(echoProperties.getProperty(key, "false"));
    }

    public int getNumericProperty(String key) {
        return Integer.valueOf(echoProperties.getProperty(key, "0"));
    }

    public void refresh() {
        init();
    }
}
