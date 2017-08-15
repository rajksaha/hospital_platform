package com.raydar.service.appointment;
import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.appointment.AppointmentData;
import com.raydar.mybatis.domain.appointment.AppointmentInfo;
import com.raydar.mybatis.persistence.appointment.AppointmentInfoMapper;
import com.raydar.mybatis.persistence.prescription.ComplainMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
@Service
public class AppointmentInfoService {

    @Autowired
    private AppointmentInfoMapper appointmentInfoMapper;

    @Autowired
    private ComplainMapper complainMapper;

    public void save(List<AppointmentInfo> infoList, String itemType) throws RaydarException{

        for (AppointmentInfo info : infoList){
            info.setItemType(itemType);
            appointmentInfoMapper.create(info);
        }
    }

    public  List<AppointmentInfo> getInvInfoByParam(Map<String, Object> params) throws RaydarException {
        List<AppointmentInfo> infoList = appointmentInfoMapper.getAppointmentInfoByParam(params);

        for (AppointmentInfo info : infoList){
            params.put("id", info.getItemID());
            info.setItemName(complainMapper.getInvByParam(params).get(0).getName());
        }
        return infoList;
    }

    public  List<AppointmentInfo> getAppointmentInfoByParam(Map<String, Object> params) throws RaydarException {
        return appointmentInfoMapper.getAppointmentInfoByParam(params);
    }

    public  AppointmentInfo bringAppointment(Integer appointmentID) throws RaydarException{
        return appointmentInfoMapper.bringAppointmentInfo(appointmentID);
    }

    public void create(AppointmentInfo appointmentData) throws RaydarException{
        this.appointmentInfoMapper.create(appointmentData);
    }

    public void update(AppointmentInfo appointmentData) throws RaydarException{
        this.appointmentInfoMapper.update(appointmentData);
    }

    public void delete(Map<String, Object> params) throws RaydarException{
        this.appointmentInfoMapper.delete(params);
    }
}
