package com.raydar.mybatis.persistence.appointment;


import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.appointment.AppointmentData;
import com.raydar.mybatis.domain.appointment.AppointmentInfo;
import com.raydar.request.Appointment;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
public interface AppointmentInfoMapper {

    List<AppointmentInfo> getAppointmentInfoByParam(Map<String, Object> params) throws RaydarException;

    AppointmentInfo bringAppointmentInfo(Integer appointmentInfoID) throws RaydarException;

    void create(AppointmentInfo appointmentInfo)throws RaydarException;

    void update(AppointmentInfo appointmentInfo)throws RaydarException;

    void delete(Map<String, Object> params)throws RaydarException;

}