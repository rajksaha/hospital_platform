package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.PermissionData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/3/2016.
 */
public interface PermissionMapper {

    public void create(PermissionData data) throws RaydarException;

    public void update(PermissionData data) throws RaydarException;

    public PermissionData getByID(Integer ID) throws RaydarException;

    public List<PermissionData> getByParam(Map<String, Object> param) throws RaydarException;

    public List<PermissionData> getCompanyModulePermission(Map<String, Object> param) throws RaydarException;
}
