package com.raydar.web.controller.appoinment;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.SearchData;
import com.raydar.mybatis.domain.appointment.AppointmentData;
import com.raydar.mybatis.domain.user.UserProfileData;
import com.raydar.request.Appointment;
import com.raydar.service.appointment.AppointmentService;
import com.raydar.service.user.UserService;
import com.raydar.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 12/31/2016.
 */
@Controller
@RequestMapping("/appointment")
public class AppointmentController extends BaseController {

    public static String[] DATE_PARSE_PATTERN = {"MM/dd/yyyy", "MM-dd-yyyy", "MMddyyyy", "HHmmss"};
    public final DateFormat formatter = new SimpleDateFormat(DATE_PARSE_PATTERN[2]);
    public final DateFormat timeFormatter = new SimpleDateFormat(DATE_PARSE_PATTERN[3]);

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;




    @RequestMapping(value = {"/getByParam"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAll(HttpServletRequest request) throws RaydarException{


        Map<String, Object> params = this.parseParameter(request);
        params.put("companyID", this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID());
        if(params.get("usertype")  == 1){
            params.put("doctorID", this.getEchoUserDetail().getUserProfilePermissionData().getUserID());
        }
        if(params.get("usertype")  == 2){
            params.put("patientID", this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID());
        }

        if(params.get("appointmentStr") == null){
            params.put("appointmentDate", new Timestamp(new Date().getTime()));
        }else {
            try {
                params.put("appointmentDate", new Timestamp(formatter.parse(params.get("appointmentStr").toString()).getTime()));
            }catch (Exception e){
                    throw new RaydarException(e.getMessage());
            }
        }



        List<Appointment> dataList = appointmentService.getAppointmentByParam(params);
        Integer count = this.appointmentService.getCountByParam(params);
        return this.buildResultForGrid(dataList, count, params);
    }

    @RequestMapping(value = "/createAppointment", method = RequestMethod.POST)
    public @ResponseBody
    void createAppointment(@RequestBody AppointmentData appointmentData) throws RaydarException {

        if(appointmentData.getDoctorID() == null){
            appointmentData.setDoctorID(this.getEchoUserDetail().getUserProfilePermissionData().getUserID());
        }

        try {
            //SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
            appointmentData.setAppointmentTime(new Time(timeFormatter.parse(appointmentData.getTimeStr()).getTime()));
            appointmentData.setAppointmentDate(new Timestamp(formatter.parse(appointmentData.getDateStr()).getTime()));
        }catch (Exception e){
            throw new RaydarException(e.getMessage());
        }
        appointmentData.setStatus(0);
        appointmentData.setCompanyID(this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID());
        appointmentService.createAppointment(appointmentData);
    }


    @RequestMapping(value = "/createFollowUpAppointment", method = RequestMethod.POST)
    public @ResponseBody
    void createFollowUpAppointment(@RequestBody AppointmentData appointmentData) throws RaydarException{

        appointmentData.setAppointmentType(0);
        try {
            appointmentData.setAppointmentDate(new Timestamp(formatter.parse(appointmentData.getDateStr()).getTime()));
        }catch (Exception e){
            throw new RaydarException(e.getMessage());
        }
        //appointmentData.setDoctorID(this.getEchoUserDetail().getU);
        appointmentData.setPatientID(appointmentData.getPatientID());
        appointmentData.setCreatedBy(this.getEchoUserDetail().getUsername());
        appointmentData.setStatus(0);
        appointmentService.createAppointment(appointmentData);
        //userService.updateRunningNumber(appointmentData.getDoctorID());
    }

    @RequestMapping(value = "/bringAppointment", method = RequestMethod.POST)
    public @ResponseBody
    List<Appointment> bringAppointment(@RequestBody SearchData data) throws RaydarException{
        Map<String, Object> param = new HashMap<String, Object>();

        try {
            param.put("appointmentDate", new Timestamp(formatter.parse(data.getStartDateStr()).getTime()));
        }catch (Exception e){

        }
        return this.appointmentService.getAppointmentByParam(param);
    }

    @RequestMapping(value = {"/getItemForTypeHead/userType/{userType}/field/{field}"}, method = RequestMethod.GET)
    @ResponseBody
    public List<UserProfileData> getItemForTypeHead(@PathVariable("userType") Integer userType, @PathVariable("field") String field, HttpServletRequest request) throws RaydarException {
        Map<String, Object> params = new HashMap<>();
        params.put("userType" , userType);
        params.put("likeFirstName" , field);
        List<UserProfileData> userProfileDataList = this.userService.getUserProfileByParam(params);
        return userProfileDataList;
    }
}
