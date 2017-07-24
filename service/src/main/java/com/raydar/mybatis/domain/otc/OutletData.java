package com.raydar.mybatis.domain.otc;

import org.apache.commons.collections.CollectionUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * Created by raj on 6/27/2016.
 */
public class OutletData {

    private Integer outletID;
    private String outletCode;
    private String outletName;
    private Integer regionID;
    private Integer reportRunningNumber;
    private Integer status;
    private String otcUserDesignation;
    private Integer userOutletID;

    private Integer avgVisitByAM;
    private Integer avgVisitByRME;

    private BigDecimal npsScoreByAM;
    private BigDecimal npsScoreByRme;

    private List<OtcReportData> otcReportList;
    private List<WeaknessData> weaknessList;

    private BigDecimal previous2MonthScore;
    private BigDecimal previousMonthScore;
    private BigDecimal currentMonthScore;



    public BigDecimal getAmNpsScoreAvg() {
        BigDecimal sum = BigDecimal.ZERO;
        Integer numOfItems = 0;
        if(CollectionUtils.isNotEmpty(otcReportList)){
            for(OtcReportData report : otcReportList){
                if(report.getUserType().equals("AM") && report.getNpsScore() != null){
                    sum = sum.add(report.getNpsScore());
                    numOfItems++;
                }
            }
            if(numOfItems > 0){
                sum = sum.setScale(2, BigDecimal.ROUND_HALF_UP).divide(BigDecimal.valueOf(numOfItems), 2, RoundingMode.HALF_UP);
            }

        }
        return sum;
    }


    public BigDecimal getRmeNpsScoreAvg() {
        BigDecimal sum = BigDecimal.ZERO;
        Integer numOfItems = 0;
        if(CollectionUtils.isNotEmpty(otcReportList)){
            for(OtcReportData report : otcReportList){
                if(report.getUserType().equals("RME") && report.getNpsScore() != null){
                    sum = sum.setScale(2, BigDecimal.ROUND_HALF_UP).add(report.getNpsScore());
                    numOfItems++;
                }
            }
            if(numOfItems > 0){
                sum = sum.divide(BigDecimal.valueOf(numOfItems),2, RoundingMode.HALF_UP);
            }
        }
        return sum;
    }

    public BigDecimal getAmInputAvg(){
        BigDecimal  sum = BigDecimal.ZERO;
        Integer numOfItems = 0;
        if(CollectionUtils.isNotEmpty(otcReportList)){
            for(OtcReportData report : otcReportList){
                if(report.getUserType().equals("AM")){
                    sum = sum.add(report.getCompletenessAvg());
                    numOfItems++;
                }
            }
            if(numOfItems > 0){
                sum = sum.divide(BigDecimal.valueOf(numOfItems),2, RoundingMode.HALF_UP);
            }
        }
        return sum;
    }

    public BigDecimal getRmeInputAvg(){
        BigDecimal sum = BigDecimal.ZERO;
        Integer numOfItems = 0;
        if(CollectionUtils.isNotEmpty(otcReportList)){
            for(OtcReportData report : otcReportList){
                if(report.getUserType().equals("RME")){
                    sum = sum.add(report.getCompletenessAvg());
                    numOfItems++;

                }
            }
            if(numOfItems > 0){
                sum = sum.divide(BigDecimal.valueOf(numOfItems),2, RoundingMode.HALF_UP);
            }
        }
        return sum;
    }


    public Integer getOutletID() {
        return outletID;
    }

    public void setOutletID(Integer outletID) {
        this.outletID = outletID;
    }

    public String getOutletCode() {
        return outletCode;
    }

    public void setOutletCode(String outletCode) {
        this.outletCode = outletCode;
    }

    public String getOutletName() {
        return outletName;
    }

    public void setOutletName(String outletName) {
        this.outletName = outletName;
    }

    public Integer getRegionID() {
        return regionID;
    }

    public void setRegionID(Integer regionID) {
        this.regionID = regionID;
    }

    public Integer getReportRunningNumber() {
        return reportRunningNumber;
    }

    public void setReportRunningNumber(Integer reportRunningNumber) {
        this.reportRunningNumber = reportRunningNumber;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<OtcReportData> getOtcReportList() {
        return otcReportList;
    }

    public void setOtcReportList(List<OtcReportData> otcReportList) {
        this.otcReportList = otcReportList;
    }

    public String getOtcUserDesignation() {
        return otcUserDesignation;
    }

    public void setOtcUserDesignation(String otcUserDesignation) {
        this.otcUserDesignation = otcUserDesignation;
    }

    public Integer getAvgVisitByAM() {
        return avgVisitByAM;
    }

    public void setAvgVisitByAM(Integer avgVisitByAM) {
        this.avgVisitByAM = avgVisitByAM;
    }

    public Integer getAvgVisitByRME() {
        return avgVisitByRME;
    }

    public void setAvgVisitByRME(Integer avgVisitByRME) {
        this.avgVisitByRME = avgVisitByRME;
    }

    public BigDecimal getNpsScoreByAM() {
        return npsScoreByAM;
    }

    public void setNpsScoreByAM(BigDecimal npsScoreByAM) {
        this.npsScoreByAM = npsScoreByAM;
    }

    public BigDecimal getNpsScoreByRme() {
        return npsScoreByRme;
    }

    public void setNpsScoreByRme(BigDecimal npsScoreByRme) {
        this.npsScoreByRme = npsScoreByRme;
    }

    public List<WeaknessData> getWeaknessList() {
        return weaknessList;
    }

    public void setWeaknessList(List<WeaknessData> weaknessList) {
        this.weaknessList = weaknessList;
    }

    public BigDecimal getPrevious2MonthScore() {
        return previous2MonthScore;
    }

    public void setPrevious2MonthScore(BigDecimal previous2MonthScore) {
        this.previous2MonthScore = previous2MonthScore;
    }

    public BigDecimal getPreviousMonthScore() {
        return previousMonthScore;
    }

    public void setPreviousMonthScore(BigDecimal previousMonthScore) {
        this.previousMonthScore = previousMonthScore;
    }

    public BigDecimal getCurrentMonthScore() {
        return currentMonthScore;
    }

    public void setCurrentMonthScore(BigDecimal currentMonthScore) {
        this.currentMonthScore = currentMonthScore;
    }

    public Integer getUserOutletID() {
        return userOutletID;
    }

    public void setUserOutletID(Integer userOutletID) {
        this.userOutletID = userOutletID;
    }
}
