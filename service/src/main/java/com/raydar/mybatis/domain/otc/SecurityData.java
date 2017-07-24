package com.raydar.mybatis.domain.otc;

import java.math.BigDecimal;

/**
 * Created by raj on 6/24/2016.
 */
public class SecurityData {

	private Integer securityID;
	private Integer reportID;
	private String month_id;
	private String branch_code;
	private String cctvwork_nps;
	private String cctvwork_remark;
	private String cctvangel_nps;
	private String cctvangel_remark;
	private String cctvsurvel_nps;
	private String cctvsurvel_remark;

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
		sum = sum + (this.getCctvwork_nps() == null || this.getCctvwork_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getCctvwork_nps()));
		sum = sum + (this.getCctvangel_nps() == null || this.getCctvangel_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getCctvangel_nps()));
		sum = sum + (this.getCctvsurvel_nps() == null || this.getCctvsurvel_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getCctvsurvel_nps()));

		return sum;
	}

	public void setTotalScore(Double totalScore) {
		this.totalScore = totalScore;
	}

	public Double getAverageNps() {

		if(averageNps != null){
			return averageNps;
		}else if(this.getTotalScore() != null && this.getTotalScore() > 0){
			return this.getTotalScore() / 3;
		}else {
			return 0.0;
		}
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
	public String getCctvwork_nps() {
		return cctvwork_nps;
	}
	public void setCctvwork_nps(String cctvwork_nps) {
		this.cctvwork_nps = cctvwork_nps;
	}
	public String getCctvwork_remark() {
		return cctvwork_remark;
	}
	public void setCctvwork_remark(String cctvwork_remark) {
		this.cctvwork_remark = cctvwork_remark;
	}
	public String getCctvangel_nps() {
		return cctvangel_nps;
	}
	public void setCctvangel_nps(String cctvangel_nps) {
		this.cctvangel_nps = cctvangel_nps;
	}
	public String getCctvangel_remark() {
		return cctvangel_remark;
	}
	public void setCctvangel_remark(String cctvangel_remark) {
		this.cctvangel_remark = cctvangel_remark;
	}
	public String getCctvsurvel_nps() {
		return cctvsurvel_nps;
	}
	public void setCctvsurvel_nps(String cctvsurvel_nps) {
		this.cctvsurvel_nps = cctvsurvel_nps;
	}
	public String getCctvsurvel_remark() {
		return cctvsurvel_remark;
	}
	public void setCctvsurvel_remark(String cctvsurvel_remark) {
		this.cctvsurvel_remark = cctvsurvel_remark;
	}

	public Integer getSecurityID() {
		return securityID;
	}

	public void setSecurityID(Integer securityID) {
		this.securityID = securityID;
	}

	public Integer getReportID() {
		return reportID;
	}

	public void setReportID(Integer reportID) {
		this.reportID = reportID;
	}

	public String getDisplayString() {
		return "Security";
	}

	public void setDisplayString(String displayString) {
		this.displayString = displayString;
	}
}
