package com.raydar.mybatis.domain.user;

import com.raydar.mybatis.domain.BaseData;

import java.math.BigDecimal;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by raj on 4/28/2016.
 */
public class UserProfileData extends BaseData {


    private Integer userProfileID;
    private String userName;
    private Integer userID;
    private String firstName;
    private String lastName;
    private String employeeCode;
    private String emailAddress;
    private Integer status;
    private Integer companyID;
    private Timestamp lastWorkingDay;
    private String startTime;
    private String endTime;
    private String contactNo;
    private BigDecimal fee;
    private String weeklyOff;
    private Timestamp dateOfBirth;
    private Integer categoryID;
    private Integer userType;
    private String sex;

    private List<CompanyLevelData> companyLevelList;
    private List<UserGroupAssignmentData> groupAssignmentList;
    private List<UserGroupData> userGroupList;

    public Integer getUserProfileID() {
        return userProfileID;
    }

    public void setUserProfileID(Integer userProfileID) {
        this.userProfileID = userProfileID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public Timestamp getLastWorkingDay() {
        return lastWorkingDay;
    }

    public void setLastWorkingDay(Timestamp lastWorkingDay) {
        this.lastWorkingDay = lastWorkingDay;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public String getWeeklyOff() {
        return weeklyOff;
    }

    public void setWeeklyOff(String weeklyOff) {
        this.weeklyOff = weeklyOff;
    }

    public Timestamp getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Timestamp dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Integer categoryID) {
        this.categoryID = categoryID;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public List<CompanyLevelData> getCompanyLevelList() {
        return companyLevelList;
    }

    public void setCompanyLevelList(List<CompanyLevelData> companyLevelList) {
        this.companyLevelList = companyLevelList;
    }

    public List<UserGroupAssignmentData> getGroupAssignmentList() {
        return groupAssignmentList;
    }

    public void setGroupAssignmentList(List<UserGroupAssignmentData> groupAssignmentList) {
        this.groupAssignmentList = groupAssignmentList;
    }

    public List<UserGroupData> getUserGroupList() {
        return userGroupList;
    }

    public void setUserGroupList(List<UserGroupData> userGroupList) {
        this.userGroupList = userGroupList;
    }
}
