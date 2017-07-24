package com.raydar.mybatis.domain.eclaim;

/**
 * Created by raj on 11/2/2016.
 */
public class ClaimNotificationData {

    private String senderFirstName;
    private String senderStaffCode;
    private String receiverFirstName;
    private String receiverStaffCode;

    private String senderEmail;
    private String receiverEmail;

    private String claimDeadLine;
    private String claimRefKey;


    private String status;
    private String reason;

    private Integer cutOffDay;

    private String approvalState;

    public String getSenderFirstName() {
        return senderFirstName;
    }

    public void setSenderFirstName(String senderFirstName) {
        this.senderFirstName = senderFirstName;
    }

    public String getSenderStaffCode() {
        return senderStaffCode;
    }

    public void setSenderStaffCode(String senderStaffCode) {
        this.senderStaffCode = senderStaffCode;
    }

    public String getReceiverFirstName() {
        return receiverFirstName;
    }

    public void setReceiverFirstName(String receiverFirstName) {
        this.receiverFirstName = receiverFirstName;
    }

    public String getReceiverStaffCode() {
        return receiverStaffCode;
    }

    public void setReceiverStaffCode(String receiverStaffCode) {
        this.receiverStaffCode = receiverStaffCode;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getReceiverEmail() {
        return receiverEmail;
    }

    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }

    public String getClaimDeadLine() {
        return claimDeadLine;
    }

    public void setClaimDeadLine(String claimDeadLine) {
        this.claimDeadLine = claimDeadLine;
    }

    public String getClaimRefKey() {
        return claimRefKey;
    }

    public void setClaimRefKey(String claimRefKey) {
        this.claimRefKey = claimRefKey;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Integer getCutOffDay() {
        return cutOffDay;
    }

    public void setCutOffDay(Integer cutOffDay) {
        this.cutOffDay = cutOffDay;
    }

    public String getApprovalState() {
        return approvalState;
    }

    public void setApprovalState(String approvalState) {
        this.approvalState = approvalState;
    }
}
