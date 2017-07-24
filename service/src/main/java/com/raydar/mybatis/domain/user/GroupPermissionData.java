package com.raydar.mybatis.domain.user;

/**
 * Created by raj on 3/19/2016.
 */
public class GroupPermissionData extends PermissionData {

    private Integer groupPermissionID;
    private Integer userGroupID;
    private Integer permissionID;
    private Integer statusValue;


    public Integer getGroupPermissionID() {
        return groupPermissionID;
    }

    public void setGroupPermissionID(Integer groupPermissionID) {
        this.groupPermissionID = groupPermissionID;
    }

    public Integer getStatusValue() {
        return statusValue;
    }

    public void setStatusValue(Integer statusValue) {
        this.statusValue = statusValue;
    }

    public Integer getUserGroupID() {
        return userGroupID;
    }

    public void setUserGroupID(Integer userGroupID) {
        this.userGroupID = userGroupID;
    }

    public Integer getPermissionID() {
        return permissionID;
    }

    public void setPermissionID(Integer permissionID) {
        this.permissionID = permissionID;
    }
}
