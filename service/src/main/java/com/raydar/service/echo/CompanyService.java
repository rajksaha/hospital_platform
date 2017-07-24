package com.raydar.service.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.echo.CompanyData;
import com.raydar.mybatis.domain.user.UserData;
import com.raydar.mybatis.persistence.echo.CompanyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/1/2016.
 */

@Service
public class CompanyService {

    @Autowired
    private CompanyMapper companyMapper;

    public void create(CompanyData data) throws RaydarException{
        companyMapper.create(data);
    }

    public void update(CompanyData data) throws RaydarException{
        companyMapper.update(data);
    }

    public CompanyData getByID(Integer ID)throws RaydarException{
        return this.companyMapper.getByID(ID);
    }

    public List<CompanyData> getByParam(Map<String, Object> param) throws RaydarException{
        return this.companyMapper.getByParam(param);
    }

    public void delete (Map<String,Object> param) throws RaydarException {
        this.companyMapper.delete(param);
    }
}
