package com.raydar.mybatis.domain.eclaim;

/**
 * Created by raj on 4/28/2016.
 */
public class TemplateUserDetailData {

    Integer templateId;
    String templateName;
    public String headerNames;
    String mandatory;
    Integer fieldId;

    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getHeaderNames() {
        return headerNames;
    }

    public void setHeaderNames(String headerNames) {
        this.headerNames = headerNames;
    }

    public String getMandatory() {
        return mandatory;
    }

    public void setMandatory(String mandatory) {
        this.mandatory = mandatory;
    }

    public Integer getFieldId() {
        return fieldId;
    }

    public void setFieldId(Integer fieldId) {
        this.fieldId = fieldId;
    }
}
