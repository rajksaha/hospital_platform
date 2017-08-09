package com.raydar.service.prescription.diagnosis;


import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.ContentData;
import com.raydar.mybatis.domain.prescription.DiagnosisData;
import com.raydar.mybatis.persistence.prescription.DiagnosisMapper;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
@Service
public class DiagnosisService {

    @Autowired
    private DiagnosisMapper diagnosisMapper;

    public DiagnosisData bringDiagnosisByID(Integer appointMentID)throws RaydarException {
        return diagnosisMapper.bringDiagnosisByID(appointMentID);
    }

    public List<ContentData> getDiseaseByParam(Map<String, Object> param) throws RaydarException{
        return diagnosisMapper.getDiseaseByParam(param);
    }

    public void saveDiagnosis(DiagnosisData diagnosisData)throws RaydarException{
        Map<String, Object> params = new HashMap<>();
        params.put("name" , diagnosisData.getDiseaseName());
        List<ContentData> diseaseList = this.diagnosisMapper.getDiseaseByParam(params);
        if(CollectionUtils.isEmpty(diseaseList)){
            ContentData contentData = new ContentData();
            contentData.setName(diagnosisData.getDiseaseName());
            diagnosisMapper.createDisease(contentData);
            diagnosisData.setDiseaseID(contentData.getId());
        }else{
            diagnosisData.setDiseaseID(diseaseList.get(0).getId());
        }

        if(diagnosisData.getDiagnosisID() != null){
            diagnosisMapper.updateDiagnosis(diagnosisData);
        }else{
            diagnosisMapper.createDiagnosis(diagnosisData);
        }
    }

}
