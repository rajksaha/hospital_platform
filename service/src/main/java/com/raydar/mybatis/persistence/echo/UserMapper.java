package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.UserData;
import com.raydar.mybatis.domain.user.GroupPermissionData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 3/19/2016.
 */
public interface UserMapper {

    public void create(UserData userData) throws RaydarException;

    public void update(UserData userData) throws RaydarException;

    public void updatePassword(UserData userData) throws RaydarException;

    public void updateStatus(UserData userData) throws RaydarException;

    public UserData getUserByUserName (String userName) throws RaydarException;

    public List<GroupPermissionData> getUserPermissionByUserID(Integer userID) throws RaydarException;

    public List<UserData> getUserByParam (Map<String, Object> param)throws RaydarException;

}
