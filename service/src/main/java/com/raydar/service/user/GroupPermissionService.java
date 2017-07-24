package com.raydar.service.user;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.GroupPermissionData;
import com.raydar.mybatis.persistence.echo.GroupPermissionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/3/2016.
 */
@Service
public class GroupPermissionService {

    @Autowired
    private GroupPermissionMapper groupPermissionMapper;

    public void create(GroupPermissionData data) throws RaydarException{
        this.groupPermissionMapper.create(data);
    }

    public void update(GroupPermissionData data) throws RaydarException {
        this.groupPermissionMapper.update(data);
    }

    public GroupPermissionData getByID(Integer ID) throws RaydarException {
        return this.groupPermissionMapper.getByID(ID);
    }

    public List<GroupPermissionData> getByParam(Map<String, Object> param) throws RaydarException {
        return this.groupPermissionMapper.getByParam(param);
    }


}
