package com.raydar.mybatis.domain;


import java.sql.Timestamp;

/**
 * This class is used to create audit for Auditable classes
 * and store it to AUDIT table
 *
 * NOTE: DO NOT implements Auditable on this class
 */
public class Audit extends BaseData {

    private Integer auditId;
    private Integer entityId;
    private String entityName;
    private String auditType;
    private String auditValue;
    private String queryName;
    private Integer performedBy;
    private Timestamp performedOn;

    public Integer getAuditId() {
        return auditId;
    }

    public void setAuditId(Integer auditId) {
        this.auditId = auditId;
    }

    public Integer getEntityId() {
        return entityId;
    }

    public void setEntityId(Integer entityId) {
        this.entityId = entityId;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getAuditType() {
        return auditType;
    }

    public void setAuditType(String auditType) {
        this.auditType = auditType;
    }

    public String getAuditValue() {
        return auditValue;
    }

    public void setAuditValue(String auditValue) {
        this.auditValue = auditValue;
    }

    public String getQueryName() {
        return queryName;
    }

    public void setQueryName(String queryName) {
        this.queryName = queryName;
    }

    public Integer getPerformedBy() {
        return performedBy;
    }

    public void setPerformedBy(Integer performedBy) {
        this.performedBy = performedBy;
    }

    public Timestamp getPerformedOn() {
        return performedOn;
    }

    public void setPerformedOn(Timestamp performedOn) {
        this.performedOn = performedOn;
    }
}
