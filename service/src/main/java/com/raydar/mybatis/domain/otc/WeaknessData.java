package com.raydar.mybatis.domain.otc;

/**
 * Created by raj on 6/24/2016.
 */
public class WeaknessData {

    private Integer weaknessID;
    private Integer reportID;
    private String criticalArea;
    private String description;
    private String weakness;
    private String actionPlan;

    private Integer userID;
    private Integer outletID;
    private Integer numOfColumns;

    public Integer getNumOfColumns() {
        return numOfColumns;
    }

    public void setNumOfColumns(Integer numOfColumns) {
        this.numOfColumns = numOfColumns;
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

    public Integer getWeaknessID() {
        return weaknessID;
    }

    public void setWeaknessID(Integer weaknessID) {
        this.weaknessID = weaknessID;
    }

    public Integer getReportID() {
        return reportID;
    }

    public void setReportID(Integer reportID) {
        this.reportID = reportID;
    }

    public String getCriticalArea() {
        return criticalArea;
    }

    public void setCriticalArea(String criticalArea) {
        this.criticalArea = criticalArea;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWeakness() {
        return weakness;
    }

    public void setWeakness(String weakness) {
        this.weakness = weakness;
    }

    public String getActionPlan() {
        return actionPlan;
    }

    public void setActionPlan(String actionPlan) {
        this.actionPlan = actionPlan;
    }
}
