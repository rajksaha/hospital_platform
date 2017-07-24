package com.raydar.mybatis.domain.otc;

/**
 * Created by raj on 7/26/2016.
 */
public class UserOutletData {

    private Integer userOutletID;
    private Integer userID;
    private Integer outletID;

    public Integer getUserOutletID() {
        return userOutletID;
    }

    public void setUserOutletID(Integer userOutletID) {
        this.userOutletID = userOutletID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Integer getOutletID() {
        return outletID;
    }

    public void setOutletID(Integer outletID) {
        this.outletID = outletID;
    }
}
