package com.raydar.mybatis.domain.prescription;

import java.sql.Timestamp;

/**
 * Created by raj on 1/11/2017.
 */
public class NextVisitData {

    private Integer nextVisitID;
    private Integer appointmentID;
    private Integer nextVisitType;
    private Timestamp date;
    private String  dateStr;
    private Integer numOfDay;
    private Integer dayType;

    public Integer getNextVisitID() {
        return nextVisitID;
    }

    public void setNextVisitID(Integer nextVisitID) {
        this.nextVisitID = nextVisitID;
    }

    public String getDateStr() {
        return dateStr;
    }

    public void setDateStr(String dateStr) {
        this.dateStr = dateStr;
    }

    public Integer getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(Integer appointmentID) {
        this.appointmentID = appointmentID;
    }

    public Integer getNextVisitType() {
        return nextVisitType;
    }

    public void setNextVisitType(Integer nextVisitType) {
        this.nextVisitType = nextVisitType;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public Integer getNumOfDay() {
        return numOfDay;
    }

    public void setNumOfDay(Integer numOfDay) {
        this.numOfDay = numOfDay;
    }

    public Integer getDayType() {
        return dayType;
    }

    public void setDayType(Integer dayType) {
        this.dayType = dayType;
    }
}
