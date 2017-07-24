package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;

import java.util.List;

/**
 * Created by raj on 4/7/2016.
 */
public class ClaimBulkData extends BaseData {

    private Integer claimBulkID;
    private Integer companyID;
    private Integer claimantID;
    private String shortName;
    private String longDesc;
    private String status;
    private String nonApprovalReason;
    private Boolean isApproved;

    private String  claimantName;
    private String claimantStaffCode;

    private Integer claimType;
    private List<ClaimFromData> claimFormList;


    public Integer getClaimBulkID() {
        return claimBulkID;
    }

    public void setClaimBulkID(Integer claimBulkID) {
        this.claimBulkID = claimBulkID;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public Integer getClaimantID() {
        return claimantID;
    }

    public void setClaimantID(Integer claimantID) {
        this.claimantID = claimantID;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getClaimType() {
        return claimType;
    }

    public void setClaimType(Integer claimType) {
        this.claimType = claimType;
    }

    public List<ClaimFromData> getClaimFormList() {
        return claimFormList;
    }

    public void setClaimFormList(List<ClaimFromData> claimFormList) {
        this.claimFormList = claimFormList;
    }

    public String getClaimantName() {
        return claimantName;
    }

    public void setClaimantName(String claimantName) {
        this.claimantName = claimantName;
    }

    public String getNonApprovalReason() {
        return nonApprovalReason;
    }

    public void setNonApprovalReason(String nonApprovalReason) {
        this.nonApprovalReason = nonApprovalReason;
    }

    public Boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public String getClaimantStaffCode() {
        return claimantStaffCode;
    }

    public void setClaimantStaffCode(String claimantStaffCode) {
        this.claimantStaffCode = claimantStaffCode;
    }
}
