package com.raydar.mybatis.domain;

import com.raydar.mybatis.domain.echo.CompanyTaxInfoData;
import com.raydar.mybatis.domain.eclaim.CategoryDATA;
import com.raydar.mybatis.domain.eclaim.ClaimBulkData;
import com.raydar.mybatis.domain.eclaim.ClaimFromData;
import com.raydar.mybatis.domain.eclaim.CompanyFormationMappingData;
import com.raydar.mybatis.domain.otc.EvolutionData;
import com.raydar.mybatis.domain.otc.OutletData;
import com.raydar.mybatis.domain.otc.WeaknessData;
import com.raydar.mybatis.domain.user.ContentDetailData;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by raj on 4/7/2016.
 */
public class SearchData {

    private Integer subCategoryID;
    private Integer categoryFieldID;
    private Integer userType;
    private Integer validationType;
    private Integer limit;
    private Integer categoryID;


    private Timestamp startDate;
    private Timestamp endDate;
    private String startDateStr;
    private String endDateStr;
    private Integer dateFieldID;
    private Integer amountFieldID;
    private BigDecimal enteredAmount;
    private BigDecimal maxAmount;

    private Boolean status;
    private Integer intStatus;
    private BigDecimal amount;
    private BigDecimal subTotal;

    private String approvedStatus;
    private String nonApprovedStatus;

    private List<CategoryDATA> categoryList;
    private List<ClaimBulkData> claimBulkDataList;
    private List<ClaimFromData> claimFormDataList;

    private String entityStatus;
    private Integer entityID;
    private String entityName;
    private Integer entityType;
    private Integer userID;
    private String userName;
    private String userFirstName;
    private String staffCode;

    private List<OutletData> outletList;

    private String companyCode;
    private String locationCode;
    private String departmentCode;
    private String costCenterCode;

    private CompanyTaxInfoData companyTaxInfoData;

    private List<WeaknessData> weaknessDataList;

    private List<EvolutionData> evolutionDataList;

    private Integer claimType;

    private Boolean warningChecked;

    private String appVersion;

    private Integer reportID;

    private Integer outletID;

    private List<CompanyFormationMappingData> formationMappingList;

    private List<ContentDetailData> contentList;

    public List<ContentDetailData> getContentList() {
        return contentList;
    }

    public void setContentList(List<ContentDetailData> contentList) {
        this.contentList = contentList;
    }

    public List<CompanyFormationMappingData> getFormationMappingList() {
        return formationMappingList;
    }

    public void setFormationMappingList(List<CompanyFormationMappingData> formationMappingList) {
        this.formationMappingList = formationMappingList;
    }

    public Integer getReportID() {
        return reportID;
    }

    public void setReportID(Integer reportID) {
        this.reportID = reportID;
    }

    public Integer getOutletID() {
        return outletID;
    }

    public void setOutletID(Integer outletID) {
        this.outletID = outletID;
    }

    public String getAppVersion() {
        return appVersion;
    }

    public void setAppVersion(String appVersion) {
        this.appVersion = appVersion;
    }

    public List<EvolutionData> getEvolutionDataList() {
        return evolutionDataList;
    }

    public void setEvolutionDataList(List<EvolutionData> evolutionDataList) {
        this.evolutionDataList = evolutionDataList;
    }

    public List<WeaknessData> getWeaknessDataList() {
        return weaknessDataList;
    }

    public void setWeaknessDataList(List<WeaknessData> weaknessDataList) {
        this.weaknessDataList = weaknessDataList;
    }

    public Integer getSubCategoryID() {
        return subCategoryID;
    }

    public void setSubCategoryID(Integer subCategoryID) {
        this.subCategoryID = subCategoryID;
    }

    public Integer getCategoryFieldID() {
        return categoryFieldID;
    }

    public void setCategoryFieldID(Integer categoryFieldID) {
        this.categoryFieldID = categoryFieldID;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public Integer getValidationType() {
        return validationType;
    }

    public void setValidationType(Integer validationType) {
        this.validationType = validationType;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public Integer getDateFieldID() {
        return dateFieldID;
    }

    public void setDateFieldID(Integer dateFieldID) {
        this.dateFieldID = dateFieldID;
    }

    public Integer getAmountFieldID() {
        return amountFieldID;
    }

    public void setAmountFieldID(Integer amountFieldID) {
        this.amountFieldID = amountFieldID;
    }

    public BigDecimal getEnteredAmount() {
        return enteredAmount;
    }

    public void setEnteredAmount(BigDecimal enteredAmount) {
        this.enteredAmount = enteredAmount;
    }

    public BigDecimal getMaxAmount() {
        return maxAmount;
    }

    public void setMaxAmount(BigDecimal maxAmount) {
        this.maxAmount = maxAmount;
    }

    public Integer getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Integer categoryID) {
        this.categoryID = categoryID;
    }

    public List<CategoryDATA> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<CategoryDATA> categoryList) {
        this.categoryList = categoryList;
    }

    public String getApprovedStatus() {
        return approvedStatus;
    }

    public void setApprovedStatus(String approvedStatus) {
        this.approvedStatus = approvedStatus;
    }

    public String getNonApprovedStatus() {
        return nonApprovedStatus;
    }

    public void setNonApprovedStatus(String nonApprovedStatus) {
        this.nonApprovedStatus = nonApprovedStatus;
    }

    public String getEntityStatus() {
        return entityStatus;
    }

    public void setEntityStatus(String entityStatus) {
        this.entityStatus = entityStatus;
    }

    public Integer getEntityID() {
        return entityID;
    }

    public void setEntityID(Integer entityID) {
        this.entityID = entityID;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public List<ClaimBulkData> getClaimBulkDataList() {
        return claimBulkDataList;
    }

    public void setClaimBulkDataList(List<ClaimBulkData> claimBulkDataList) {
        this.claimBulkDataList = claimBulkDataList;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getEntityType() {
        return entityType;
    }

    public void setEntityType(Integer entityType) {
        this.entityType = entityType;
    }

    public List<ClaimFromData> getClaimFormDataList() {
        return claimFormDataList;
    }

    public void setClaimFormDataList(List<ClaimFromData> claimFormDataList) {
        this.claimFormDataList = claimFormDataList;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public List<OutletData> getOutletList() {
        return outletList;
    }

    public void setOutletList(List<OutletData> outletList) {
        this.outletList = outletList;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getLocationCode() {
        return locationCode;
    }

    public void setLocationCode(String locationCode) {
        this.locationCode = locationCode;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public String getCostCenterCode() {
        return costCenterCode;
    }

    public void setCostCenterCode(String costCenterCode) {
        this.costCenterCode = costCenterCode;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }

    public CompanyTaxInfoData getCompanyTaxInfoData() {
        return companyTaxInfoData;
    }

    public void setCompanyTaxInfoData(CompanyTaxInfoData companyTaxInfoData) {
        this.companyTaxInfoData = companyTaxInfoData;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getClaimType() {
        return claimType;
    }

    public void setClaimType(Integer claimType) {
        this.claimType = claimType;
    }

    public Boolean getWarningChecked() {
        return warningChecked;
    }

    public void setWarningChecked(Boolean warningChecked) {
        this.warningChecked = warningChecked;
    }

    public Integer getIntStatus() {
        return intStatus;
    }

    public void setIntStatus(Integer intStatus) {
        this.intStatus = intStatus;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public String getEndDateStr() {
        return endDateStr;
    }

    public void setEndDateStr(String endDateStr) {
        this.endDateStr = endDateStr;
    }

    public String getStartDateStr() {
        return startDateStr;
    }

    public void setStartDateStr(String startDateStr) {
        this.startDateStr = startDateStr;
    }

    public String getStaffCode() {
        return staffCode;
    }

    public void setStaffCode(String staffCode) {
        this.staffCode = staffCode;
    }
}
