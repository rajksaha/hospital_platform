package com.raydar.mybatis.domain.otc;

import java.math.BigDecimal;

/**
 * Created by raj on 6/24/2016.
 */
public class ProductData {

	private Integer productID;
	private Integer reportID;
	private String month_id;
	private String branch_code;
	private String product_nps;
	private String product_remark;
	private String demo_nps;
	private String demo_remark;
	private String hole_nps;
	private String hole_remark;
	private String pop_nps;
	private String pop_remark;
	private String tagdisplay_nps;
	private String tagdisplay_remark;
	private String compliance_nps;
	private String compliance_remark;
	private String reviews_nps;
	private String review_remark;

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

	public void setOutletID(Integer outletID) {
		this.outletID = outletID;
	}

	public Double getTotalScore() {

		Double sum = 0.0;

		sum = sum + (this.getProduct_nps() == null || this.getProduct_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getProduct_nps()));
		sum = sum + (this.getDemo_nps() == null || this.getDemo_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getDemo_nps()));
		sum = sum + (this.getHole_nps() == null || this.getHole_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getHole_nps()));
		sum = sum + (this.getPop_nps() == null || this.getPop_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getPop_nps()));
		sum = sum + (this.getTagdisplay_nps() == null || this.getTagdisplay_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getTagdisplay_nps()));
		sum = sum + (this.getCompliance_nps() == null || this.getCompliance_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getCompliance_nps()));
		sum = sum + (this.getReviews_nps() == null || this.getReviews_nps().trim().equalsIgnoreCase("-") ? 0.0 : Double.parseDouble(this.getReviews_nps()));
		return sum;
	}

	public void setTotalScore(Double totalScore) {
		this.totalScore = totalScore;
	}

	public Double getAverageNps() {

		if(averageNps != null){
			return averageNps;
		}else if(this.getTotalScore() != null && this.getTotalScore() > 0){
			return this.getTotalScore() / 7;
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
	public String getProduct_nps() {
		return product_nps;
	}
	public void setProduct_nps(String product_nps) {
		this.product_nps = product_nps;
	}
	public String getProduct_remark() {
		return product_remark;
	}
	public void setProduct_remark(String product_remark) {
		this.product_remark = product_remark;
	}
	public String getDemo_nps() {
		return demo_nps;
	}
	public void setDemo_nps(String demo_nps) {
		this.demo_nps = demo_nps;
	}
	public String getDemo_remark() {
		return demo_remark;
	}
	public void setDemo_remark(String demo_remark) {
		this.demo_remark = demo_remark;
	}
	public String getHole_nps() {
		return hole_nps;
	}
	public void setHole_nps(String hole_nps) {
		this.hole_nps = hole_nps;
	}
	public String getHole_remark() {
		return hole_remark;
	}
	public void setHole_remark(String hole_remark) {
		this.hole_remark = hole_remark;
	}
	public String getPop_nps() {
		return pop_nps;
	}
	public void setPop_nps(String pop_nps) {
		this.pop_nps = pop_nps;
	}
	public String getPop_remark() {
		return pop_remark;
	}
	public void setPop_remark(String pop_remark) {
		this.pop_remark = pop_remark;
	}
	public String getTagdisplay_nps() {
		return tagdisplay_nps;
	}
	public void setTagdisplay_nps(String tagdisplay_nps) {
		this.tagdisplay_nps = tagdisplay_nps;
	}
	public String getTagdisplay_remark() {
		return tagdisplay_remark;
	}
	public void setTagdisplay_remark(String tagdisplay_remark) {
		this.tagdisplay_remark = tagdisplay_remark;
	}
	public String getCompliance_nps() {
		return compliance_nps;
	}
	public void setCompliance_nps(String compliance_nps) {
		this.compliance_nps = compliance_nps;
	}
	public String getCompliance_remark() {
		return compliance_remark;
	}
	public void setCompliance_remark(String compliance_remark) {
		this.compliance_remark = compliance_remark;
	}
	public String getReviews_nps() {
		return reviews_nps;
	}
	public void setReviews_nps(String reviews_nps) {
		this.reviews_nps = reviews_nps;
	}
	public String getReview_remark() {
		return review_remark;
	}
	public void setReview_remark(String review_remark) {
		this.review_remark = review_remark;
	}

	public Integer getProductID() {
		return productID;
	}

	public void setProductID(Integer productID) {
		this.productID = productID;
	}

	public Integer getReportID() {
		return reportID;
	}

	public void setReportID(Integer reportID) {
		this.reportID = reportID;
	}

	public String getDisplayString() {
		return "Product";
	}

	public void setDisplayString(String displayString) {
		this.displayString = displayString;
	}
}
