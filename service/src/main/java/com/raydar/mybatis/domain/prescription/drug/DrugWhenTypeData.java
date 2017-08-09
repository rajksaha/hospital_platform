package com.raydar.mybatis.domain.prescription.drug;

/**
 * Created by raj on 1/12/2017.
 */
public class DrugWhenTypeData {

    private Integer drugWhenTypeID;
    private String textBD;
    private String textEng;
    private String textPdf;

    public Integer getDrugWhenTypeID() {
        return drugWhenTypeID;
    }

    public void setDrugWhenTypeID(Integer drugWhenTypeID) {
        this.drugWhenTypeID = drugWhenTypeID;
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
