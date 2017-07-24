package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;
import com.raydar.mybatis.domain.echo.CompanyTaxInfoData;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by raj on 4/7/2016.
 */
public class ClaimFromData extends BaseData {


    private Integer claimFromID;
    private Integer claimBulkID;
    private Integer claimEventID;
    private Integer categoryID;
    private String jsonValue;
    private String status;
    private Integer originalReceived;
    private Integer originalRejected;
    private String nonApprovalReason;
    private Timestamp approvedOn;
    private Integer isException;
    private String exceptionReason;
    private Boolean isApproved;

    private List<CategoryFieldDATA> resultList;
    private String categoryName;
    private Integer requireOriginal;
    private Integer claimantID;
    private String  claimantName;
    private String claimantStaffCode;

    private String companyCode;
    private String department;
    private String location;
    private String costCenter;
    private String occupationDes;

    private Boolean isDeleted;
    private Integer claimType;

    private String invNumber;
    private Timestamp invDate;
    private Integer companyTaxInfoID;
    private CompanyTaxInfoData companyTaxInfoData;
    private Boolean showWarningReason;

    private String userProfileJsonString;
    private Timestamp actionTakenOn;
    private String actionStatus;

    private Integer claimValidationID;

    private String claimDescription;


    public String getClaimDescription() {
        return claimDescription;
    }

    public void setClaimDescription(String claimDescription) {
        this.claimDescription = claimDescription;
    }

    public Boolean getShowWarningReason() {
        return showWarningReason;
    }

    public void setShowWarningReason(Boolean showWarningReason) {
        this.showWarningReason = showWarningReason;
    }

    public Integer getClaimFromID() {
        return claimFromID;
    }

    public void setClaimFromID(Integer claimFromID) {
        this.claimFromID = claimFromID;
    }

    public Integer getClaimEventID() {
        return claimEventID;
    }

    public void setClaimEventID(Integer claimEventID) {
        this.claimEventID = claimEventID;
    }

    public Integer getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Integer categoryID) {
        this.categoryID = categoryID;
    }

    public String getJsonValue() {
        return jsonValue;
    }

    public void setJsonValue(String jsonValue) {
        this.jsonValue = jsonValue;
    }

    public List<CategoryFieldDATA> getResultList() {
        return resultList;
    }

    public void setResultList(List<CategoryFieldDATA> resultList) {
        this.resultList = resultList;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getOriginalReceived() {
        return originalReceived;
    }

    public void setOriginalReceived(Integer originalReceived) {
        this.originalReceived = originalReceived;
    }

    public Boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public String getNonApprovalReason() {
        return nonApprovalReason;
    }

    public void setNonApprovalReason(String nonApprovalReason) {
        this.nonApprovalReason = nonApprovalReason;
    }

    public Integer getClaimBulkID() {
        return claimBulkID;
    }

    public void setClaimBulkID(Integer claimBulkID) {
        this.claimBulkID = claimBulkID;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String getClaimantName() {
        return claimantName;
    }

    public void setClaimantName(String claimantName) {
        this.claimantName = claimantName;
    }

    public String getClaimantStaffCode() {
        return claimantStaffCode;
    }

    public void setClaimantStaffCode(String claimantStaffCode) {
        this.claimantStaffCode = claimantStaffCode;
    }

    public Integer getRequireOriginal() {
        return requireOriginal;
    }

    public void setRequireOriginal(Integer requireOriginal) {
        this.requireOriginal = requireOriginal;
    }

    public Integer getOriginalRejected() {
        return originalRejected;
    }

    public void setOriginalRejected(Integer originalRejected) {
        this.originalRejected = originalRejected;
    }

    public Timestamp getApprovedOn() {
        return approvedOn;
    }

    public void setApprovedOn(Timestamp approvedOn) {
        this.approvedOn = approvedOn;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCostCenter() {
        return costCenter;
    }

    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
    }

    public Integer getClaimantID() {
        return claimantID;
    }

    public void setClaimantID(Integer claimantID) {
        this.claimantID = claimantID;
    }

    public Integer getClaimType() {
        return claimType;
    }

    public void setClaimType(Integer claimType) {
        this.claimType = claimType;
    }

    public String getInvNumber() {
        return invNumber;
    }

    public void setInvNumber(String invNumber) {
        this.invNumber = invNumber;
    }

    public Timestamp getInvDate() {
        return invDate;
    }

    public void setInvDate(Timestamp invDate) {
        this.invDate = invDate;
    }

    public Integer getCompanyTaxInfoID() {
        return companyTaxInfoID;
    }

    public void setCompanyTaxInfoID(Integer companyTaxInfoID) {
        this.companyTaxInfoID = companyTaxInfoID;
    }

    public CompanyTaxInfoData getCompanyTaxInfoData() {
        return companyTaxInfoData;
    }

    public void setCompanyTaxInfoData(CompanyTaxInfoData companyTaxInfoData) {
        this.companyTaxInfoData = companyTaxInfoData;
    }

    public Integer getIsException() {
        return isException;
    }

    public void setIsException(Integer isException) {
        this.isException = isException;
    }

    public String getExceptionReason() {
        return exceptionReason;
    }

    public void setExceptionReason(String exceptionReason) {
        this.exceptionReason = exceptionReason;
    }

    public String getUserProfileJsonString() {
        return userProfileJsonString;
    }

    public void setUserProfileJsonString(String userProfileJsonString) {
        this.userProfileJsonString = userProfileJsonString;
    }

    public Timestamp getActionTakenOn() {
        return actionTakenOn;
    }

    public void setActionTakenOn(Timestamp actionTakenOn) {
        this.actionTakenOn = actionTakenOn;
    }

    public String getActionStatus() {
        return actionStatus;
    }

    public void setActionStatus(String actionStatus) {
        this.actionStatus = actionStatus;
    }

    public Integer getClaimValidationID() {
        return claimValidationID;
    }

    public void setClaimValidationID(Integer claimValidationID) {
        this.claimValidationID = claimValidationID;
    }

    public String getOccupationDes() {
        return occupationDes;
    }

    public void setOccupationDes(String occupationDes) {
        this.occupationDes = occupationDes;
    }
}
