package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;

/**
 * Created by raj on 5/7/2016.
 */
public class CompanyApprovalData extends BaseData {

    private Integer companyApprovalID;
    private Integer companyID;
    private Integer claimType;
    private String approvalState;
    private String approvalStateCode;
    private String approvalStatus;
    private String rejectStatus;
    private String actionStateCode;
    private String defaultView;
    private Integer approvalUserType;
    private Integer sortOrder;
    private String permissionCode;

    public Integer getCompanyApprovalID() {
        return companyApprovalID;
    }

    public void setCompanyApprovalID(Integer companyApprovalID) {
        this.companyApprovalID = companyApprovalID;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public String getApprovalState() {
        return approvalState;
    }

    public void setApprovalState(String approvalState) {
        this.approvalState = approvalState;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public String getRejectStatus() {
        return rejectStatus;
    }

    public void setRejectStatus(String rejectStatus) {
        this.rejectStatus = rejectStatus;
    }

    public String getActionStateCode() {
        return actionStateCode;
    }

    public void setActionStateCode(String actionStateCode) {
        this.actionStateCode = actionStateCode;
    }

    public Integer getClaimType() {
        return claimType;
    }

    public void setClaimType(Integer claimType) {
        this.claimType = claimType;
    }

    public String getApprovalStateCode() {
        return approvalStateCode;
    }

    public void setApprovalStateCode(String approvalStateCode) {
        this.approvalStateCode = approvalStateCode;
    }

    public String getDefaultView() {
        return defaultView;
    }

    public void setDefaultView(String defaultView) {
        this.defaultView = defaultView;
    }

    public Integer getApprovalUserType() {
        return approvalUserType;
    }

    public void setApprovalUserType(Integer approvalUserType) {
        this.approvalUserType = approvalUserType;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getPermissionCode() {
        return permissionCode;
    }

    public void setPermissionCode(String permissionCode) {
        this.permissionCode = permissionCode;
    }
}
