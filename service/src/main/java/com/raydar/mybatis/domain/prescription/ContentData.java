package com.raydar.mybatis.domain.prescription;

/**
 * Created by raj on 1/10/2017.
 */
public class ContentData {

    private Integer id;
    private String name;
    private Integer numOfTimes;

    public Integer getNumOfTimes() {
        return numOfTimes;
    }

    public void setNumOfTimes(Integer numOfTimes) {
        this.numOfTimes = numOfTimes;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
