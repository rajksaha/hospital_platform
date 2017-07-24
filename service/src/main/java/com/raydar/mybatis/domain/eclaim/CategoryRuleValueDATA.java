package com.raydar.mybatis.domain.eclaim;

import java.math.BigDecimal;

/**
 * Created by raj on 4/2/2016.
 */
public class CategoryRuleValueDATA {

    private Integer categoryRuleID;
    private Integer categoryRuleValueID;
    private BigDecimal limit1;
    private BigDecimal limit2;
    private BigDecimal limit3;
    private BigDecimal limit4;

    public Integer getCategoryRuleID() {
        return categoryRuleID;
    }

    public void setCategoryRuleID(Integer categoryRuleID) {
        this.categoryRuleID = categoryRuleID;
    }

    public Integer getCategoryRuleValueID() {
        return categoryRuleValueID;
    }

    public void setCategoryRuleValueID(Integer categoryRuleValueID) {
        this.categoryRuleValueID = categoryRuleValueID;
    }

    public BigDecimal getLimit1() {
        return limit1;
    }

    public void setLimit1(BigDecimal limit1) {
        this.limit1 = limit1;
    }

    public BigDecimal getLimit2() {
        return limit2;
    }

    public void setLimit2(BigDecimal limit2) {
        this.limit2 = limit2;
    }

    public BigDecimal getLimit3() {
        return limit3;
    }

    public void setLimit3(BigDecimal limit3) {
        this.limit3 = limit3;
    }

    public BigDecimal getLimit4() {
        return limit4;
    }

    public void setLimit4(BigDecimal limit4) {
        this.limit4 = limit4;
    }
}
