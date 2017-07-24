package com.raydar.mybatis.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.annotations.Expose;
import org.apache.commons.lang.BooleanUtils;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by raj on 4/20/16.
 */
public class BaseData implements Serializable {

    @Expose(serialize = false)
    private String updatedBy;

    @Expose(serialize = false)
    private String createdBy;

    @Expose(serialize = false)
    private Timestamp updatedOn;

    @Expose(serialize = false)
    private Timestamp createdOn;

    private Boolean isSelected;

    @JsonIgnore
    private Boolean skipAudit;

    private Integer serial;     // used in pagination to show serial

    public Boolean getIsSelected() {
        return BooleanUtils.toBoolean(isSelected);
    }

    public void setIsSelected(Boolean isSelected) {
        this.isSelected = isSelected;
    }

    public Boolean getSkipAudit() {
        return skipAudit;
    }

    public void setSkipAudit(Boolean skipAudit) {
        this.skipAudit = skipAudit;
    }

    public Integer getSerial() {
        return serial;
    }

    public void setSerial(Integer serial) {
        this.serial = serial;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Timestamp getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(Timestamp updatedOn) {
        this.updatedOn = updatedOn;
    }

    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }
}
