package com.raydar.mybatis.domain.echo;

import com.raydar.mybatis.domain.BaseData;

import java.math.BigDecimal;

/**
 * Created by raj on 8/10/2016.
 */
public class CompanyTaxInfoData extends BaseData{

    private Integer companyTaxInfoID;
    private String companyName;
    private String companyCode;
    private String tradingName;
    private String regNumber;
    private BigDecimal amount;
    private Integer status;

    public Integer getCompanyTaxInfoID() {
        return companyTaxInfoID;
    }

    public void setCompanyTaxInfoID(Integer companyTaxInfoID) {
        this.companyTaxInfoID = companyTaxInfoID;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getTradingName() {
        return tradingName;
    }

    public void setTradingName(String tradingName) {
        this.tradingName = tradingName;
    }

    public String getRegNumber() {
        return regNumber;
    }

    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
