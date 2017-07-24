package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.user.UserData;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by raj on 4/22/2016.
 */
public class EClaimUserProfileData extends UserData{

    private String staffCode;
    private String firstName;
    private String lastName;
    private String departmentID;
    private Integer claimBulkID;
    private Integer claimType;
    private Integer claimantID;

    private BigDecimal totalClaimAmount;
    private Timestamp submissionDate;
    private List<ClaimFromData> claimFormList;

    public String getStaffCode() {
        return staffCode;
    }

    public void setStaffCode(String staffCode) {
        this.staffCode = staffCode;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(String departmentID) {
        this.departmentID = departmentID;
    }

    public BigDecimal getTotalClaimAmount() {
        return totalClaimAmount;
    }

    public void setTotalClaimAmount(BigDecimal totalClaimAmount) {
        this.totalClaimAmount = totalClaimAmount;
    }

    public Timestamp getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Timestamp submissionDate) {
        this.submissionDate = submissionDate;
    }

    public List<ClaimFromData> getClaimFormList() {
        return claimFormList;
    }

    public void setClaimFormList(List<ClaimFromData> claimFormList) {
        this.claimFormList = claimFormList;
    }

    public Integer getClaimBulkID() {
        return claimBulkID;
    }

    public void setClaimBulkID(Integer claimBulkID) {
        this.claimBulkID = claimBulkID;
    }

    public Integer getClaimType() {
        return claimType;
    }

    public void setClaimType(Integer claimType) {
        this.claimType = claimType;
    }

    public Integer getClaimantID() {
        return claimantID;
    }

    public void setClaimantID(Integer claimantID) {
        this.claimantID = claimantID;
    }
}
