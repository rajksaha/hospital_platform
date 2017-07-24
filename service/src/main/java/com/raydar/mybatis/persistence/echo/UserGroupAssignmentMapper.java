package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.UserGroupAssignmentData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 4/28/2016.
 */
public interface UserGroupAssignmentMapper {


    public void create(UserGroupAssignmentData data) throws RaydarException;

    public void update(UserGroupAssignmentData data) throws RaydarException;

    public void deleteByUserID(Integer userID) throws RaydarException;

    public UserGroupAssignmentData getByID(Integer userProfileID) throws RaydarException;

    public List<UserGroupAssignmentData> getByParam(Map<String, Object> param) throws RaydarException;
}
