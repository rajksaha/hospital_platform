package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.GroupPermissionData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/3/2016.
 */
public interface GroupPermissionMapper {

    public void create(GroupPermissionData data) throws RaydarException;

    public void update(GroupPermissionData data) throws RaydarException;

    public GroupPermissionData getByID(Integer ID) throws RaydarException;

    public void deletePermissionByGroup(Integer groupID) throws RaydarException;

    public List<GroupPermissionData> getByParam(Map<String, Object> param) throws RaydarException;
}
