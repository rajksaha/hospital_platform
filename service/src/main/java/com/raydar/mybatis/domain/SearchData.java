package com.raydar.mybatis.domain;

import com.raydar.mybatis.domain.appointment.AppointmentInfo;
import com.raydar.mybatis.domain.echo.CompanyTaxInfoData;
import com.raydar.mybatis.domain.prescription.ComplainData;
import com.raydar.mybatis.domain.prescription.drug.DrugPrescriptionData;
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


    private String entityStatus;
    private Integer entityID;
    private String entityName;
    private Integer entityType;
    private Integer userID;
    private String userName;
    private String userFirstName;
    private String staffCode;


    private String companyCode;
    private String locationCode;
    private String departmentCode;
    private String costCenterCode;

    private CompanyTaxInfoData companyTaxInfoData;
    private List<AppointmentInfo> appointmentInfoList;


    private List<ComplainData> complainList;

    private List<DrugPrescriptionData> prescribedDrugList;

    public List<AppointmentInfo> getAppointmentInfoList() {
        return appointmentInfoList;
    }

    public void setAppointmentInfoList(List<AppointmentInfo> appointmentInfoList) {
        this.appointmentInfoList = appointmentInfoList;
    }

    public List<ComplainData> getComplainList() {
        return complainList;
    }

    public void setComplainList(List<ComplainData> complainList) {
        this.complainList = complainList;
    }

    public List<DrugPrescriptionData> getPrescribedDrugList() {
        return prescribedDrugList;
    }

    public void setPrescribedDrugList(List<DrugPrescriptionData> prescribedDrugList) {
        this.prescribedDrugList = prescribedDrugList;
    }

    private Integer claimType;

    private Boolean warningChecked;

    private String appVersion;

    private Integer reportID;

    private Integer outletID;


    private List<ContentDetailData> contentList;

    public List<ContentDetailData> getContentList() {
        return contentList;
    }

    public void setContentList(List<ContentDetailData> contentList) {
        this.contentList = contentList;
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



    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
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
