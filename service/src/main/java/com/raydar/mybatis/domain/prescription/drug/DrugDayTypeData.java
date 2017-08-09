package com.raydar.mybatis.domain.prescription.drug;

/**
 * Created by raj on 1/12/2017.
 */
public class DrugDayTypeData {

    private Integer drugDayTypeID;
    private String textBD;
    private String textEng;
    private String textPdf;


    public Integer getDrugDayTypeID() {
        return drugDayTypeID;
    }

    public void setDrugDayTypeID(Integer drugDayTypeID) {
        this.drugDayTypeID = drugDayTypeID;
    }

    public String getTextBD() {
        return textBD;
    }

    public void setTextBD(String textBD) {
        this.textBD = textBD;
    }

    public String getTextEng() {
        return textEng;
    }

    public void setTextEng(String textEng) {
        this.textEng = textEng;
    }

    public String getTextPdf() {
        return textPdf;
    }

    public void setTextPdf(String textPdf) {
        this.textPdf = textPdf;
    }
}
