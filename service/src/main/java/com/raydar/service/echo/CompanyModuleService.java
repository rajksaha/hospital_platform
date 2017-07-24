package com.raydar.service.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.echo.CompanyModuleData;
import com.raydar.mybatis.persistence.echo.CompanyModuleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/1/2016.
 */

@Service
public class CompanyModuleService {

    @Autowired
    private CompanyModuleMapper companyModuleMapper;

    public void create(CompanyModuleData data) throws RaydarException{
        this.companyModuleMapper.create(data);
    }

    public void update(CompanyModuleData data) throws RaydarException{
        this.companyModuleMapper.update(data);
    }

    public CompanyModuleData getByID(Integer ID)throws RaydarException{
        return this.companyModuleMapper.getByID(ID);
    }

    public List<CompanyModuleData> getByParam(Map<String, Object> param) throws RaydarException{
        return this.companyModuleMapper.getByParam(param);
    }

    public void delete (Map<String,Object> param) throws RaydarException {
        this.companyModuleMapper.delete(param);
    }
}
