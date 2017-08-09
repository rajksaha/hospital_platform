package com.raydar.web.controller.prescription;


import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.SearchData;
import com.raydar.mybatis.domain.prescription.ComplainData;
import com.raydar.mybatis.domain.prescription.DiagnosisData;
import com.raydar.mybatis.domain.prescription.NextVisitData;
import com.raydar.mybatis.domain.prescription.drug.DrugPrescriptionData;
import com.raydar.request.Appointment;
import com.raydar.service.appointment.AppointmentService;
import com.raydar.service.prescription.ComplainService;
import com.raydar.service.prescription.NextVisitService;
import com.raydar.service.prescription.diagnosis.DiagnosisService;
import com.raydar.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 12/31/2016.
 */
@Controller
@RequestMapping("/prescription")
public class PrescriptionController extends BaseController {

    public static String[] DATE_PARSE_PATTERN = {"MM/dd/yyyy", "MM-dd-yyyy", "MMddyyyy"};
    public final DateFormat formatter = new SimpleDateFormat(DATE_PARSE_PATTERN[2]);

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private DiagnosisService diagnosisService;

    @Autowired
    private ComplainService complainService;

    @Autowired
    private NextVisitService nextVisitService;


    @RequestMapping(value = {"/bringAppointment/appointmentID/{appointmentID}"}, method = RequestMethod.POST)
    @ResponseBody
    public Appointment bringAppointment(@PathVariable("appointmentID") Integer appointmentID, HttpServletRequest request) throws RaydarException {
        return this.appointmentService.bringAppointment(appointmentID);
    }

    @RequestMapping(value = {"/bringComplain/appointmentID/{appointmentID}"}, method = RequestMethod.POST)
    @ResponseBody
    public List<ComplainData> bringComplain(@PathVariable("appointmentID") Integer appointmentID, HttpServletRequest request) throws RaydarException{
        return this.complainService.bringByID(appointmentID);
    }

    @RequestMapping(value = {"/bringPrescribedDrugs/appointmentID/{appointmentID}"}, method = RequestMethod.POST)
    @ResponseBody
    public List<DrugPrescriptionData> bringPrescribedDrugs(@PathVariable("appointmentID") Integer appointmentID, HttpServletRequest request) throws RaydarException{
        return null;
    }

    @RequestMapping(value = {"/bringDiagnosis/appointmentID/{appointmentID}"}, method = RequestMethod.POST)
    @ResponseBody
    public DiagnosisData bringDiagnosis(@PathVariable("appointmentID") Integer appointmentID, HttpServletRequest request) throws RaydarException{
        return this.diagnosisService.bringDiagnosisByID(appointmentID);
    }

    @RequestMapping(value = {"/bringNextVisit/appointmentID/{appointmentID}"}, method = RequestMethod.POST)
    @ResponseBody
    public NextVisitData bringNextVisit(@PathVariable("appointmentID") Integer appointmentID, HttpServletRequest request) throws RaydarException{
        return this.nextVisitService.bringByID(appointmentID);
    }

    @RequestMapping(value = {"/saveDiagnosis"}, method = RequestMethod.POST)
    @ResponseBody
    public void saveDiagnosis(@RequestBody DiagnosisData diagnosisData, HttpServletRequest request) throws RaydarException{
        this.diagnosisService.saveDiagnosis(diagnosisData);
    }

    @RequestMapping(value = {"/saveNextVisit"}, method = RequestMethod.POST)
    @ResponseBody
    public void saveNextVisit(@RequestBody NextVisitData nextVisitData, HttpServletRequest request) throws RaydarException{
        try {
            if(nextVisitData.getNextVisitType() == 1){
                nextVisitData.setDate(new Timestamp(formatter.parse(nextVisitData.getDateStr()).getTime()));
            }
        }catch (Exception e){

        }
        this.nextVisitService.save(nextVisitData);
    }

    @RequestMapping(value = {"/saveComplain"}, method = RequestMethod.POST)
    @ResponseBody
    public void saveComplain(@RequestBody SearchData data, HttpServletRequest request) throws RaydarException{
        this.complainService.save(data.getComplainList());
    }

    @RequestMapping(value = {"/saveDrugs"}, method = RequestMethod.POST)
    @ResponseBody
    public void saveDrugs(@RequestBody SearchData data, HttpServletRequest request) throws RaydarException{
        this.complainService.save(data.getComplainList());
    }


    @RequestMapping(value = {"/getItemForTypeHead/data/{data}/field/{field}"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getItemForTypeHead(@PathVariable("data") String data, @PathVariable("field") String field, HttpServletRequest request) throws RaydarException {
        Map<String, Object> params = new HashMap<>();
        params.put("data" , data);
        Map<String, Object> result = new HashMap<>();
        if(field != null){

            switch (field){
                case "DISEASE" :
                    result.put("diseaseList", diagnosisService.getDiseaseByParam(params));
                    break;
                case "SYMPTOM" :
                    result.put("symptomList", complainService.getSymptomByParam(params));
                    break;
                default:
                    break;
            }
        }

        return result;
    }
}
