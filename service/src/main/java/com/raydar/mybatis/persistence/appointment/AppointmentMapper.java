package com.raydar.mybatis.persistence.appointment;


import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.appointment.AppointmentData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
public interface AppointmentMapper {

    List<AppointmentData> getAppointmentByParam(Map<String, Object> params) throws RaydarException;

    AppointmentData bringAppointment(Integer appointmentID) throws RaydarException;

    void create(AppointmentData appointmentData)throws RaydarException;

}