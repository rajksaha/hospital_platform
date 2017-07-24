package com.raydar.service.echo;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;

/**
 * Created by raj on 7/13/2016.
 */
public class ReportExcelUtils {

    public static void createBoldStyle(HSSFWorkbook wb,HSSFCell cell){
        HSSFCellStyle cellStyle = (HSSFCellStyle) wb.createCellStyle();
        HSSFFont font = wb.createFont();
        font.setFontName("Times New Roman");
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        font.setFontHeightInPoints((short) 10);
        cellStyle.setFont(font);
        cell.setCellStyle(cellStyle);
    }

    public static void createReportTitle(HSSFWorkbook wb,HSSFCell cell,boolean wrapText){
        HSSFCellStyle cellStyle = (HSSFCellStyle) wb.createCellStyle();
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        HSSFFont font = wb.createFont();
        font.setFontName("Times New Roman");
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        font.setFontHeightInPoints((short) 12);
        cellStyle.setFont(font);
        cell.setCellStyle(cellStyle);
    }


    public static void createRowCellBorder(HSSFWorkbook wb,HSSFSheet sheet,HSSFRow row,boolean wrapText,int colNum){
        for (int i=0; i <= colNum ; i++){
            HSSFCell cell = row.createCell(i);
            HSSFCellStyle cellStyle = getHssfCellStyle(wb, wrapText);
            HSSFFont font = wb.createFont();
            font.setFontName("Times New Roman");
            font.setFontHeightInPoints((short) 10);
            cellStyle.setFont(font);
            cell.setCellStyle(cellStyle);
        }
    }

    public static void createRowForGroupHeader(HSSFWorkbook wb,HSSFSheet sheet,HSSFRow row,boolean wrapText,int colNum){
        for (int i=0; i <= colNum ; i++){
            HSSFCell cell = row.createCell(i);
            HSSFCellStyle cellStyle = getHssfCellStyle(wb, wrapText);
            HSSFFont font = wb.createFont();
            font.setFontName("Times New Roman");
            font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            font.setFontHeightInPoints((short) 10);
            cellStyle.setFont(font);
            cell.setCellStyle(cellStyle);
        }
    }

    private static HSSFCellStyle getHssfCellStyle(HSSFWorkbook wb, boolean wrapText) {
        HSSFCellStyle cellStyle = (HSSFCellStyle) wb.createCellStyle();
        cellStyle.setWrapText(wrapText);
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        cellStyle.setBottomBorderColor(HSSFColor.BLACK.index);
        cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        cellStyle.setLeftBorderColor(HSSFColor.BLACK.index);
        cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
        cellStyle.setRightBorderColor(HSSFColor.BLACK.index);
        cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
        cellStyle.setTopBorderColor(HSSFColor.BLACK.index);
        return cellStyle;
    }

    public static void createFigureFormatStyle(HSSFWorkbook wb,HSSFCell cell){
        HSSFCellStyle cellStyle = (HSSFCellStyle)cell.getCellStyle();
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
    }

    public static void createFinancialFormatStyle(HSSFWorkbook wb,HSSFCell cell){
        HSSFCellStyle cellStyle = (HSSFCellStyle)cell.getCellStyle();
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
        cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
    }
}
