package com.raydar.service.user;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.GroupPermissionData;
import com.raydar.mybatis.domain.user.PermissionData;
import com.raydar.mybatis.domain.user.UserGroupData;
import com.raydar.mybatis.persistence.echo.GroupPermissionMapper;
import com.raydar.mybatis.persistence.echo.PermissionMapper;
import com.raydar.mybatis.persistence.echo.UserGroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/3/2016.
 */
@Service
public class UserGroupService {

    @Autowired
    private UserGroupMapper userGroupMapper;

    @Autowired
    private PermissionMapper permissionMapper;

    @Autowired
    private GroupPermissionMapper groupPermissionMapper;

    public void create(UserGroupData data) throws RaydarException{
        this.userGroupMapper.create(data);
    }

    public void update(UserGroupData data) throws RaydarException {
        this.userGroupMapper.update(data);
    }

    public UserGroupData getByID(Integer ID) throws RaydarException {
        return this.userGroupMapper.getByID(ID);
    }

    public List<UserGroupData> getByParam(Map<String, Object> param) throws RaydarException {
        return this.userGroupMapper.getByParam(param);
    }

    public Integer getCountByParam(Map<String, Object> param) throws RaydarException {
        return this.userGroupMapper.getCountByParam(param);
    }

    public List<UserGroupData> getUserGroupForUser(Map<String, Object> param) throws RaydarException {
        return this.userGroupMapper.getUserGroupForUser(param);
    }

    public List<PermissionData> getCompanyModulePermission(Map<String, Object> param) throws RaydarException{
        return this.permissionMapper.getCompanyModulePermission(param);
    }

    public void updateGroupPermission(UserGroupData userGroupData) throws RaydarException{

        //Delete all assigned permission
        this.groupPermissionMapper.deletePermissionByGroup(userGroupData.getUserGroupID());

        for(PermissionData permission : userGroupData.getGroupPermissionList()){
            if(permission.getIsAssigned() != null && permission.getIsAssigned()){
                GroupPermissionData groupPermissionData = new GroupPermissionData();
                groupPermissionData.setUserGroupID(userGroupData.getUserGroupID());
                groupPermissionData.setStatusValue(1);
                groupPermissionData.setPermissionID(permission.getPermissionID());
                this.groupPermissionMapper.create(groupPermissionData);
            }
        }
    }

    public List<PermissionData> getPermissionByParam (Map<String, Object> param) throws RaydarException{
        return this.permissionMapper.getByParam(param);
    }




}
