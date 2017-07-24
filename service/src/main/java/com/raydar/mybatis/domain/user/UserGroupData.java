package com.raydar.mybatis.domain.user;

import com.raydar.mybatis.domain.BaseData;

import java.util.List;

/**
 * Created by raj on 3/19/2016.
 */
public class UserGroupData extends BaseData {

    private Integer userGroupID;
    private String shortName;
    private String longDesc;
    private Integer companyModuleID;
    private String companyModuleName;
    private String companyName;
    private String moduleName;

    private Boolean isAssigned;

    private List<PermissionData> groupPermissionList;

    public Integer getUserGroupID() {
        return userGroupID;
    }

    public void setUserGroupID(Integer userGroupID) {
        this.userGroupID = userGroupID;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getLongDesc() {
        return longDesc;
    }

    public void setLongDesc(String longDesc) {
        this.longDesc = longDesc;
    }

    public Integer getCompanyModuleID() {
        return companyModuleID;
    }

    public void setCompanyModuleID(Integer companyModuleID) {
        this.companyModuleID = companyModuleID;
    }

    public String getCompanyModuleName() {
        return companyModuleName;
    }

    public void setCompanyModuleName(String companyModuleName) {
        this.companyModuleName = companyModuleName;
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

    public Boolean getIsAssigned() {
        return isAssigned;
    }

    public void setIsAssigned(Boolean isAssigned) {
        this.isAssigned = isAssigned;
    }

    public List<PermissionData> getGroupPermissionList() {
        return groupPermissionList;
    }

    public void setGroupPermissionList(List<PermissionData> groupPermissionList) {
        this.groupPermissionList = groupPermissionList;
    }
}
