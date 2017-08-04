package com.raydar.web.controller.appoinment;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.SearchData;
import com.raydar.mybatis.domain.appointment.AppointmentData;
import com.raydar.mybatis.domain.user.UserProfileData;
import com.raydar.service.appointment.AppointmentService;
import com.raydar.service.user.UserService;
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
@RequestMapping("/appointment")
public class AppointmentController extends BaseController {

    public static String[] DATE_PARSE_PATTERN = {"MM/dd/yyyy", "MM-dd-yyyy", "MMddyyyy"};
    public final DateFormat formatter = new SimpleDateFormat(DATE_PARSE_PATTERN[2]);

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;



    @RequestMapping(value = "/createAppointment", method = RequestMethod.POST)
    public @ResponseBody
    void createAppointment(@RequestBody AppointmentData appointmentData) throws RaydarException {

        if(appointmentData.getPatientProfileData()!= null && appointmentData.getPatientProfileData().getUserID() == null){
            //this.userService.createUser(appointmentData.getPatientProfileData(), 2);
            appointmentData.getPatientProfileData().getUserID();
            appointmentData.setAppointmentType(1);

        }else{
            appointmentData.setAppointmentType(0);
        }

        try {
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
            appointmentData.setAppointmentDate(new Timestamp(formatter.parse(appointmentData.getDateStr()).getTime()));
        }catch (Exception e){

        }
        appointmentData.setPatientID(appointmentData.getPatientProfileData().getUserID());
        appointmentData.setStatus(0);
        appointmentService.createAppointment(appointmentData);
        //userService.updateRunningNumber(appointmentData.getDoctorID());
    }


    @RequestMapping(value = "/createFollowUpAppointment", method = RequestMethod.POST)
    public @ResponseBody
    void createFollowUpAppointment(@RequestBody AppointmentData appointmentData) throws RaydarException{

        appointmentData.setAppointmentType(0);
        try {
            appointmentData.setAppointmentDate(new Timestamp(formatter.parse(appointmentData.getDateStr()).getTime()));
        }catch (Exception e){

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
    List<AppointmentData> bringAppointment(@RequestBody SearchData data) throws RaydarException{
        Map<String, Object> param = new HashMap<String, Object>();

        try {
            param.put("appointmentDate", new Timestamp(formatter.parse(data.getStartDateStr()).getTime()));
        }catch (Exception e){

        }
        //param.put("doctorID",  this.getDoctorUserDetails().getLoggedInUserdata().getUserID());
        return this.appointmentService.getAppointmentByParam(param);
    }

    @RequestMapping(value = {"/getItemForTypeHead/data/{data}/field/{field}"}, method = RequestMethod.GET)
    @ResponseBody
    public List<UserProfileData> getItemForTypeHead(@PathVariable("data") String data, @PathVariable("field") String field, HttpServletRequest request) throws RaydarException {
        Map<String, Object> params = new HashMap<>();
        params.put("data" , data);
        params.put("fieldName" , field);
        List<UserProfileData> userProfileDataList = this.userService.getUserProfileByParam(params);
        return userProfileDataList;
    }
}
