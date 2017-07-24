package com.raydar.mybatis.domain.otc;

import java.util.List;

/**
 * Created by raj on 6/29/2016.
 */
public class OtcSearchData {

    private List<OutletData> outletList;
    private String entityStatus;
    private Integer entityID;
    private String entityName;
    private Integer entityType;
    private Integer userID;

    public List<OutletData> getOutletList() {
        return outletList;
    }

    public void setOutletList(List<OutletData> outletList) {
        this.outletList = outletList;
    }

    public String getEntityStatus() {
        return entityStatus;
    }

    public void setEntityStatus(String entityStatus) {
        this.entityStatus = entityStatus;
    }

    public Integer getEntityID() {
        return entityID;
    }

    public void setEntityID(Integer entityID) {
        this.entityID = entityID;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public Integer getEntityType() {
        return entityType;
    }

    public void setEntityType(Integer entityType) {
        this.entityType = entityType;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }
}
