package com.raydar.service.report;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.ContentData;
import com.raydar.mybatis.persistence.report.DiseaseReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by raj on 8/21/2017.
 */
@Service
public class DiseaseReportService {

    @Autowired
    private DiseaseReportMapper diseaseReportMapper;

    public List<ContentData> getComplainList(Integer diseaseID) throws RaydarException{
        return diseaseReportMapper.getComplainList(diseaseID);
    }

    public List<ContentData> getDrugList(Integer diseaseID) throws RaydarException{
        return diseaseReportMapper.getDrugList(diseaseID);
    }

    public List<ContentData> getInvList(Integer diseaseID) throws RaydarException{
        return diseaseReportMapper.getInvList(diseaseID);
    }
}
