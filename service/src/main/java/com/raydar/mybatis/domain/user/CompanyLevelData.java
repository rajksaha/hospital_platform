package com.raydar.mybatis.domain.user;

import java.util.List;

/**
 * Created by raj on 4/28/2016.
 */
public class CompanyLevelData {

    private String levelName;
    private String levelValue;

    private List<ApplyData> resultList;

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getLevelValue() {
        return levelValue;
    }

    public void setLevelValue(String levelValue) {
        this.levelValue = levelValue;
    }

    public List<ApplyData> getResultList() {
        return resultList;
    }

    public void setResultList(List<ApplyData> resultList) {
        this.resultList = resultList;
    }
}
