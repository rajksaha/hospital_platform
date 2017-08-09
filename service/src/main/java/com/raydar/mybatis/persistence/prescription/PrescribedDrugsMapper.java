package com.raydar.mybatis.persistence.prescription;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.drug.DrugData;
import com.raydar.mybatis.domain.prescription.drug.DrugPrescriptionData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
public interface PrescribedDrugsMapper {


    List<DrugPrescriptionData> bringByID(Integer appointmentID)throws RaydarException;

    List<DrugData> getDrugs(Map<String, Object> param) throws RaydarException;

    void createDrugs(DrugData data)throws RaydarException;

    void create(DrugPrescriptionData data)throws RaydarException;

    void update(DrugPrescriptionData data)throws RaydarException;



}
