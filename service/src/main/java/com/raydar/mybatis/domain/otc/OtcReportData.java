package com.raydar.mybatis.domain.otc;

import com.raydar.mybatis.domain.BaseData;
import com.raydar.mybatis.domain.user.UserProfileData;
import org.apache.commons.collections.CollectionUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/27/2016.
 */
public class OtcReportData extends BaseData {

    private Integer otcReportID;
    private String reportName;
    private Integer outletID;
    private Integer userID;
    private String userType;
    private String employeeCode;
    private Integer status;
    private Integer numberOfColumns;



    private CleanlinessData reportCleanliness;
    private CustomerData reportCustomer;
    private PromotionData reportPromotion;
    private ProductData reportProduct;
    private SecurityData reportSecurity;
    private UserProfileData auditorData;

    private List<WeaknessData> reportWeaknessList;
    private List<EvolutionData> reportEvolutionList;

    private OtcBlackBoxItemData salesPerformanceData;
    private OtcBlackBoxItemData inventoryManagementData;
    private OtcBlackBoxItemData manPowerData;
    private OtcBlackBoxItemData repairData;
    private OtcBlackBoxItemData loyalData;


    private InputCompletenessData inputCompletenessData;



    private double completenessAvg;
    private BigDecimal npsScore;

    private String mostCriticalArea1;
    private String mostCriticalArea2;
    private String mostCriticalArea3;

    Map<String,Object> dataMap;

    private String outletCode;
    private String regionName;
    private String wingName;
    private String userFirstName;



    public void setCompletenessAvg(double completenessAvg) {
        this.completenessAvg = completenessAvg;
    }

    public BigDecimal getCompletenessAvg(){
        BigDecimal completenessAvg = BigDecimal.ZERO;
        if(inputCompletenessData != null){
            completenessAvg = inputCompletenessData.getCompletenessPercentage();
        }
        return completenessAvg;
    }


    public Integer getOtcReportID() {
        return otcReportID;
    }

    public void setOtcReportID(Integer otcReportID) {
        this.otcReportID = otcReportID;
    }

    public String getReportName() {
        return reportName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public Integer getOutletID() {
        return outletID;
    }

    public void setOutletID(Integer outletID) {
        this.outletID = outletID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public CleanlinessData getReportCleanliness() {
        return reportCleanliness;
    }

    public void setReportCleanliness(CleanlinessData reportCleanliness) {
        this.reportCleanliness = reportCleanliness;
    }

    public CustomerData getReportCustomer() {
        return reportCustomer;
    }

    public void setReportCustomer(CustomerData reportCustomer) {
        this.reportCustomer = reportCustomer;
    }

    public PromotionData getReportPromotion() {
        return reportPromotion;
    }

    public void setReportPromotion(PromotionData reportPromotion) {
        this.reportPromotion = reportPromotion;
    }

    public ProductData getReportProduct() {
        return reportProduct;
    }

    public void setReportProduct(ProductData reportProduct) {
        this.reportProduct = reportProduct;
    }

    public SecurityData getReportSecurity() {
        return reportSecurity;
    }

    public void setReportSecurity(SecurityData reportSecurity) {
        this.reportSecurity = reportSecurity;
    }

    public UserProfileData getAuditorData() {
        return auditorData;
    }

    public void setAuditorData(UserProfileData auditorData) {
        this.auditorData = auditorData;
    }


    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    public void setDataMap(Map<String, Object> dataMap) {
        this.dataMap = dataMap;
    }

    public BigDecimal getNpsScore() {
        return npsScore;
    }

    public void setNpsScore(BigDecimal npsScore) {
        this.npsScore = npsScore;
    }

    public String getMostCriticalArea1() {
        return mostCriticalArea1;
    }

    public void setMostCriticalArea1(String mostCriticalArea1) {
        this.mostCriticalArea1 = mostCriticalArea1;
    }

    public String getMostCriticalArea2() {
        return mostCriticalArea2;
    }

    public void setMostCriticalArea2(String mostCriticalArea2) {
        this.mostCriticalArea2 = mostCriticalArea2;
    }

    public String getMostCriticalArea3() {
        return mostCriticalArea3;
    }

    public void setMostCriticalArea3(String mostCriticalArea3) {
        this.mostCriticalArea3 = mostCriticalArea3;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public InputCompletenessData getInputCompletenessData() {
        return inputCompletenessData;
    }

    public void setInputCompletenessData(InputCompletenessData inputCompletenessData) {
        this.inputCompletenessData = inputCompletenessData;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getOutletCode() {
        return outletCode;
    }

    public void setOutletCode(String outletCode) {
        this.outletCode = outletCode;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getWingName() {
        return wingName;
    }

    public void setWingName(String wingName) {
        this.wingName = wingName;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public List<WeaknessData> getReportWeaknessList() {
        return reportWeaknessList;
    }

    public void setReportWeaknessList(List<WeaknessData> reportWeaknessList) {
        this.reportWeaknessList = reportWeaknessList;
    }

    public List<EvolutionData> getReportEvolutionList() {
        return reportEvolutionList;
    }

    public void setReportEvolutionList(List<EvolutionData> reportEvolutionList) {
        this.reportEvolutionList = reportEvolutionList;
    }

    public Integer getNumberOfColumns() {
        return numberOfColumns;
    }

    public void setNumberOfColumns(Integer numberOfColumns) {
        this.numberOfColumns = numberOfColumns;
    }

    public OtcBlackBoxItemData getSalesPerformanceData() {
        return salesPerformanceData;
    }

    public void setSalesPerformanceData(OtcBlackBoxItemData salesPerformanceData) {
        this.salesPerformanceData = salesPerformanceData;
    }

    public OtcBlackBoxItemData getInventoryManagementData() {
        return inventoryManagementData;
    }

    public void setInventoryManagementData(OtcBlackBoxItemData inventoryManagementData) {
        this.inventoryManagementData = inventoryManagementData;
    }

    public OtcBlackBoxItemData getManPowerData() {
        return manPowerData;
    }

    public void setManPowerData(OtcBlackBoxItemData manPowerData) {
        this.manPowerData = manPowerData;
    }

    public OtcBlackBoxItemData getRepairData() {
        return repairData;
    }

    public void setRepairData(OtcBlackBoxItemData repairData) {
        this.repairData = repairData;
    }

    public OtcBlackBoxItemData getLoyalData() {
        return loyalData;
    }

    public void setLoyalData(OtcBlackBoxItemData loyalData) {
        this.loyalData = loyalData;
    }
}
