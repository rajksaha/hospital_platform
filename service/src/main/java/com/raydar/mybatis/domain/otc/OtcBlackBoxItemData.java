package com.raydar.mybatis.domain.otc;

import java.util.List;

/**
 * Created by raj on 1/24/2017.
 */
public class OtcBlackBoxItemData {


    private String monthCode;
    private String outletCode;
    private String itemType;
    private String dailyJson;
    private String utdJson;

    private List<BlackBoxData> dailyList;
    private List<BlackBoxData> utdList;

    public String getMonthCode() {
        return monthCode;
    }

    public void setMonthCode(String monthCode) {
        this.monthCode = monthCode;
    }

    public String getOutletCode() {
        return outletCode;
    }

    public void setOutletCode(String outletCode) {
        this.outletCode = outletCode;
    }

    public String getDailyJson() {
        return dailyJson;
    }

    public void setDailyJson(String dailyJson) {
        this.dailyJson = dailyJson;
    }

    public String getUtdJson() {
        return utdJson;
    }

    public void setUtdJson(String utdJson) {
        this.utdJson = utdJson;
    }

    public List<BlackBoxData> getDailyList() {
        return dailyList;
    }

    public void setDailyList(List<BlackBoxData> dailyList) {
        this.dailyList = dailyList;
    }

    public List<BlackBoxData> getUtdList() {
        return utdList;
    }

    public void setUtdList(List<BlackBoxData> utdList) {
        this.utdList = utdList;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }
}
