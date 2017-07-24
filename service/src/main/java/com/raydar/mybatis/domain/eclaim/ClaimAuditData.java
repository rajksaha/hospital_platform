package com.raydar.mybatis.domain.eclaim;

import com.google.gson.annotations.Expose;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by raj on 3/27/2017.
 */
public class ClaimAuditData extends ClaimApprovalAuditData{


    private String employeeCode;
    private String firstName;
    private Integer claimFormID;
    private Integer claimBulkID;
    private Timestamp claimCreatedOn;
    private Timestamp claimUpdatedOn;
    private String approverEmployeeCode;



    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Timestamp getClaimCreatedOn() {
        return claimCreatedOn;
    }

    public void setClaimCreatedOn(Timestamp claimCreatedOn) {
        this.claimCreatedOn = claimCreatedOn;
    }

    public Timestamp getClaimUpdatedOn() {
        return claimUpdatedOn;
    }

    public void setClaimUpdatedOn(Timestamp claimUpdatedOn) {
        this.claimUpdatedOn = claimUpdatedOn;
    }

    public String getApproverEmployeeCode() {
        return approverEmployeeCode;
    }

    public void setApproverEmployeeCode(String approverEmployeeCode) {
        this.approverEmployeeCode = approverEmployeeCode;
    }

    public Integer getClaimFormID() {
        return claimFormID;
    }

    public void setClaimFormID(Integer claimFormID) {
        this.claimFormID = claimFormID;
    }

    public Integer getClaimBulkID() {
        return claimBulkID;
    }

    public void setClaimBulkID(Integer claimBulkID) {
        this.claimBulkID = claimBulkID;
    }
}
