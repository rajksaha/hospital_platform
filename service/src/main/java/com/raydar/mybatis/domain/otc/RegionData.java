package com.raydar.mybatis.domain.otc;

import org.apache.commons.collections.CollectionUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * Created by raj on 6/27/2016.
 */
public class RegionData {

    private Integer regionID;
    private Integer wingID;
    private String wingCode;
    private String shortName;
    private Integer status;

    private List<OutletData> outletList;
    private Integer numberOfVisit;
    private String staffCode;


    public BigDecimal getAmNpsScoreAvg() {
        BigDecimal sum = BigDecimal.ZERO;
        if(CollectionUtils.isNotEmpty(outletList)){
            for(OutletData outlet : outletList){
                if(outlet.getAmNpsScoreAvg() != null){
                    sum = sum.add(outlet.getAmNpsScoreAvg());
                }
            }
            sum = sum.setScale(2, BigDecimal.ROUND_HALF_UP).divide(BigDecimal.valueOf(outletList.size()),2, RoundingMode.HALF_UP);
        }
        return sum;
    }

    public BigDecimal getRmeNpsScoreAvg() {

        BigDecimal sum = BigDecimal.ZERO;
        if(CollectionUtils.isNotEmpty(outletList)){
            for(OutletData outlet : outletList){
                if(outlet.getAmNpsScoreAvg() != null) {
                    sum = sum.add(outlet.getRmeNpsScoreAvg());
                }
            }
            sum = sum.setScale(2, BigDecimal.ROUND_HALF_UP).divide(BigDecimal.valueOf(outletList.size()),2, RoundingMode.HALF_UP);
        }
        return sum;
    }




    public BigDecimal getAMInputAvg(){
        BigDecimal sum = BigDecimal.ZERO;
        if(CollectionUtils.isNotEmpty(outletList)){
            for(OutletData outLet : outletList){
                if(outLet.getAmNpsScoreAvg() != null) {
                    sum = sum.add(outLet.getAmInputAvg());
                }
            }
            sum = sum.divide(BigDecimal.valueOf(outletList.size()),2, RoundingMode.HALF_UP);
        }
        return sum;
    }

    public BigDecimal getRMEInputAvg(){
        BigDecimal sum = BigDecimal.ZERO;
        if(CollectionUtils.isNotEmpty(outletList)){
            for(OutletData outLet : outletList){
                if(outLet.getAmNpsScoreAvg() != null) {
                    sum = sum.add(outLet.getRmeInputAvg());
                }
            }
            sum = sum.divide(BigDecimal.valueOf(outletList.size()),2, RoundingMode.HALF_UP);
        }
        return sum;
    }


    public Integer getRegionID() {
        return regionID;
    }

    public void setRegionID(Integer regionID) {
        this.regionID = regionID;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<OutletData> getOutletList() {
        return outletList;
    }

    public void setOutletList(List<OutletData> outletList) {
        this.outletList = outletList;
    }

    public Integer getNumberOfVisit() {
        return numberOfVisit;
    }

    public void setNumberOfVisit(Integer numberOfVisit) {
        this.numberOfVisit = numberOfVisit;
    }

    public Integer getWingID() {
        return wingID;
    }

    public void setWingID(Integer wingID) {
        this.wingID = wingID;
    }

    public String getStaffCode() {
        return staffCode;
    }

    public void setStaffCode(String staffCode) {
        this.staffCode = staffCode;
    }

    public String getWingCode() {
        return wingCode;
    }

    public void setWingCode(String wingCode) {
        this.wingCode = wingCode;
    }
}
