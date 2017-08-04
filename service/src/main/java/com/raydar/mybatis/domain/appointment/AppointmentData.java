package com.raydar.mybatis.domain.appointment;

import com.raydar.mybatis.domain.BaseData;
import com.raydar.mybatis.domain.user.UserProfileData;

import java.sql.Timestamp;

/**
 * Created by raj on 7/30/2017.
 */
public class AppointmentData extends BaseData {


    private Integer appointmentID;
    private Integer doctorID;
    private Integer patientID;
    private Timestamp appointmentDate;
    private String dateStr;
    private Integer status;
    private Integer appointmentType;

    private UserProfileData patientProfileData;
    private String appointmentTypeName;

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
