package com.raydar.common.type;

/**
 * Created by mamun on 1/25/16.
 */
public enum AuditEntityName {
    CATEGORY("CategoryDATA");

    private String shortName;

    AuditEntityName(String shortName) {
        this.setShortName(shortName);
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }
}
