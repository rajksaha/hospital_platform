package com.raydar.mybatis.domain.eclaim;

import java.util.List;

/**
 * Created by raj on 4/28/2016.
 */
public class Rule {

    String ruleName;
    Integer ruleId;
    String methodName;
    String className;
    String validationMessage;
    List<String> referenceFields;

    public String getRuleName() {
        return ruleName;
    }

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
    }

    public Integer getRuleId() {
        return ruleId;
    }

    public void setRuleId(Integer ruleId) {
        this.ruleId = ruleId;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getValidationMessage() {
        return validationMessage;
    }

    public void setValidationMessage(String validationMessage) {
        this.validationMessage = validationMessage;
    }

    public List<String> getReferenceFields() {
        return referenceFields;
    }

    public void setReferenceFields(List<String> referenceFields) {
        this.referenceFields = referenceFields;
    }
}
