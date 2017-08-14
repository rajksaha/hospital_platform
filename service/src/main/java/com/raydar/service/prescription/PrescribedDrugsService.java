package com.raydar.service.prescription;


import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.drug.DrugData;
import com.raydar.mybatis.domain.prescription.drug.DrugDoseData;
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

    public List<DrugPrescriptionData> bringByAppointmentID(Integer appointMentID)throws RaydarException{

        List<DrugPrescriptionData>  dataList = prescribedDrugsMapper.bringByID(appointMentID);
        for (DrugPrescriptionData drugPres : dataList){
            drugPres.setPeriodicList(prescribedDrugsMapper.getDrugDose(drugPres.getDrugPrescriptionID()));
        }
        return dataList;
    }


    public void save(List<DrugPrescriptionData> drugPrescribeList)throws RaydarException{

        for(DrugPrescriptionData drugPres : drugPrescribeList){

            Map<String, Object> params = new HashMap<>();
            params.put("name" , drugPres.getDrugName());
            List<DrugData> drugList = this.prescribedDrugsMapper.getDrugs(params);

            if(CollectionUtils.isEmpty(drugList)){
                DrugData drugData = new DrugData();
                prescribedDrugsMapper.createDrugs(drugData);
                drugPres.setDrugID(drugData.getDrugID());
            }else{
                drugPres.setDrugID(drugList.get(0).getDrugID());
            }


            if(drugPres.getDrugPrescriptionID() != null){
                prescribedDrugsMapper.update(drugPres);
            }else{
                prescribedDrugsMapper.create(drugPres);
            }

            for (DrugDoseData drugDose : drugPres.getPeriodicList()){
                drugDose.setDrugDoseID(drugPres.getDrugPrescriptionID());
                prescribedDrugsMapper.createDose(drugDose);
            }

        }

    }

    public List<DrugData> getDrugs(Map<String, Object> param) throws RaydarException{
        return prescribedDrugsMapper.getDrugs(param);
    }
}
