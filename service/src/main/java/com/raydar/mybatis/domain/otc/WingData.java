package com.raydar.mybatis.domain.otc;

/**
 * Created by raj on 9/14/2016.
 */
public class WingData {

    private Integer wingID;
    private String wingCode;
    private String wingName;
    private String longDesc;
    private Integer status;

    public Integer getWingID() {
        return wingID;
    }

    public void setWingID(Integer wingID) {
        this.wingID = wingID;
    }

    public String getWingCode() {
        return wingCode;
    }

    public void setWingCode(String wingCode) {
        this.wingCode = wingCode;
    }

    public String getWingName() {
        return wingName;
    }

    public void setWingName(String wingName) {
        this.wingName = wingName;
    }

    public String getLongDesc() {
        return longDesc;
    }

    public void setLongDesc(String longDesc) {
        this.longDesc = longDesc;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
