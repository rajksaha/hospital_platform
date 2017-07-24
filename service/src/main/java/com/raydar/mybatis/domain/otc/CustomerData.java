package com.raydar.mybatis.domain.otc;

import java.math.BigDecimal;

/**
 * Created by raj on 6/24/2016.
 */
public class CustomerData {

	private Integer customerID;
	private Integer reportID;
	private String month_id;
	private String branch_code;
	private String standby_nps;
	private String standby_remark;
	private String groomin_nps;
	private String grooming_remark;
	private String passionate_nps;
	private String passionate_remark;
	private String knowledge_nps;
	private String knowledge_remark;
	private String closing_nps;
	private String closing_remark;
	private String saleskill_nps;
	private String saleskill_remark;
	private String crosssales_nps;
	private String crosssales_remark;
	private String espeak_nps;
	private String espeak_remark;

	private String displayString;


	private Double averageNps;
	private Double totalScore;

	private Integer userID;
	private Integer outletID;
	private Integer numOfColumns;

	public Integer getNumOfColumns() {
		return numOfColumns;
	}

	public void setNumOfColumns(Integer numOfColumns) {
		this.numOfColumns = numOfColumns;
	}


	public Integer getUserID() {
		return userID;
	}

	public void setUserID(Integer userID) {
		this.userID = userID;
	}

	public Integer getOutletID() {
		return outletID;
	}

	public Double getTotalScore() {

		Double sum = 0.0;

		sum = sum + (this.getStandby_nps() == null || this.getStandby_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getStandby_nps()));
		sum = sum + (this.getGroomin_nps() == null || this.getGroomin_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getGroomin_nps()));
		sum = sum + (this.getPassionate_nps() == null || this.getPassionate_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getPassionate_nps()));
		sum = sum + (this.getKnowledge_nps() == null || this.getKnowledge_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getKnowledge_nps()));
		sum = sum + (this.getClosing_nps() == null || this.getClosing_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getClosing_nps()));
		sum = sum + (this.getSaleskill_nps() == null || this.getSaleskill_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getSaleskill_nps()));
		sum = sum + (this.getCrosssales_nps() == null || this.getCrosssales_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getCrosssales_nps()));
		sum = sum + (this.getEspeak_nps() == null || this.getEspeak_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getEspeak_nps()));

		return sum;
	}

	public void setTotalScore(Double totalScore) {
		this.totalScore = totalScore;
	}

	public Double getAverageNps() {

		if(averageNps != null){
			return averageNps;
		}else if(this.getTotalScore() != null && this.getTotalScore() > 0){
			return this.getTotalScore() / 8;
		}else {
			return 0.0;
		}
	}

	public void setAverageNps(Double averageNps) {
		this.averageNps = averageNps;
	}

	public String getMonth_id() {
		return month_id;
	}
	public void setMonth_id(String month_id) {
		this.month_id = month_id;
	}
	public String getBranch_code() {
		return branch_code;
	}
	public void setBranch_code(String branch_code) {
		this.branch_code = branch_code;
	}
	public String getStandby_nps() {
		return standby_nps;
	}
	public void setStandby_nps(String standby_nps) {
		this.standby_nps = standby_nps;
	}
	public String getStandby_remark() {
		return standby_remark;
	}
	public void setStandby_remark(String standby_remark) {
		this.standby_remark = standby_remark;
	}
	public String getGroomin_nps() {
		return groomin_nps;
	}
	public void setGroomin_nps(String groomin_nps) {
		this.groomin_nps = groomin_nps;
	}
	public String getGrooming_remark() {
		return grooming_remark;
	}
	public void setGrooming_remark(String grooming_remark) {
		this.grooming_remark = grooming_remark;
	}
	public String getPassionate_nps() {
		return passionate_nps;
	}
	public void setPassionate_nps(String passionate_nps) {
		this.passionate_nps = passionate_nps;
	}
	public String getPassionate_remark() {
		return passionate_remark;
	}
	public void setPassionate_remark(String passionate_remark) {
		this.passionate_remark = passionate_remark;
	}
	public String getKnowledge_nps() {
		return knowledge_nps;
	}
	public void setKnowledge_nps(String knowledge_nps) {
		this.knowledge_nps = knowledge_nps;
	}
	public String getKnowledge_remark() {
		return knowledge_remark;
	}
	public void setKnowledge_remark(String knowledge_remark) {
		this.knowledge_remark = knowledge_remark;
	}
	public String getClosing_nps() {
		return closing_nps;
	}
	public void setClosing_nps(String closing_nps) {
		this.closing_nps = closing_nps;
	}
	public String getClosing_remark() {
		return closing_remark;
	}
	public void setClosing_remark(String closing_remark) {
		this.closing_remark = closing_remark;
	}
	public String getSaleskill_nps() {
		return saleskill_nps;
	}
	public void setSaleskill_nps(String saleskill_nps) {
		this.saleskill_nps = saleskill_nps;
	}
	public String getSaleskill_remark() {
		return saleskill_remark;
	}
	public void setSaleskill_remark(String saleskill_remark) {
		this.saleskill_remark = saleskill_remark;
	}
	public String getCrosssales_nps() {
		return crosssales_nps;
	}
	public void setCrosssales_nps(String crosssales_nps) {
		this.crosssales_nps = crosssales_nps;
	}
	public String getCrosssales_remark() {
		return crosssales_remark;
	}
	public void setCrosssales_remark(String crosssales_remark) {
		this.crosssales_remark = crosssales_remark;
	}
	public String getEspeak_nps() {
		return espeak_nps;
	}
	public void setEspeak_nps(String espeak_nps) {
		this.espeak_nps = espeak_nps;
	}
	public String getEspeak_remark() {
		return espeak_remark;
	}
	public void setEspeak_remark(String espeak_remark) {
		this.espeak_remark = espeak_remark;
	}

	public Integer getCustomerID() {
		return customerID;
	}

	public void setCustomerID(Integer customerID) {
		this.customerID = customerID;
	}

	public Integer getReportID() {
		return reportID;
	}

	public void setReportID(Integer reportID) {
		this.reportID = reportID;
	}

	public String getDisplayString() {
		return "Customer";
	}

	public void setDisplayString(String displayString) {
		this.displayString = displayString;
	}
}
