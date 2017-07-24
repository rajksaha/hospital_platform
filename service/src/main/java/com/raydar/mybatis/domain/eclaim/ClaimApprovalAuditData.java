package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;

/**
 * Created by raj on 4/20/2016.
 */
public class  ClaimApprovalAuditData extends BaseData {

    private Integer claimApprovalAuditID;
    private Integer claimFromID;
    private String actionType;
    private String actionState;
    private String actionMsg;

    public Integer getClaimApprovalAuditID() {
        return claimApprovalAuditID;
    }

    public void setClaimApprovalAuditID(Integer claimApprovalAuditID) {
        this.claimApprovalAuditID = claimApprovalAuditID;
    }

    public Integer getClaimFromID() {
        return claimFromID;
    }

    public void setClaimFromID(Integer claimFromID) {
        this.claimFromID = claimFromID;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getActionMsg() {
        return actionMsg;
    }

    public void setActionMsg(String actionMsg) {
        this.actionMsg = actionMsg;
    }

    public String getActionState() {
        return actionState;
    }

    public void setActionState(String actionState) {
        this.actionState = actionState;
    }
}
