package com.raydar.mybatis.domain.prescription.drug;

/**
 * Created by raj on 1/12/2017.
 */
public class DrugTypeData {

    private Integer drugTypeID;
    private String name;
    private String initial;
    private String unit;
    private String unitInitial;
    private String optionalUnitInitial;


    public Integer getDrugTypeID() {
        return drugTypeID;
    }

    public void setDrugTypeID(Integer drugTypeID) {
        this.drugTypeID = drugTypeID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInitial() {
        return initial;
    }

    public void setInitial(String initial) {
        this.initial = initial;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getUnitInitial() {
        return unitInitial;
    }

    public void setUnitInitial(String unitInitial) {
        this.unitInitial = unitInitial;
    }

    public String getOptionalUnitInitial() {
        return optionalUnitInitial;
    }

    public void setOptionalUnitInitial(String optionalUnitInitial) {
        this.optionalUnitInitial = optionalUnitInitial;
    }
}
