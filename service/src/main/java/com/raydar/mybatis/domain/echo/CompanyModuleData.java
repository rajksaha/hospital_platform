package com.raydar.mybatis.domain.echo;

import com.raydar.mybatis.domain.BaseData;

/**
 * Created by raj on 4/20/2016.
 */
public class CompanyModuleData extends BaseData {

    private Integer companyModuleID;
    private Integer companyID;
    private Integer moduleID;
    private String shortName;

    private String companyName;
    private String moduleName;

    public Integer getCompanyModuleID() {
        return companyModuleID;
    }

    public void setCompanyModuleID(Integer companyModuleID) {
        this.companyModuleID = companyModuleID;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public Integer getModuleID() {
        return moduleID;
    }

    public void setModuleID(Integer moduleID) {
        this.moduleID = moduleID;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }
}
