package com.raydar.mybatis.domain.prescription.drug;

/**
 * Created by raj on 1/12/2017.
 */
public class DrugDoseData {

    private Integer drugDoseID;
    private Integer drugPrescriptionID;
    private String dose;
    private Integer numOffDay;
    private Integer durationType;


    public Integer getDrugDoseID() {
        return drugDoseID;
    }

    public void setDrugDoseID(Integer drugDoseID) {
        this.drugDoseID = drugDoseID;
    }

    public Integer getDrugPrescriptionID() {
        return drugPrescriptionID;
    }

    public void setDrugPrescriptionID(Integer drugPrescriptionID) {
        this.drugPrescriptionID = drugPrescriptionID;
    }

    public String getDose() {
        return dose;
    }

    public void setDose(String dose) {
        this.dose = dose;
    }

    public Integer getNumOffDay() {
        return numOffDay;
    }

    public void setNumOffDay(Integer numOffDay) {
        this.numOffDay = numOffDay;
    }

    public Integer getDurationType() {
        return durationType;
    }

    public void setDurationType(Integer durationType) {
        this.durationType = durationType;
    }
}
