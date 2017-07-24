package com.raydar.mybatis.domain.otc;

import java.math.BigDecimal;

/**
 * Created by raj on 6/24/2016.
 */
public class CleanlinessData {

    private Integer cleanlinessID;
    private Integer reportID;
    private String month_id;
    private String display_nps;
    private String display_remark;
    private String toilet_mps;
    private String toilet_remark;
    private String walkway_nps;
    private String walkway_remark;
    private String glass_nps;
    private String glass_remark;
    private String floor_nps;
    private String floor_remark;
    private String cashier_nps;
    private String cashier_remark;
    private String store_nps;
    private String store_remark;
    private String service_nps;
    private String service_remark;
    private String cabinet_nps;
    private String cabinet_remark;
    private String boxroom_input;
    private String boxroom_remark;

    private Integer userID;
    private Integer outletID;
    private Integer numOfColumns;

    public Integer getNumOfColumns() {
        return numOfColumns;
    }

    public void setNumOfColumns(Integer numOfColumns) {
        this.numOfColumns = numOfColumns;
    }


    private String displayString;


    private Double averageNps;
    private Double totalScore;

    public Double getTotalScore() {

        Double sum = 0.0;

        sum = sum + (this.getDisplay_nps() == null || this.getDisplay_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getDisplay_nps()));
        sum = sum + (this.getToilet_mps() == null || this.getToilet_mps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getToilet_mps()));
        sum = sum + (this.getWalkway_nps() == null || this.getWalkway_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getWalkway_nps()));
        sum = sum + (this.getGlass_nps() == null || this.getGlass_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getGlass_nps()));
        sum = sum + (this.getFloor_nps() == null || this.getFloor_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getFloor_nps()));
        sum = sum + (this.getCashier_nps() == null || this.getCashier_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getCashier_nps()));
        sum = sum + (this.getStore_nps() == null || this.getStore_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getStore_nps()));
        sum = sum + (this.getService_nps() == null || this.getService_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getService_nps()));
        sum = sum + (this.getCabinet_nps() == null || this.getCabinet_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getCabinet_nps()));
        sum = sum + (this.getBoxroom_input() == null || this.getBoxroom_input().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getBoxroom_input()));

        return sum;
    }

    public void setTotalScore(Double totalScore) {
        this.totalScore = totalScore;
    }

    public Double getAverageNps() {

        if(averageNps != null){
            return averageNps;
        }else if(this.getTotalScore() != null || this.getTotalScore() > 0){
            return this.getTotalScore() / 10;
        }else {
            return 0.0;
        }
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

    public void setOutletID(Integer outletID) {
        this.outletID = outletID;
    }

    public void setAverageNps(Double averageNps) {
        this.averageNps = averageNps;
    }

    public Integer getCleanlinessID() {
        return cleanlinessID;
    }

    public void setCleanlinessID(Integer cleanlinessID) {
        this.cleanlinessID = cleanlinessID;
    }

    public Integer getReportID() {
        return reportID;
    }

    public void setReportID(Integer reportID) {
        this.reportID = reportID;
    }

    public String getMonth_id() {
        return month_id;
    }

    public void setMonth_id(String month_id) {
        this.month_id = month_id;
    }

    public String getDisplay_nps() {
        return display_nps;
    }

    public void setDisplay_nps(String display_nps) {
        this.display_nps = display_nps;
    }

    public String getDisplay_remark() {
        return display_remark;
    }

    public void setDisplay_remark(String display_remark) {
        this.display_remark = display_remark;
    }

    public String getToilet_mps() {
        return toilet_mps;
    }

    public void setToilet_mps(String toilet_mps) {
        this.toilet_mps = toilet_mps;
    }

    public String getToilet_remark() {
        return toilet_remark;
    }

    public void setToilet_remark(String toilet_remark) {
        this.toilet_remark = toilet_remark;
    }

    public String getWalkway_nps() {
        return walkway_nps;
    }

    public void setWalkway_nps(String walkway_nps) {
        this.walkway_nps = walkway_nps;
    }

    public String getWalkway_remark() {
        return walkway_remark;
    }

    public void setWalkway_remark(String walkway_remark) {
        this.walkway_remark = walkway_remark;
    }

    public String getGlass_nps() {
        return glass_nps;
    }

    public void setGlass_nps(String glass_nps) {
        this.glass_nps = glass_nps;
    }

    public String getGlass_remark() {
        return glass_remark;
    }

    public void setGlass_remark(String glass_remark) {
        this.glass_remark = glass_remark;
    }

    public String getFloor_nps() {
        return floor_nps;
    }

    public void setFloor_nps(String floor_nps) {
        this.floor_nps = floor_nps;
    }

    public String getFloor_remark() {
        return floor_remark;
    }

    public void setFloor_remark(String floor_remark) {
        this.floor_remark = floor_remark;
    }

    public String getCashier_nps() {
        return cashier_nps;
    }

    public void setCashier_nps(String cashier_nps) {
        this.cashier_nps = cashier_nps;
    }

    public String getCashier_remark() {
        return cashier_remark;
    }

    public void setCashier_remark(String cashier_remark) {
        this.cashier_remark = cashier_remark;
    }

    public String getStore_nps() {
        return store_nps;
    }

    public void setStore_nps(String store_nps) {
        this.store_nps = store_nps;
    }

    public String getStore_remark() {
        return store_remark;
    }

    public void setStore_remark(String store_remark) {
        this.store_remark = store_remark;
    }

    public String getService_nps() {
        return service_nps;
    }

    public void setService_nps(String service_nps) {
        this.service_nps = service_nps;
    }

    public String getService_remark() {
        return service_remark;
    }

    public void setService_remark(String service_remark) {
        this.service_remark = service_remark;
    }

    public String getCabinet_nps() {
        return cabinet_nps;
    }

    public void setCabinet_nps(String cabinet_nps) {
        this.cabinet_nps = cabinet_nps;
    }

    public String getCabinet_remark() {
        return cabinet_remark;
    }

    public void setCabinet_remark(String cabinet_remark) {
        this.cabinet_remark = cabinet_remark;
    }

    public String getBoxroom_input() {
        return boxroom_input;
    }

    public void setBoxroom_input(String boxroom_input) {
        this.boxroom_input = boxroom_input;
    }

    public String getBoxroom_remark() {
        return boxroom_remark;
    }

    public void setBoxroom_remark(String boxroom_remark) {
        this.boxroom_remark = boxroom_remark;
    }

    public String getDisplayString() {
        return "Cleanliness";
    }

    public void setDisplayString(String displayString) {
        this.displayString = displayString;
    }
}
