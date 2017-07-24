package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;

import java.math.BigDecimal;

/**
 * Created by raj on 4/26/2016.
 */
public class CompanyGlobalRuleData extends BaseData {

    private Integer companyGlobalRuleID;
    private Integer claimCutOffDay;
    private Integer claimApprovalLimit;
    private String defaultPassword;
    private Integer companyID;
    private BigDecimal taxRate;
    private String currency;

    public Integer getCompanyGlobalRuleID() {
        return companyGlobalRuleID;
    }

    public void setCompanyGlobalRuleID(Integer companyGlobalRuleID) {
        this.companyGlobalRuleID = companyGlobalRuleID;
    }

    public Integer getClaimCutOffDay() {
        return claimCutOffDay;
    }

    public void setClaimCutOffDay(Integer claimCutOffDay) {
        this.claimCutOffDay = claimCutOffDay;
    }

    public Integer getClaimApprovalLimit() {
        return claimApprovalLimit;
    }

    public void setClaimApprovalLimit(Integer claimApprovalLimit) {
        this.claimApprovalLimit = claimApprovalLimit;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public String getDefaultPassword() {
        return defaultPassword;
    }

    public void setDefaultPassword(String defaultPassword) {
        this.defaultPassword = defaultPassword;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(BigDecimal taxRate) {
        this.taxRate = taxRate;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
