package com.raydar.mybatis.domain.eclaim;

import java.util.List;

/**
 * Created by raj on 4/2/2016.
 */
public class SubCategoryDATA {

    private Integer subCategoryID;
    private Integer categoryID;
    private Integer subCategoryTypeID;
    private String shortName;

    public Integer getSubCategoryID() {
        return subCategoryID;
    }

    public void setSubCategoryID(Integer subCategoryID) {
        this.subCategoryID = subCategoryID;
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

    public Integer getSubCategoryTypeID() {
        return subCategoryTypeID;
    }

    public void setSubCategoryTypeID(Integer subCategoryTypeID) {
        this.subCategoryTypeID = subCategoryTypeID;
    }
}
