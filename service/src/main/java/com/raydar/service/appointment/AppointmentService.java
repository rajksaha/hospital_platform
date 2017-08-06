package com.raydar.service.appointment;
import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.appointment.AppointmentData;
import com.raydar.mybatis.persistence.appointment.AppointmentMapper;
import com.raydar.request.Appointment;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
@Service
public class AppointmentService {

    @Autowired
    private AppointmentMapper appointmentMapper;

    public  List<Appointment> getAppointmentByParam(Map<String, Object> params) throws RaydarException {
        List<Appointment> appList = appointmentMapper.getAppointmentByParam(params);;
        for(Appointment app : appList){
            Map<String, Object> innerParam = new HashMap<String, Object>();
            innerParam.put("patientID", app.getPatientID());
            innerParam.put("doctorID", app.getDoctorID());
            app.setPatientTypeToDoctor(appointmentMapper.getCountByParam(innerParam) > 0 ? "Follow-up Patient" : "New Patient");
        }
        return appList;
    }

    public Integer getCountByParam(Map<String, Object> param) throws RaydarException {
        return appointmentMapper.getCountByParam(param);
    }

    public  Appointment bringAppointment(Integer appointmentID) throws RaydarException{
        return appointmentMapper.bringAppointment(appointmentID);
    }

    public void createAppointment(AppointmentData appointmentData) throws RaydarException{
        this.appointmentMapper.create(appointmentData);
    }
}
