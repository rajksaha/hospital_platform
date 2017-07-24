package com.raydar.mail;

import com.raydar.common.utility.EchoProperties;

/**
 * Created by Mamun on 8/17/2016.
 */
public class EmailConfig {

    private String from;
    private String fromName;
    private String host;
    private String port;
    private String username;
    private String password;

    // initialize with default config
    public EmailConfig() {
        this.from = EchoProperties.INSTANCE.getProperty("noreply.mail.from");
        this.fromName = EchoProperties.INSTANCE.getProperty("noreply.mail.from.name");
        this.host = EchoProperties.INSTANCE.getProperty("noreply.mail.host");
        this.port = EchoProperties.INSTANCE.getProperty("noreply.mail.port");
        this.username = EchoProperties.INSTANCE.getProperty("noreply.mail.username");
        this.password = EchoProperties.INSTANCE.getProperty("noreply.mail.password");

        /*this.from = EchoProperties.INSTANCE.getProperty("echoreports.mail.from");
        this.fromName = EchoProperties.INSTANCE.getProperty("echoreports.mail.from.name");
        this.host = EchoProperties.INSTANCE.getProperty("echoreports.mail.host");
        this.port = EchoProperties.INSTANCE.getProperty("echoreports.mail.port");
        this.username = EchoProperties.INSTANCE.getProperty("echoreports.mail.username");
        this.password = EchoProperties.INSTANCE.getProperty("echoreports.mail.password");*/
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getFromName() {
        return fromName;
    }

    public void setFromName(String fromName) {
        this.fromName = fromName;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
