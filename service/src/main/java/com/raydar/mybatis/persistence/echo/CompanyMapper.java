package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.echo.CompanyData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/1/2016.
 */
public interface CompanyMapper {

    public void create(CompanyData data) throws RaydarException;

    public void update(CompanyData data) throws RaydarException;

    public CompanyData getByID(Integer ID) throws RaydarException;

    public List<CompanyData> getByParam(Map<String, Object> param) throws RaydarException;

    public void delete(Map<String, Object> param) throws RaydarException;
}
