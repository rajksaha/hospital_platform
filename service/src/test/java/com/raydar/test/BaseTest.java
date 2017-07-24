package com.raydar.test;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.mock.jndi.SimpleNamingContextBuilder;

import javax.sql.DataSource;


public class BaseTest {
    public static final String DBCP_DS = "testDS";
    private static final Logger LOGGER = LoggerFactory.getLogger(BaseTest.class);
    protected static ApplicationContext testContext = new ClassPathXmlApplicationContext("app-context-test.xml");
    protected static ApplicationContext applicationContext = null;

    static {
        try {
            testContext = new ClassPathXmlApplicationContext("app-context-test.xml");
            setJndiDataSource(DBCP_DS);
            applicationContext = new ClassPathXmlApplicationContext("spring/app-context.xml");
            LOGGER.info("Done setting JNDI for " + DBCP_DS);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void setJndiDataSource(String dataSourceBeanId) throws Exception {
        DataSource ds = (DataSource) BaseTest.testContext.getBean(dataSourceBeanId);
        SimpleNamingContextBuilder builder = SimpleNamingContextBuilder.emptyActivatedContextBuilder();
        builder.bind("java:/comp/env/jdbc/echo_platform", ds);
    }

}
