package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;

import java.util.List;

/**
 * Created by raj on 4/2/2016.
 */
public class CategoryDATA extends BaseData {

    private Integer categoryID;
    private Integer companyID;
    private Integer claimType;
    private Boolean isTaxRequire;
    private String categoryCode;
    private String shortName;
    private String longDesc;
    private Integer requireOriginal;

    private Boolean hasError;
    private String errorMessage;
    private Boolean headError;
    private Boolean hasWarning;


    private List<CategoryFieldDATA> fieldDATAs;
    private List<CategoryRuleDATA> ruleList;
    private List<ClaimBulkData> claimEventList;

    private ClaimBulkData claimBulkData;

    private List<ClaimFromData> categoryClaimFormList;




    public Integer getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Integer categoryID) {
        this.categoryID = categoryID;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
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

    public List<CategoryFieldDATA> getFieldDATAs() {
        return fieldDATAs;
    }

    public void setFieldDATAs(List<CategoryFieldDATA> fieldDATAs) {
        this.fieldDATAs = fieldDATAs;
    }

    public List<CategoryRuleDATA> getRuleList() {
        return ruleList;
    }

    public void setRuleList(List<CategoryRuleDATA> ruleList) {
        this.ruleList = ruleList;
    }

    public List<ClaimBulkData> getClaimEventList() {
        return claimEventList;
    }

    public void setClaimEventList(List<ClaimBulkData> claimEventList) {
        this.claimEventList = claimEventList;
    }

    public List<ClaimFromData> getCategoryClaimFormList() {
        return categoryClaimFormList;
    }

    public void setCategoryClaimFormList(List<ClaimFromData> categoryClaimFormList) {
        this.categoryClaimFormList = categoryClaimFormList;
    }

    public ClaimBulkData getClaimBulkData() {
        return claimBulkData;
    }

    public void setClaimBulkData(ClaimBulkData claimBulkData) {
        this.claimBulkData = claimBulkData;
    }

    public Boolean getHasError() {
        return hasError;
    }

    public void setHasError(Boolean hasError) {
        this.hasError = hasError;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Boolean getHeadError() {
        return headError;
    }

    public void setHeadError(Boolean headError) {
        this.headError = headError;
    }

    public Integer getRequireOriginal() {
        return requireOriginal;
    }

    public void setRequireOriginal(Integer requireOriginal) {
        this.requireOriginal = requireOriginal;
    }

    public Integer getClaimType() {
        return claimType;
    }

    public void setClaimType(Integer claimType) {
        this.claimType = claimType;
    }

    public Boolean getIsTaxRequire() {
        return isTaxRequire;
    }

    public void setIsTaxRequire(Boolean isTaxRequire) {
        this.isTaxRequire = isTaxRequire;
    }

    public Boolean getHasWarning() {
        return hasWarning;
    }

    public void setHasWarning(Boolean hasWarning) {
        this.hasWarning = hasWarning;
    }
}
