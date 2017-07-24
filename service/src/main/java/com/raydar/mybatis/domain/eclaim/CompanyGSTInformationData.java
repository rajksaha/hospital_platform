package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;

import java.math.BigDecimal;

/**
 * Created by raj on 6/17/2016.
 */
public class CompanyGSTInformationData  extends BaseData {

    private Integer gstCompanyID;
    private Integer companyID;
    private String companyName;
    private String gstID;
    private BigDecimal gstRate;
    private Integer taxType;
    private String taxCode;
    private String address;

    public Integer getGstCompanyID() {
        return gstCompanyID;
    }

    public void setGstCompanyID(Integer gstCompanyID) {
        this.gstCompanyID = gstCompanyID;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getGstID() {
        return gstID;
    }

    public void setGstID(String gstID) {
        this.gstID = gstID;
    }

    public BigDecimal getGstRate() {
        return gstRate;
    }

    public void setGstRate(BigDecimal gstRate) {
        this.gstRate = gstRate;
    }

    public Integer getTaxType() {
        return taxType;
    }

    public void setTaxType(Integer taxType) {
        this.taxType = taxType;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
