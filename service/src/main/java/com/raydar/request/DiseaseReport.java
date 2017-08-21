package com.raydar.request;

import com.raydar.mybatis.domain.prescription.ContentData;
import com.raydar.mybatis.domain.prescription.drug.DrugData;

import java.util.List;

/**
 * Created by raj on 8/21/2017.
 */
public class DiseaseReport {

    List<ContentData> drugList;
    List<ContentData> invList;
    List<ContentData> symptomList;

    public List<ContentData> getDrugList() {
        return drugList;
    }

    public void setDrugList(List<ContentData> drugList) {
        this.drugList = drugList;
    }

    public List<ContentData> getInvList() {
        return invList;
    }

    public void setInvList(List<ContentData> invList) {
        this.invList = invList;
    }

    public List<ContentData> getSymptomList() {
        return symptomList;
    }

    public void setSymptomList(List<ContentData> symptomList) {
        this.symptomList = symptomList;
    }
}
