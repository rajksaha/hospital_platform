package com.raydar.mybatis.persistence.prescription;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.NextVisitData;

/**
 * Created by raj on 1/4/2017.
 */
public interface NextVisitMapper {

    NextVisitData bringByID(Integer appointmentID)throws RaydarException;

    void create(NextVisitData data)throws RaydarException;

    void update(NextVisitData data)throws RaydarException;

}
