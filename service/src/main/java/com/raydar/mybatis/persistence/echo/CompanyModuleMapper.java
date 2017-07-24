package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.echo.CompanyModuleData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/1/2016.
 */
public interface CompanyModuleMapper {

    public void create(CompanyModuleData data) throws RaydarException;

    public void update(CompanyModuleData data) throws RaydarException;

    public CompanyModuleData getByID(Integer ID) throws RaydarException;

    public List<CompanyModuleData> getByParam(Map<String, Object> param) throws RaydarException;

    public void delete(Map<String, Object> param) throws RaydarException;
}
