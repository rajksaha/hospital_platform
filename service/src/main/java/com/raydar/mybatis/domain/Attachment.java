package com.raydar.mybatis.domain;

import java.util.Date;

/**
 * Created by mamun on 1/19/16.
 */
public class Attachment extends BaseData {

    private Integer attachmentId;
    private Integer entityId;
    private String entityType;
    private String shortName;
    private String description;
    private String attachmentUrl;
    private String label;
    private String fileExt;
    private Date uploadOn;
    private Integer status;

    public Integer getAttachmentId() {
        return attachmentId;
    }

    public void setAttachmentId(Integer attachmentId) {
        this.attachmentId = attachmentId;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public Integer getEntityId() {
        return entityId;
    }

    public void setEntityId(Integer entityId) {
        this.entityId = entityId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getAttachmentUrl() {
        return attachmentUrl;
    }

    public void setAttachmentUrl(String attachmentUrl) {
        this.attachmentUrl = attachmentUrl;
    }

    public String getFileExt() {
        return fileExt;
    }

    public void setFileExt(String fileExt) {
        this.fileExt = fileExt;
    }

    public Date getUploadOn() {
        return uploadOn;
    }

    public void setUploadOn(Date uploadOn) {
        this.uploadOn = uploadOn;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Attachment{" +
                "attachmentId=" + attachmentId +
                ", entityId=" + entityId +
                ", entityType='" + entityType + '\'' +
                ", shortName='" + shortName + '\'' +
                ", description='" + description + '\'' +
                ", attachmentUrl='" + attachmentUrl + '\'' +
                ", label='" + label + '\'' +
                ", fileExt='" + fileExt + '\'' +
                ", uploadOn=" + uploadOn +
                ", status=" + status +
                '}';
    }
}
