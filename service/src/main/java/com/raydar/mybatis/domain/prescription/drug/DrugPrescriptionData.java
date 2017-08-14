package com.raydar.mybatis.domain.prescription.drug;

import java.util.List;

/**
 * Created by raj on 1/12/2017.
 */
public class DrugPrescriptionData {

    private Integer drugPrescriptionID;
    private Integer appointmentID;
    private Integer drugTypeID;
    private String drugTypeName;
    private Integer drugID;
    private String drugName;
    private Integer drugTimeID;
    private Integer drugDoseUnit;
    private Integer drugWhenID;
    private String drugWhenStr;
    private Integer drugAdviceID;
    private String drugAdviceStr;
    private String typeInitial;

    private List<DrugDoseData> periodicList;


    public String getTypeInitial() {
        return typeInitial;
    }

    public void setTypeInitial(String typeInitial) {
        this.typeInitial = typeInitial;
    }

    public Integer getDrugPrescriptionID() {
        return drugPrescriptionID;
    }

    public void setDrugPrescriptionID(Integer drugPrescriptionID) {
        this.drugPrescriptionID = drugPrescriptionID;
    }

    public Integer getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(Integer appointmentID) {
        this.appointmentID = appointmentID;
    }

    public Integer getDrugTypeID() {
        return drugTypeID;
    }

    public void setDrugTypeID(Integer drugTypeID) {
        this.drugTypeID = drugTypeID;
    }

    public String getDrugTypeName() {
        return drugTypeName;
    }

    public void setDrugTypeName(String drugTypeName) {
        this.drugTypeName = drugTypeName;
    }

    public Integer getDrugID() {
        return drugID;
    }

    public void setDrugID(Integer drugID) {
        this.drugID = drugID;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public Integer getDrugTimeID() {
        return drugTimeID;
    }

    public void setDrugTimeID(Integer drugTimeID) {
        this.drugTimeID = drugTimeID;
    }

    public Integer getDrugDoseUnit() {
        return drugDoseUnit;
    }

    public void setDrugDoseUnit(Integer drugDoseUnit) {
        this.drugDoseUnit = drugDoseUnit;
    }

    public Integer getDrugWhenID() {
        return drugWhenID;
    }

    public void setDrugWhenID(Integer drugWhenID) {
        this.drugWhenID = drugWhenID;
    }

    public String getDrugWhenStr() {
        return drugWhenStr;
    }

    public void setDrugWhenStr(String drugWhenStr) {
        this.drugWhenStr = drugWhenStr;
    }

    public Integer getDrugAdviceID() {
        return drugAdviceID;
    }

    public void setDrugAdviceID(Integer drugAdviceID) {
        this.drugAdviceID = drugAdviceID;
    }

    public String getDrugAdviceStr() {
        return drugAdviceStr;
    }

    public void setDrugAdviceStr(String drugAdviceStr) {
        this.drugAdviceStr = drugAdviceStr;
    }

    public List<DrugDoseData> getPeriodicList() {
        return periodicList;
    }

    public void setPeriodicList(List<DrugDoseData> periodicList) {
        this.periodicList = periodicList;
    }
}
