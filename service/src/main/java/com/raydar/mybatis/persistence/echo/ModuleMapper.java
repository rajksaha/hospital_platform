package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.echo.ModuleData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/1/2016.
 */
public interface ModuleMapper {

    public void create(ModuleData data) throws RaydarException;

    public void update(ModuleData data) throws RaydarException;

    public ModuleData getByID(Integer ID) throws RaydarException;

    public List<ModuleData> getByParam(Map<String, Object> param) throws RaydarException;

    public void delete (Map<String,Object> param) throws RaydarException;
}
