package com.raydar.mybatis.domain.otc;

import java.math.BigDecimal;

/**
 * Created by raj on 6/24/2016.
 */
public class PromotionData {

	private Integer promotionID;
	private Integer reportID;
	private String month_id;
	private String branch_code;
	private String memobe_nps;
	private String memobe_remark;
	private String promo_nps;
	private String promo_remark;
	private String popd_nps;
	private String popd_remark;
	private String promos_nps;
	private String promos_remark;

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
		sum = sum + (this.getMemobe_nps() == null || this.getMemobe_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getMemobe_nps()));
		sum = sum + (this.getPromo_nps() == null || this.getPromo_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getPromo_nps()));
		sum = sum + (this.getPopd_nps() == null || this.getPopd_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getPopd_nps()));
		sum = sum + (this.getPromos_nps() == null || this.getPromos_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getPromos_nps()));

		return sum;
	}

	public void setTotalScore(Double totalScore) {
		this.totalScore = totalScore;
	}

	public Double getAverageNps() {

		if(averageNps != null){
			return averageNps;
		}else if(this.getTotalScore() != null && this.getTotalScore() > 0){
			return this.getTotalScore() / 4;
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
	public String getMemobe_nps() {
		return memobe_nps;
	}
	public void setMemobe_nps(String memobe_nps) {
		this.memobe_nps = memobe_nps;
	}
	public String getMemobe_remark() {
		return memobe_remark;
	}
	public void setMemobe_remark(String memobe_remark) {
		this.memobe_remark = memobe_remark;
	}
	public String getPromo_nps() {
		return promo_nps;
	}
	public void setPromo_nps(String promo_nps) {
		this.promo_nps = promo_nps;
	}
	public String getPromo_remark() {
		return promo_remark;
	}
	public void setPromo_remark(String promo_remark) {
		this.promo_remark = promo_remark;
	}
	public String getPopd_nps() {
		return popd_nps;
	}
	public void setPopd_nps(String popd_nps) {
		this.popd_nps = popd_nps;
	}
	public String getPopd_remark() {
		return popd_remark;
	}
	public void setPopd_remark(String popd_remark) {
		this.popd_remark = popd_remark;
	}
	public String getPromos_nps() {
		return promos_nps;
	}
	public void setPromos_nps(String promos_nps) {
		this.promos_nps = promos_nps;
	}
	public String getPromos_remark() {
		return promos_remark;
	}
	public void setPromos_remark(String promos_remark) {
		this.promos_remark = promos_remark;
	}

	public Integer getPromotionID() {
		return promotionID;
	}

	public void setPromotionID(Integer promotionID) {
		this.promotionID = promotionID;
	}

	public Integer getReportID() {
		return reportID;
	}

	public void setReportID(Integer reportID) {
		this.reportID = reportID;
	}

	public String getDisplayString() {
		return "Promotion";
	}

	public void setDisplayString(String displayString) {
		this.displayString = displayString;
	}
}
