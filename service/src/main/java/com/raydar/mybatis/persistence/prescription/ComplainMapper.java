package com.raydar.mybatis.persistence.prescription;


import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.ComplainData;
import com.raydar.mybatis.domain.prescription.ContentData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
public interface ComplainMapper {


    List<ComplainData> bringByID(Integer appointmentID)throws RaydarException;

    List<ContentData> getSymptomByParam(Map<String, Object> param) throws RaydarException;

    void createSymptom(ContentData contentData)throws RaydarException;

    void create(ComplainData data)throws RaydarException;

    void update(ComplainData data)throws RaydarException;

    void createInv(ContentData contentData)throws RaydarException;

    List<ContentData> getInvByParam(Map<String, Object> param) throws RaydarException;



}
