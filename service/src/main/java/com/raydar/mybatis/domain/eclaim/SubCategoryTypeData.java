package com.raydar.mybatis.domain.eclaim;

import com.raydar.mybatis.domain.BaseData;

import java.util.List;

/**
 * Created by raj on 11/8/2016.
 */
public class SubCategoryTypeData extends BaseData{

    private Integer subCategoryTypeID;
    private Integer categoryID;
    private String shortName;
    private Integer status;

    private List<SubCategoryDATA> subCategoryList;

    public Integer getSubCategoryTypeID() {
        return subCategoryTypeID;
    }

    public void setSubCategoryTypeID(Integer subCategoryTypeID) {
        this.subCategoryTypeID = subCategoryTypeID;
    }

    public Integer getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Integer categoryID) {
        this.categoryID = categoryID;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<SubCategoryDATA> getSubCategoryList() {
        return subCategoryList;
    }

    public void setSubCategoryList(List<SubCategoryDATA> subCategoryList) {
        this.subCategoryList = subCategoryList;
    }
}
