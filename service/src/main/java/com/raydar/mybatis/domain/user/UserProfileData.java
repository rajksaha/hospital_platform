package com.raydar.mybatis.domain.user;

import com.raydar.mybatis.domain.BaseData;
import org.apache.commons.lang.WordUtils;

import java.math.BigDecimal;
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
    private String jsonString;
    private Integer status;
    private String otcUserDesignation;
    private Integer otcNumOfVisit;
    private BigDecimal otcNpsScore;
    private BigDecimal otcNpsScore1;
    private BigDecimal otcNpsScore2;
    private Integer companyID;
    private Timestamp lastWorkingDay;

    private List<CompanyLevelData> companyLevelList;
    private List<UserGroupAssignmentData> groupAssignmentList;
    private List<UserGroupData> userGroupList;

    public Integer getUserProfileID() {
        return userProfileID;
    }

    public void setUserProfileID(Integer userProfileID) {
        this.userProfileID = userProfileID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getFirstName() {
        return firstName !=null ? WordUtils.capitalizeFully(firstName) : null;
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

    public String getJsonString() {
        return jsonString;
    }

    public void setJsonString(String jsonString) {
        this.jsonString = jsonString;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public List<UserGroupData> getUserGroupList() {
        return userGroupList;
    }

    public void setUserGroupList(List<UserGroupData> userGroupList) {
        this.userGroupList = userGroupList;
    }

    public String getOtcUserDesignation() {
        return otcUserDesignation;
    }

    public void setOtcUserDesignation(String otcUserDesignation) {
        this.otcUserDesignation = otcUserDesignation;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public Integer getOtcNumOfVisit() {
        return otcNumOfVisit;
    }

    public void setOtcNumOfVisit(Integer otcNumOfVisit) {
        this.otcNumOfVisit = otcNumOfVisit;
    }

    public BigDecimal getOtcNpsScore() {
        return otcNpsScore;
    }

    public void setOtcNpsScore(BigDecimal otcNpsScore) {
        this.otcNpsScore = otcNpsScore;
    }

    public BigDecimal getOtcNpsScore1() {
        return otcNpsScore1;
    }

    public void setOtcNpsScore1(BigDecimal otcNpsScore1) {
        this.otcNpsScore1 = otcNpsScore1;
    }

    public BigDecimal getOtcNpsScore2() {
        return otcNpsScore2;
    }

    public void setOtcNpsScore2(BigDecimal otcNpsScore2) {
        this.otcNpsScore2 = otcNpsScore2;
    }

    public Timestamp getLastWorkingDay() {
        return lastWorkingDay;
    }

    public void setLastWorkingDay(Timestamp lastWorkingDay) {
        this.lastWorkingDay = lastWorkingDay;
    }
}
