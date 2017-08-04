package com.raydar.mybatis.domain.user;

import com.raydar.mybatis.domain.BaseData;

import java.util.List;

/**
 * Created by raj on 4/29/2016.
 */
public class ContentDetailData extends BaseData {

    private Integer contentDetailID;
    private Integer entityID;
    private String entityType;
    private String shortName;
    private String longDesc;
    private String content;
    private String url;
    private String format;


    public Integer getContentDetailID() {
        return contentDetailID;
    }

    public void setContentDetailID(Integer contentDetailID) {
        this.contentDetailID = contentDetailID;
    }

    public Integer getEntityID() {
        return entityID;
    }

    public void setEntityID(Integer entityID) {
        this.entityID = entityID;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getLongDesc() {
        return longDesc;
    }

    public void setLongDesc(String longDesc) {
        this.longDesc = longDesc;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }
}
