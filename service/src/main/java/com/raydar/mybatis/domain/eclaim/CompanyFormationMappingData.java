package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;
import com.raydar.mybatis.domain.user.ContentDetailData;

import java.util.List;

/**
 * Created by raj on 3/28/2017.
 */
public class CompanyFormationMappingData extends BaseData{

    private Integer formationMappingID;
    private Integer itemID;
    private Integer itemParentID;


    private String itemName;

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getFormationMappingID() {
        return formationMappingID;
    }

    public void setFormationMappingID(Integer formationMappingID) {
        this.formationMappingID = formationMappingID;
    }

    public Integer getItemID() {
        return itemID;
    }

    public void setItemID(Integer itemID) {
        this.itemID = itemID;
    }

    public Integer getItemParentID() {
        return itemParentID;
    }

    public void setItemParentID(Integer itemParentID) {
        this.itemParentID = itemParentID;
    }

}
