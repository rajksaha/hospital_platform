package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.UserGroupData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 4/28/2016.
 */
public interface UserGroupMapper {


    public void create(UserGroupData data) throws RaydarException;

    public void update(UserGroupData data) throws RaydarException;

    public UserGroupData getByID(Integer ID) throws RaydarException;

    public List<UserGroupData> getByParam(Map<String, Object> param) throws RaydarException;

    public Integer getCountByParam(Map<String, Object> param) throws RaydarException;

    public List<UserGroupData> getUserGroupForUser(Map<String, Object> param) throws RaydarException;
}
