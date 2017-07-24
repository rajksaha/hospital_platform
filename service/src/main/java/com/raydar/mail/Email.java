package com.raydar.mail;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Mamun on 8/17/2016.
 */
public class Email {

    private String subject;
    private String body;
    private List<String> toRecipientList = new ArrayList<>();
    private List<String> ccRecipientList = new ArrayList<>();
    private List<String> bccRecipientList = new ArrayList<>();
    private EmailConfig emailConfig = new EmailConfig();
    private List<EmailAttachment> attachments = new ArrayList<>();

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<String> getToRecipientList() {
        return toRecipientList;
    }

    public void setToRecipientList(List<String> toRecipientList) {
        this.toRecipientList = toRecipientList;
    }

    public List<String> getCcRecipientList() {
        return ccRecipientList;
    }

    public void setCcRecipientList(List<String> ccRecipientList) {
        this.ccRecipientList = ccRecipientList;
    }

    public List<String> getBccRecipientList() {
        return bccRecipientList;
    }

    public void setBccRecipientList(List<String> bccRecipientList) {
        this.bccRecipientList = bccRecipientList;
    }

    public EmailConfig getEmailConfig() {
        return emailConfig;
    }

    public void setEmailConfig(EmailConfig emailConfig) {
        this.emailConfig = emailConfig;
    }

    public List<EmailAttachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<EmailAttachment> attachments) {
        this.attachments = attachments;
    }
}
