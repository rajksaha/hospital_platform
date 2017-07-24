package com.raydar.common.utility;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.eclaim.CategoryFieldDATA;
import com.raydar.mybatis.domain.eclaim.CompanyGlobalRuleData;
import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 8/19/2016.
 */
public class EClaimCommonUtils {

    public static BigDecimal getDecimalFromString(String valueString){
        if(valueString != null){
            return  BigDecimal.valueOf(Double.parseDouble(valueString)).setScale(2, BigDecimal.ROUND_HALF_UP);
        }
        return null;
    }

    public static Timestamp getTimeStampFromString(String valueString){

        return DateUtil.getTimestampFromString(valueString.substring(0, 10), "yyyy-MM-dd");
    }

    public static Timestamp findCutOffDate (Integer cutOffDay)throws RaydarException {

        Timestamp timeStampDate = null;
        try {

            Calendar cal = Calendar.getInstance();
            int month = cal.get(Calendar.MONTH) + 1;
            int year = cal.get(Calendar.YEAR);
            String monStr = month+ "";
            if(month < 9){
                monStr = "0"+month;
            }
            String dayOfMonthStr = year + "-" + monStr + "-" + cutOffDay;

            DateFormat formatter;
            formatter = new SimpleDateFormat("yyyy-MM-dd");
            // you can change format of date
            Date date = formatter.parse(dayOfMonthStr);
            timeStampDate = new Timestamp(date.getTime());

        }catch(Exception e){
            timeStampDate = null;
        }

        return timeStampDate;
    }

    public static String convertToDateString(String stringDate){
        try {
            if(stringDate != null) {
                Timestamp timestamp = DateUtil.getTimestampFromString(stringDate.substring(0,10),"yyyy-MM-dd");
                String str = DateUtil.getFormattedDateStringFromTimestamp(timestamp, "dd-MM-yyyy");
                return str;

            }
        }catch (Exception e){
            //throw e;
            String s = e.getMessage();
        }


        return null;
    }

    public static Map<String, Object> getDateRangeFromCutOffDate(Map<String, Object> param, Integer cutOffDay, Timestamp actionDate){

        Calendar cal = Calendar.getInstance();
        if(actionDate == null){
            actionDate = new Timestamp(new Date().getTime());
        }
        cal.setTimeInMillis(actionDate.getTime());
        Integer year = cal.get(Calendar.YEAR);
        Integer month = cal.get(Calendar.MONTH) + 1;

        String startDate = year + "-";
        String endDate = year + "-";
        if (cutOffDay != null) {
            startDate += (month - 1) + "-" + (cutOffDay + 1);
            endDate += month + "-" + cutOffDay;
        }

        param.put("startDate", startDate);
        param.put("endDate", endDate);

        return param;
    }

    public static BigDecimal getAmount(List<CategoryFieldDATA> fieldList){

        for(CategoryFieldDATA result : fieldList){
            if(result.getIsAmount().equals(1)){
                return getDecimalFromString(result.getFieldValue());
            }
        }
        return BigDecimal.ZERO;
    }

    public static Timestamp getDate(List<CategoryFieldDATA> fieldList){

        for(CategoryFieldDATA result : fieldList){
            if(result.getFieldType().equals(2)){
                String dateValue = result.getFieldValueStr() == null ? result.getFieldValue() : result.getFieldValueStr();
                return DateUtil.getTimestampFromString(dateValue.substring(0, 10), "yyyy-MM-dd");
            }
        }
        return null;
    }
    public static String getApplicationUrl(String status){
        String host = EchoProperties.INSTANCE.getProperty("web.app.host");
        String path = EchoProperties.INSTANCE.getProperty("web.app.context.path");
        String protocol = EchoProperties.INSTANCE.getProperty("web.app.protocol");
        String url = protocol + "://" + host;
        url += path+ status;
        return url;
    }

}
