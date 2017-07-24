package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;
import com.raydar.mybatis.domain.user.CompanyLevelData;

import java.util.List;

/**
 * Created by raj on 4/2/2016.
 */
public class CategoryRuleDATA extends BaseData{

    private Integer categoryRuleID;
    private Integer categoryFieldID;
    private Integer categoryID;
    private Integer subCategoryTypeID;
    private Integer subCategoryID;
    private Integer subCatActionColumnID;
    private String shortName;
    private Integer ruleType;
    private String ruleJsonString;
    private String applyTo;
    private Integer limit;
    private String errorMsg;
    private Integer allowException;

    private String applyToJsonString;

    private String subcategoryName;
    private String categoryFieldName;

    private List<CompanyLevelData> applyToList;

    private List<CategoryRuleValueDATA> ruleValueList;

    private List<RuleSettingData> ruleSettingList;

    public Integer getCategoryRuleID() {
        return categoryRuleID;
    }

    public void setCategoryRuleID(Integer categoryRuleID) {
        this.categoryRuleID = categoryRuleID;
    }

    public Integer getCategoryFieldID() {
        return categoryFieldID;
    }

    public void setCategoryFieldID(Integer categoryFieldID) {
        this.categoryFieldID = categoryFieldID;
    }

    public Integer getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Integer categoryID) {
        this.categoryID = categoryID;
    }

    public Integer getSubCategoryID() {
        return subCategoryID;
    }

    public void setSubCategoryID(Integer subCategoryID) {
        this.subCategoryID = subCategoryID;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Integer getRuleType() {
        return ruleType;
    }

    public void setRuleType(Integer ruleType) {
        this.ruleType = ruleType;
    }

    public String getApplyTo() {
        return applyTo;
    }

    public void setApplyTo(String applyTo) {
        this.applyTo = applyTo;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public List<CategoryRuleValueDATA> getRuleValueList() {
        return ruleValueList;
    }

    public void setRuleValueList(List<CategoryRuleValueDATA> ruleValueList) {
        this.ruleValueList = ruleValueList;
    }

    public String getSubcategoryName() {
        return subcategoryName;
    }

    public void setSubcategoryName(String subcategoryName) {
        this.subcategoryName = subcategoryName;
    }

    public String getCategoryFieldName() {
        return categoryFieldName;
    }

    public void setCategoryFieldName(String categoryFieldName) {
        this.categoryFieldName = categoryFieldName;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public List<CompanyLevelData> getApplyToList() {
        return applyToList;
    }

    public void setApplyToList(List<CompanyLevelData> applyToList) {
        this.applyToList = applyToList;
    }

    public String getApplyToJsonString() {
        return applyToJsonString;
    }

    public void setApplyToJsonString(String applyToJsonString) {
        this.applyToJsonString = applyToJsonString;
    }

    public String getRuleJsonString() {
        return ruleJsonString;
    }

    public void setRuleJsonString(String ruleJsonString) {
        this.ruleJsonString = ruleJsonString;
    }

    public List<RuleSettingData> getRuleSettingList() {
        return ruleSettingList;
    }

    public void setRuleSettingList(List<RuleSettingData> ruleSettingList) {
        this.ruleSettingList = ruleSettingList;
    }

    public Integer getAllowException() {
        return allowException;
    }

    public void setAllowException(Integer allowException) {
        this.allowException = allowException;
    }

    public Integer getSubCategoryTypeID() {
        return subCategoryTypeID;
    }

    public void setSubCategoryTypeID(Integer subCategoryTypeID) {
        this.subCategoryTypeID = subCategoryTypeID;
    }

    public Integer getSubCatActionColumnID() {
        return subCatActionColumnID;
    }

    public void setSubCatActionColumnID(Integer subCatActionColumnID) {
        this.subCatActionColumnID = subCatActionColumnID;
    }
}
