package com.raydar.service.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.echo.ModuleData;
import com.raydar.mybatis.persistence.echo.ModuleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/1/2016.
 */

@Service
public class ModuleService {

    @Autowired
    private ModuleMapper moduleMapper;

    public void create(ModuleData data) throws RaydarException {
        moduleMapper.create(data);
    }

    public void update(ModuleData data) throws RaydarException{
        moduleMapper.update(data);
    }

    public ModuleData getByID(Integer ID)throws RaydarException{
        return this.moduleMapper.getByID(ID);
    }

    public List<ModuleData> getByParam(Map<String, Object> param) throws RaydarException{
        return this.moduleMapper.getByParam(param);
    }

    public void delete (Map<String,Object> param) throws RaydarException {
        this.moduleMapper.delete(param);
    }
}
