package com.raydar.common.type;

/**
 * Created by raj on 4/20/2016.
 */
public enum ClaimAuditType {

    CREATE(0, "Create"), SUBMITTED(1, "Submitted"), APPROVED(2, "Approved");

    private ClaimAuditType(int id, String shortName){
        this.id = id;
        this.shortName = shortName;
    }
    private int id;
    private String shortName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }


}
