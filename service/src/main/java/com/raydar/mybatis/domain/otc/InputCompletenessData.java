package com.raydar.mybatis.domain.otc;


import java.math.BigDecimal;

public class InputCompletenessData {

	 	private String month_id;
	    private String outletCode;
	    private Integer columnWithInput;
	    private Integer totalColumn;
	    private String tableCompleteness;
	    private BigDecimal completenessPercentage;
		private String completenessType;

	public String getMonth_id() {
		return month_id;
	}

	public void setMonth_id(String month_id) {
		this.month_id = month_id;
	}

	public String getOutletCode() {
		return outletCode;
	}

	public void setOutletCode(String outletCode) {
		this.outletCode = outletCode;
	}

	public Integer getColumnWithInput() {
		return columnWithInput;
	}

	public void setColumnWithInput(Integer columnWithInput) {
		this.columnWithInput = columnWithInput;
	}

	public Integer getTotalColumn() {
		return totalColumn;
	}

	public void setTotalColumn(Integer totalColumn) {
		this.totalColumn = totalColumn;
	}

	public String getTableCompleteness() {
		if(totalColumn != null && columnWithInput != null){
			return  columnWithInput + "/ "+  totalColumn;
		}else{
			return tableCompleteness;
		}
	}

	public void setTableCompleteness(String tableCompleteness) {

		this.tableCompleteness = tableCompleteness;
	}

	public BigDecimal getCompletenessPercentage() {
		if(totalColumn != null && columnWithInput != null && Integer.valueOf(columnWithInput) > 0){
			double temp = ( (double) columnWithInput / (double)totalColumn) * 100;
			return  BigDecimal.valueOf(temp);
		}else{
			return completenessPercentage;
		}
	}

	public void setCompletenessPercentage(BigDecimal completenessPercentage) {
		this.completenessPercentage = completenessPercentage;
	}

	public String getCompletenessType() {
		return completenessType;
	}

	public void setCompletenessType(String completenessType) {
		this.completenessType = completenessType;
	}
}
