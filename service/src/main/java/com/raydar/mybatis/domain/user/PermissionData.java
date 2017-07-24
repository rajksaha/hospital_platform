package com.raydar.mybatis.domain.user;

import com.raydar.mybatis.domain.BaseData;

/**
 * Created by raj on 3/19/2016.
 */
public class PermissionData extends BaseData {

    private Integer permissionID;
    private Integer companyModuleID;
    private String functionCode;
    private String shortName;
    private Boolean isAssigned;

    public Integer getPermissionID() {
        return permissionID;
    }

    public void setPermissionID(Integer permissionID) {
        this.permissionID = permissionID;
    }

    public Integer getCompanyModuleID() {
        return companyModuleID;
    }

    public void setCompanyModuleID(Integer companyModuleID) {
        this.companyModuleID = companyModuleID;
    }

    public String getFunctionCode() {
        return functionCode;
    }

    public void setFunctionCode(String functionCode) {
        this.functionCode = functionCode;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Boolean getIsAssigned() {
        return isAssigned;
    }

    public void setIsAssigned(Boolean isAssigned) {
        this.isAssigned = isAssigned;
    }
}
