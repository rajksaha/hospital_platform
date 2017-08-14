package com.raydar.mybatis.domain.appointment;

import com.raydar.mybatis.domain.BaseData;

/**
 * Created by raj on 8/14/2017.
 */
public class AppointmentInfo extends BaseData {

    private Integer appointmentInfoID;
    private Integer appointmentID;
    private String itemType;
    private Integer itemID;
    private String itemDescription;

    public Integer getAppointmentInfoID() {
        return appointmentInfoID;
    }

    public void setAppointmentInfoID(Integer appointmentInfoID) {
        this.appointmentInfoID = appointmentInfoID;
    }

    public Integer getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(Integer appointmentID) {
        this.appointmentID = appointmentID;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public Integer getItemID() {
        return itemID;
    }

    public void setItemID(Integer itemID) {
        this.itemID = itemID;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }
}
