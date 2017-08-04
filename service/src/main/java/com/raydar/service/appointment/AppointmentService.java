package com.raydar.service.appointment;
import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.appointment.AppointmentData;
import com.raydar.mybatis.persistence.appointment.AppointmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
@Service
public class AppointmentService {

    @Autowired
    private AppointmentMapper appointmentMapper;

    public  List<AppointmentData> getAppointmentByParam(Map<String, Object> params) throws RaydarException {
        return appointmentMapper.getAppointmentByParam(params);
    }

    public  AppointmentData bringAppointment(Integer appointmentID) throws RaydarException{
        return appointmentMapper.bringAppointment(appointmentID);
    }

    public void createAppointment(AppointmentData appointmentData) throws RaydarException{
        this.appointmentMapper.create(appointmentData);
    }
}
