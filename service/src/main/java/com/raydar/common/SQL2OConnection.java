package com.raydar.common;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import javax.naming.InitialContext;
import javax.sql.DataSource;


public class SQL2OConnection {

    private static SQL2OConnection instance = null;
    private static Connection dbConnectionInstance = null;

    public Sql2o sql2o = null;

    //Using DataSource
    protected SQL2OConnection() {

        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            DataSource datasource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/medical");
            sql2o = new Sql2o(datasource);
            dbConnectionInstance = sql2o.open();

        } catch (Exception ex) {
            ex.printStackTrace();
        }


    }

    public static SQL2OConnection getInstance() {
        if (instance == null) {
            instance = new SQL2OConnection();
        } else {

            try {
                dbConnectionInstance.createQuery("SELECT 1").executeScalar();
            } catch (Exception ex) {
                instance = new SQL2OConnection();
            }
        }
        return instance;
    }

    public Connection getConnection() {
        return dbConnectionInstance;
    }

}
