package com.raydar.mybatis.domain.otc;

/**
 * Created by raj on 6/24/2016.
 */
public class EvolutionData {

    private Integer evolutionID;
    private Integer reportID;
    private String management;
    private String weakness;
    private String actionPlan;
    private Integer npsScore;

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

    public Integer getEvolutionID() {
        return evolutionID;
    }

    public void setEvolutionID(Integer evolutionID) {
        this.evolutionID = evolutionID;
    }

    public Integer getReportID() {
        return reportID;
    }

    public void setReportID(Integer reportID) {
        this.reportID = reportID;
    }

    public String getManagement() {
        return management;
    }

    public void setManagement(String management) {
        this.management = management;
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

    public Integer getNpsScore() {
        return npsScore;
    }

    public void setNpsScore(Integer npsScore) {
        this.npsScore = npsScore;
    }
}