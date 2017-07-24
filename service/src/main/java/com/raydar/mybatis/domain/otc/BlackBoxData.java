package com.raydar.mybatis.domain.otc;

import java.math.BigDecimal;

/**
 * Created by raj on 1/24/2017.
 */
public class BlackBoxData {

    private String fieldName;
    private BigDecimal fieldValue;

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public BigDecimal getFieldValue() {
        return fieldValue;
    }

    public void setFieldValue(BigDecimal fieldValue) {
        this.fieldValue = fieldValue;
    }
}
