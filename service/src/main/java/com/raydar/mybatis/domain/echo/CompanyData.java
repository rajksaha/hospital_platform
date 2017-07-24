package com.raydar.mybatis.domain.echo;


import com.raydar.mybatis.domain.BaseData;
import com.raydar.mybatis.domain.eclaim.CompanyApprovalData;
import com.raydar.mybatis.domain.eclaim.CompanyGlobalRuleData;

import java.util.List;

/**
 * Created by raj on 4/20/2016.
 */
public class CompanyData extends BaseData {

    private Integer companyID;
    private String companyCode;
    private String companyName;


    private CompanyGlobalRuleData globalRuleData;


    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public CompanyGlobalRuleData getGlobalRuleData() {
        return globalRuleData;
    }

    public void setGlobalRuleData(CompanyGlobalRuleData globalRuleData) {
        this.globalRuleData = globalRuleData;
    }

}
