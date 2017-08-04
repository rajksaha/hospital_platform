package com.raydar.mybatis.domain.echo;


import com.raydar.mybatis.domain.BaseData;

import java.util.List;

/**
 * Created by raj on 4/20/2016.
 */
public class CompanyData extends BaseData {

    private Integer companyID;
    private String companyCode;
    private String companyName;




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



}
