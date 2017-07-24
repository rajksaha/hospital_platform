package com.raydar.mail;

import com.raydar.common.utility.EchoProperties;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Component;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * Created by Mamun on 8/17/2016.
 */
@Component
public class EmailSender {

    public void sendEmail(final Email email) throws MessagingException, UnsupportedEncodingException {

        // set authentication properties
        Properties properties = new Properties();
        properties.put("mail.smtp.host", email.getEmailConfig().getHost());
        properties.put("mail.smtp.port", email.getEmailConfig().getPort());
        properties.setProperty("mail.smtp.auth", "true");
        //properties.setProperty("mail.debug", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.smtp.ssl.trust", email.getEmailConfig().getHost());

        MimeMultipart multipartMail = new MimeMultipart();

        // set body part
        MimeBodyPart textBodyPart = new MimeBodyPart();
        textBodyPart.setContent(email.getBody(), "text/html");
        multipartMail.addBodyPart(textBodyPart);

        //set attachment
        if (CollectionUtils.isNotEmpty(email.getAttachments())) {
            for (EmailAttachment attachment : email.getAttachments()) {
                DataSource dataSource = new ByteArrayDataSource(attachment.getAttachment(), attachment.getAttachmentType().getMimeType());
                MimeBodyPart attachmentPart = new MimeBodyPart();
                attachmentPart.setDataHandler(new DataHandler(dataSource));
                attachmentPart.setFileName(attachment.getFilename());

                //set attachment
                multipartMail.addBodyPart(attachmentPart);
            }
        }

        // authenticate smtp
        Session session = Session.getDefaultInstance(properties,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(email.getEmailConfig().getUsername(), email.getEmailConfig().getPassword());
                    }
                });


        //construct the mime message
        MimeMessage mimeMessage = new MimeMessage(session);

        //set from
        InternetAddress from = new InternetAddress(email.getEmailConfig().getFrom(), email.getEmailConfig().getFromName());
        mimeMessage.setFrom(from);

        // set subject
        mimeMessage.setSubject(email.getSubject());

        if (CollectionUtils.isEmpty(email.getToRecipientList())) {
            throw new IllegalArgumentException("Invalid recipient list provided");
        }
        // set to recipient list
        List<InternetAddress> toRecipientList = new ArrayList<>();
        for (String toRecipient : email.getToRecipientList()) {
            toRecipientList.add(new InternetAddress(toRecipient));
        }
        mimeMessage.setRecipients(Message.RecipientType.TO, toRecipientList.toArray(new InternetAddress[toRecipientList.size()]));

        // set cc recipient list
        if (CollectionUtils.isNotEmpty(email.getCcRecipientList())) {
            List<InternetAddress> ccRecipientList = new ArrayList<>();
            for (String ccRecipient : email.getCcRecipientList()) {
                ccRecipientList.add(new InternetAddress(ccRecipient));
            }
            mimeMessage.setRecipients(Message.RecipientType.CC, ccRecipientList.toArray(new InternetAddress[ccRecipientList.size()]));
        }

        // set bcc recipient list
        if (CollectionUtils.isNotEmpty(email.getBccRecipientList())) {
            List<InternetAddress> bccRecipientList = new ArrayList<>();
            for (String bccRecipient : email.getBccRecipientList()) {
                bccRecipientList.add(new InternetAddress(bccRecipient));
            }
            mimeMessage.setRecipients(Message.RecipientType.BCC, bccRecipientList.toArray(new InternetAddress[bccRecipientList.size()]));
        }

        // set content
        mimeMessage.setContent(multipartMail);

        //send the email
        Transport.send(mimeMessage);

    }

    public void changeConfig(EmailConfig emailConfig, Integer companyID, Integer claimType){

        if(companyID == 1){
            if(claimType != null && claimType == 1){
                emailConfig.setFrom(EchoProperties.INSTANCE.getProperty("noreply.mail.from"));
                emailConfig.setFromName(EchoProperties.INSTANCE.getProperty("noreply.mail.from.name"));
                emailConfig.setHost(EchoProperties.INSTANCE.getProperty("noreply.mail.host"));
                emailConfig.setPort(EchoProperties.INSTANCE.getProperty("noreply.mail.port"));
                emailConfig.setUsername(EchoProperties.INSTANCE.getProperty("noreply.mail.username"));
                emailConfig.setPassword(EchoProperties.INSTANCE.getProperty("noreply.mail.password"));
            }else{
                emailConfig.setFrom(EchoProperties.INSTANCE.getProperty("noreply.admin.mail.from"));
                emailConfig.setFromName(EchoProperties.INSTANCE.getProperty("noreply.admin.mail.from.name"));
                emailConfig.setHost(EchoProperties.INSTANCE.getProperty("noreply.admin.mail.host"));
                emailConfig.setPort(EchoProperties.INSTANCE.getProperty("noreply.admin.mail.port"));
                emailConfig.setUsername(EchoProperties.INSTANCE.getProperty("noreply.admin.mail.username"));
                emailConfig.setPassword(EchoProperties.INSTANCE.getProperty("noreply.admin.mail.password"));
            }
        }
    }
}
