package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.ImageContent;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by raj on 4/2/2016.
 */
public class CategoryFieldDATA {

    private Integer categoryFieldID;
    private Integer categoryID;
    private String shortName;
    private Integer fieldType;
    private Integer subCategoryTypeID;
    private Integer dependentFieldID;
    private Integer hasLimit;
    private Integer isRequire;
    private Integer isAmount;
    private String key;
    private Integer order;
    private Integer ruleType;
    private List<ImageContent> imageContentList;

    private String fieldValue;
    private String fieldValueStr;
    private Boolean isTaxRequire;
    private Timestamp invDate;
    private String invNumber;
    private Integer companyTaxInfoID;


    private List<SubCategoryDATA> subCategoryList;

    private List<SubCategoryTypeData> subCategoryTypeList;

    private Boolean hasError;
    private Boolean hasWarning;
    private String errorMessage;
    private BigDecimal maxAmount;

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

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Integer getFieldType() {
        return fieldType;
    }

    public void setFieldType(Integer fieldType) {
        this.fieldType = fieldType;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Integer getHasLimit() {
        return hasLimit;
    }

    public void setHasLimit(Integer hasLimit) {
        this.hasLimit = hasLimit;
    }

    public Integer getIsRequire() {
        return isRequire;
    }

    public void setIsRequire(Integer isRequire) {
        this.isRequire = isRequire;
    }

    public Integer getIsAmount() {
        return isAmount;
    }

    public void setIsAmount(Integer isAmount) {
        this.isAmount = isAmount;
    }

    public List<SubCategoryDATA> getSubCategoryList() {
        return subCategoryList;
    }

    public void setSubCategoryList(List<SubCategoryDATA> subCategoryList) {
        this.subCategoryList = subCategoryList;
    }

    public String getFieldValue() {
        return fieldValue;
    }

    public void setFieldValue(String fieldValue) {
        this.fieldValue = fieldValue;
    }

    public List<ImageContent> getImageContentList() {
        return imageContentList;
    }

    public void setImageContentList(List<ImageContent> imageContentList) {
        this.imageContentList = imageContentList;
    }

    public Integer getRuleType() {
        return ruleType;
    }

    public void setRuleType(Integer ruleType) {
        this.ruleType = ruleType;
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

    public BigDecimal getMaxAmount() {
        return maxAmount;
    }

    public void setMaxAmount(BigDecimal maxAmount) {
        this.maxAmount = maxAmount;
    }

    public Boolean getIsTaxRequire() {
        return isTaxRequire;
    }

    public void setIsTaxRequire(Boolean isTaxRequire) {
        this.isTaxRequire = isTaxRequire;
    }

    public Timestamp getInvDate() {
        return invDate;
    }

    public void setInvDate(Timestamp invDate) {
        this.invDate = invDate;
    }

    public String getInvNumber() {
        return invNumber;
    }

    public void setInvNumber(String invNumber) {
        this.invNumber = invNumber;
    }

    public Integer getCompanyTaxInfoID() {
        return companyTaxInfoID;
    }

    public void setCompanyTaxInfoID(Integer companyTaxInfoID) {
        this.companyTaxInfoID = companyTaxInfoID;
    }

    public Boolean getHasWarning() {
        return hasWarning;
    }

    public void setHasWarning(Boolean hasWarning) {
        this.hasWarning = hasWarning;
    }

    public Integer getSubCategoryTypeID() {
        return subCategoryTypeID;
    }

    public void setSubCategoryTypeID(Integer subCategoryTypeID) {
        this.subCategoryTypeID = subCategoryTypeID;
    }

    public List<SubCategoryTypeData> getSubCategoryTypeList() {
        return subCategoryTypeList;
    }

    public void setSubCategoryTypeList(List<SubCategoryTypeData> subCategoryTypeList) {
        this.subCategoryTypeList = subCategoryTypeList;
    }

    public Integer getDependentFieldID() {
        return dependentFieldID;
    }

    public void setDependentFieldID(Integer dependentFieldID) {
        this.dependentFieldID = dependentFieldID;
    }

    public String getFieldValueStr() {
        return fieldValueStr;
    }

    public void setFieldValueStr(String fieldValueStr) {
        this.fieldValueStr = fieldValueStr;
    }
}
