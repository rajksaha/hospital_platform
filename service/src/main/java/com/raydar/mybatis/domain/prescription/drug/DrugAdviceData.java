package com.raydar.mybatis.domain.prescription.drug;

/**
 * Created by raj on 1/12/2017.
 */
public class DrugAdviceData {

    private Integer drugAdviceID;
    private String textBD;
    private String textEng;
    private String textPdf;


    public Integer getDrugAdviceID() {
        return drugAdviceID;
    }

    public void setDrugAdviceID(Integer drugAdviceID) {
        this.drugAdviceID = drugAdviceID;
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
