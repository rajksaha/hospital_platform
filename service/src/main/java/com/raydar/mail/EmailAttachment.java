package com.raydar.mail;

import com.raydar.common.type.EmailAttachmentType;

/**
 * Created by Mamun on 8/17/2016.
 */
public class EmailAttachment {

    private byte[] attachment;
    private EmailAttachmentType attachmentType;
    private String filename;

    public byte[] getAttachment() {
        return attachment;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public EmailAttachmentType getAttachmentType() {
        return attachmentType;
    }

    public void setAttachmentType(EmailAttachmentType attachmentType) {
        this.attachmentType = attachmentType;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }
}
