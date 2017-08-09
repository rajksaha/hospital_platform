package com.raydar.service.prescription;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.NextVisitData;
import com.raydar.mybatis.persistence.prescription.NextVisitMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by raj on 1/4/2017.
 */
@Service
public class NextVisitService {

    @Autowired
    private NextVisitMapper nextVisitMapper;

    public NextVisitData bringByID(Integer appointMentID)throws RaydarException {
        return nextVisitMapper.bringByID(appointMentID);
    }

    public void save(NextVisitData nextVisitData)throws RaydarException{

        if(nextVisitData.getNextVisitID() != null){
            nextVisitMapper.update(nextVisitData);
        }else{
            nextVisitMapper.create(nextVisitData);
        }

    }
}
