package com.raydar.service;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.ContentDetailData;
import com.raydar.mybatis.persistence.echo.ContentDetailMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 4/29/2016.
 */
@Service
public class ContentDetailService {

    @Autowired
    private ContentDetailMapper contentDetailMapper;


    public void create(ContentDetailData data) throws RaydarException {
        this.contentDetailMapper.create(data);
    }

    public void update(ContentDetailData data) throws RaydarException {
        this.contentDetailMapper.update(data);
    }

    public List<ContentDetailData> getByParam(Map<String, Object> params) throws RaydarException {
        return this.contentDetailMapper.getByParam(params);
    }

    public List<ContentDetailData> getChildContentInfo(Map<String, Object> params) throws RaydarException {
        return this.contentDetailMapper.getChildContentInfo(params);
    }

    public ContentDetailData getByID(Integer ID) throws RaydarException {
        return this.contentDetailMapper.getByID(ID);
    }
}
