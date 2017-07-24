package com.raydar.mybatis.domain.user;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 3/20/2016.
 */
public class UserProfilePermissionData implements Serializable{


    private Integer userID;
    private String userName;
    private Integer companyID;
    private Integer status;
    private List<GroupPermissionData> groupPermissionDataList;
    private Map<String, Boolean> permissions;
    private UserProfileData profileData;

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Map<String, Boolean> getPermissions() {
        return permissions;
    }

    public void setPermissions(Map<String, Boolean> permissions) {
        this.permissions = permissions;
    }

    public List<GroupPermissionData> getGroupPermissionDataList() {
        return groupPermissionDataList;
    }

    public void setGroupPermissionDataList(List<GroupPermissionData> groupPermissionDataList) {
        this.groupPermissionDataList = groupPermissionDataList;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public UserProfileData getProfileData() {
        return profileData;
    }

    public void setProfileData(UserProfileData profileData) {
        this.profileData = profileData;
    }
}
