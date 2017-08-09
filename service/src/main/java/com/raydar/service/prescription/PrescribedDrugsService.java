package com.raydar.service.prescription;


import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.drug.DrugData;
import com.raydar.mybatis.domain.prescription.drug.DrugPrescriptionData;
import com.raydar.mybatis.persistence.prescription.PrescribedDrugsMapper;
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
public class PrescribedDrugsService {

    @Autowired
    private PrescribedDrugsMapper prescribedDrugsMapper;

    public List<DrugPrescriptionData> bringByID(Integer appointMentID)throws RaydarException{
        return prescribedDrugsMapper.bringByID(appointMentID);
    }

    public List<DrugData> getSymptomByParam(Map<String, Object> param) throws RaydarException{
        return prescribedDrugsMapper.getDrugs(param);
    }

    public void save(List<DrugPrescriptionData> complainList)throws RaydarException{

        for(DrugPrescriptionData complain : complainList){
            Map<String, Object> params = new HashMap<>();
            params.put("name" , complain.getDrugName());
            List<DrugData> symptomList = this.prescribedDrugsMapper.getDrugs(params);
            if(CollectionUtils.isEmpty(symptomList)){
                DrugData drugData = new DrugData();
                prescribedDrugsMapper.createDrugs(drugData);
                complain.setDrugID(drugData.getDrugID());
            }else{
                complain.setDrugID(symptomList.get(0).getDrugID());
            }

            if(complain.getDrugPrescriptionID() != null){
                prescribedDrugsMapper.update(complain);
            }else{
                prescribedDrugsMapper.create(complain);
            }
        }

    }

    public List<DrugData> getDrugs(Map<String, Object> param) throws RaydarException{
        return prescribedDrugsMapper.getDrugs(param);
    }
}
