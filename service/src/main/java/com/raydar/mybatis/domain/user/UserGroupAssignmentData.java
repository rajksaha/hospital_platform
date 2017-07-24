package com.raydar.mybatis.domain.user;

import com.raydar.mybatis.domain.BaseData;

/**
 * Created by raj on 3/19/2016.
 */
public class UserGroupAssignmentData extends BaseData {

    private Integer userGroupAssignmentID;
    private Integer userID;
    private Integer userGroupID;
    private Integer status;

    public Integer getUserGroupAssignmentID() {
        return userGroupAssignmentID;
    }

    public void setUserGroupAssignmentID(Integer userGroupAssignmentID) {
        this.userGroupAssignmentID = userGroupAssignmentID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Integer getUserGroupID() {
        return userGroupID;
    }

    public void setUserGroupID(Integer userGroupID) {
        this.userGroupID = userGroupID;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
