package com.raydar.mybatis.domain.appointment;

import com.raydar.mybatis.domain.BaseData;
import com.raydar.mybatis.domain.user.UserProfileData;

import java.sql.Time;
import java.sql.Timestamp;

/**
 * Created by raj on 7/30/2017.
 */
public class AppointmentData extends BaseData {


    private Integer appointmentID;
    private Integer companyID;
    private Integer doctorID;
    private Integer patientID;
    private Timestamp appointmentDate;
    private Time appointmentTime;
    private String dateStr;
    private String timeStr;
    private Integer status;
    private Integer appointmentType;

    private UserProfileData patientProfileData;
    private UserProfileData doctorProfileData;
    private String appointmentTypeName;

    public String getTimeStr() {
        return timeStr;
    }

    public void setTimeStr(String timeStr) {
        this.timeStr = timeStr;
    }

    public Time getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(Time appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public UserProfileData getDoctorProfileData() {
        return doctorProfileData;
    }

    public void setDoctorProfileData(UserProfileData doctorProfileData) {
        this.doctorProfileData = doctorProfileData;
    }

    public UserProfileData getPatientProfileData() {
        return patientProfileData;
    }

    public void setPatientProfileData(UserProfileData patientProfileData) {
        this.patientProfileData = patientProfileData;
    }

    public String getAppointmentTypeName() {
        return appointmentTypeName;
    }

    public void setAppointmentTypeName(String appointmentTypeName) {
        this.appointmentTypeName = appointmentTypeName;
    }

    public Integer getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(Integer appointmentID) {
        this.appointmentID = appointmentID;
    }

    public Integer getDoctorID() {
        return doctorID;
    }

    public void setDoctorID(Integer doctorID) {
        this.doctorID = doctorID;
    }

    public Integer getPatientID() {
        return patientID;
    }

    public void setPatientID(Integer patientID) {
        this.patientID = patientID;
    }

    public Timestamp getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Timestamp appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getDateStr() {
        return dateStr;
    }

    public void setDateStr(String dateStr) {
        this.dateStr = dateStr;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getAppointmentType() {
        return appointmentType;
    }

    public void setAppointmentType(Integer appointmentType) {
        this.appointmentType = appointmentType;
    }
}
