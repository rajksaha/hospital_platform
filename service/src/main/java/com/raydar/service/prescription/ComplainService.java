package com.raydar.service.prescription;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.ComplainData;
import com.raydar.mybatis.domain.prescription.ContentData;
import com.raydar.mybatis.persistence.prescription.ComplainMapper;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 1/4/2017.
 */
@Service
public class ComplainService {

    @Autowired
    private ComplainMapper complainMapper;

    public List<ComplainData> bringByID(Integer appointMentID)throws RaydarException {
        return complainMapper.bringByID(appointMentID);
    }

    public List<ContentData> getSymptomByParam(Map<String, Object> param) throws RaydarException{
        return complainMapper.getSymptomByParam(param);
    }

    public List<ContentData> getInvByParam(Map<String, Object> param) throws RaydarException{
        return complainMapper.getInvByParam(param);
    }

    public void save(List<ComplainData> complainList)throws RaydarException{

        for(ComplainData complain : complainList){
            Map<String, Object> params = new HashMap<>();
            params.put("name" , complain.getSymptomName());
            List<ContentData> symptomList = this.complainMapper.getSymptomByParam(params);
            if(CollectionUtils.isEmpty(symptomList)){
                ContentData contentData = new ContentData();
                contentData.setName(complain.getSymptomName());
                complainMapper.createSymptom(contentData);
                complain.setSymptomID(contentData.getId());
            }else{
                complain.setSymptomID(symptomList.get(0).getId());
            }

            if(complain.getComplainID() != null){
                complainMapper.update(complain);
            }else{
                complainMapper.create(complain);
            }
        }

    }
}
