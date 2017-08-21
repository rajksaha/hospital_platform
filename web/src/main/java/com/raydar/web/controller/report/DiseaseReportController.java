package com.raydar.web.controller.report;

import com.raydar.common.exception.RaydarException;
import com.raydar.request.Appointment;
import com.raydar.request.DiseaseReport;
import com.raydar.service.report.DiseaseReportService;
import com.raydar.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by raj on 8/21/2017.
 */
@Controller
@RequestMapping("/diseaseReport")
public class DiseaseReportController extends BaseController{

    @Autowired
    private DiseaseReportService diseaseReportService;

    @RequestMapping(value = {"/bringReportDetails/diseaseID/{diseaseID}"}, method = RequestMethod.POST)
    @ResponseBody
    public DiseaseReport bringAppointment(@PathVariable("diseaseID") Integer diseaseID, HttpServletRequest request) throws RaydarException {
        DiseaseReport diseaseReport= new DiseaseReport();
        diseaseReport.setDrugList(diseaseReportService.getDrugList(diseaseID));
        diseaseReport.setInvList(diseaseReportService.getInvList(diseaseID));
        diseaseReport.setSymptomList(diseaseReportService.getComplainList(diseaseID));
        return diseaseReport;
    }
}
