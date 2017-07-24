package com.raydar.mybatis.domain.eclaim;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by raj on 12/10/2016.
 */
public class ClaimValidationData {

    private Integer uniqueNum;
    private BigDecimal amount;
    private Timestamp date;
    private BigDecimal calculatedAmount;
    private List<ClaimFromData> claimList;
    private List<Integer> lisOfClaimFormID;

    public Integer getUniqueNum() {
        return uniqueNum;
    }

    public void setUniqueNum(Integer uniqueNum) {
        this.uniqueNum = uniqueNum;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public BigDecimal getCalculatedAmount() {
        return calculatedAmount;
    }

    public void setCalculatedAmount(BigDecimal calculatedAmount) {
        this.calculatedAmount = calculatedAmount;
    }

    public List<ClaimFromData> getClaimList() {
        return claimList;
    }

    public void setClaimList(List<ClaimFromData> claimList) {
        this.claimList = claimList;
    }

    public List<Integer> getLisOfClaimFormID() {
        return lisOfClaimFormID;
    }

    public void setLisOfClaimFormID(List<Integer> lisOfClaimFormID) {
        this.lisOfClaimFormID = lisOfClaimFormID;
    }
}
