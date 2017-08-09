package com.raydar.mybatis.persistence.prescription;


import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.ContentData;
import com.raydar.mybatis.domain.prescription.DiagnosisData;
import com.raydar.mybatis.domain.prescription.drug.DrugData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
public interface DiagnosisMapper {

    DiagnosisData bringDiagnosisByID(Integer appointmentID)throws RaydarException;

    List<ContentData> getDiseaseByParam(Map<String, Object> param) throws RaydarException;

    void createDisease(ContentData contentData)throws RaydarException;

    void createDiagnosis(DiagnosisData diagnosisData)throws RaydarException;

    void updateDiagnosis(DiagnosisData diagnosisData)throws RaydarException;

    List<DrugData> getDrugs(Map<String, Object> param) throws RaydarException;

}
