package com.raydar.request;

import java.sql.Time;
import java.sql.Timestamp;

/**
 * Created by raj on 8/6/2017.
 */
public class Appointment {

    private Integer appointmentID;
    private Integer companyID;
    private Integer doctorID;
    private Integer patientID;
    private Timestamp appointmentDate;
    private Time appointmentTime;
    private String dateStr;
    private Integer status;
    private Integer appointmentType;


    private String patientFirstName;
    private Timestamp patientDateOfBirth;
    private String patientContact;
    private String patientSex;
    private String patientTypeToDoctor;

    private String doctorFirstName;
    private Timestamp doctorDateOfBirth;
    private String doctorContact;
    private String doctorSex;

    public String getPatientTypeToDoctor() {
        return patientTypeToDoctor;
    }

    public void setPatientTypeToDoctor(String patientTypeToDoctor) {
        this.patientTypeToDoctor = patientTypeToDoctor;
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

    public String getPatientFirstName() {
        return patientFirstName;
    }

    public void setPatientFirstName(String patientFirstName) {
        this.patientFirstName = patientFirstName;
    }

    public Timestamp getPatientDateOfBirth() {
        return patientDateOfBirth;
    }

    public void setPatientDateOfBirth(Timestamp patientDateOfBirth) {
        this.patientDateOfBirth = patientDateOfBirth;
    }

    public String getPatientContact() {
        return patientContact;
    }

    public void setPatientContact(String patientContact) {
        this.patientContact = patientContact;
    }

    public String getPatientSex() {
        return patientSex;
    }

    public void setPatientSex(String patientSex) {
        this.patientSex = patientSex;
    }

    public String getDoctorFirstName() {
        return doctorFirstName;
    }

    public void setDoctorFirstName(String doctorFirstName) {
        this.doctorFirstName = doctorFirstName;
    }

    public Timestamp getDoctorDateOfBirth() {
        return doctorDateOfBirth;
    }

    public void setDoctorDateOfBirth(Timestamp doctorDateOfBirth) {
        this.doctorDateOfBirth = doctorDateOfBirth;
    }

    public String getDoctorContact() {
        return doctorContact;
    }

    public void setDoctorContact(String doctorContact) {
        this.doctorContact = doctorContact;
    }

    public String getDoctorSex() {
        return doctorSex;
    }

    public void setDoctorSex(String doctorSex) {
        this.doctorSex = doctorSex;
    }
}
