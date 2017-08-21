package com.raydar.mybatis.persistence.report;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.ContentData;

import java.util.List;

/**
 * Created by raj on 8/21/2017.
 */
public interface DiseaseReportMapper {


    public List<ContentData> getComplainList(Integer diseaseID) throws RaydarException;

    public List<ContentData> getDrugList(Integer diseaseID) throws RaydarException;

    public List<ContentData> getInvList(Integer diseaseID) throws RaydarException;
}
