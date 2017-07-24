package com.raydar.mybatis.domain.echo;

import com.raydar.mybatis.domain.BaseData;

/**
 * Created by raj on 4/20/2016.
 */
public class ModuleData extends BaseData {

    private Integer moduleID;
    private String moduleCode;
    private String moduleName;

    public Integer getModuleID() {
        return moduleID;
    }

    public void setModuleID(Integer moduleID) {
        this.moduleID = moduleID;
    }

    public String getModuleCode() {
        return moduleCode;
    }

    public void setModuleCode(String moduleCode) {
        this.moduleCode = moduleCode;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }
}
