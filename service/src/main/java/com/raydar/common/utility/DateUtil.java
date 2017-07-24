

package com.raydar.common.utility;

import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.time.DateUtils;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.Days;
import org.joda.time.DurationFieldType;
import org.joda.time.LocalDate;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

/**
 * Created by raj on 7/15/2016.
 */
public class DateUtil
{
    public final static int UPPER_CASE = 1;
    public final static int LOWER_CASE = 2;
    public final static int MIXED_CASE = 3;
    
    public static int daysBetween(Date startDate, Date endDate)
    {
        Calendar sDate = Calendar.getInstance();
        sDate.setTime(startDate);
        Calendar eDate = Calendar.getInstance();
        eDate.setTime(endDate);
        int daysBetween = 0;
        while (sDate.before(eDate))
        {
            sDate.add(Calendar.DAY_OF_MONTH, 1);
            daysBetween++;
        }
        return daysBetween;
    }

    public static boolean isBetween(Timestamp startDate, Timestamp endDate, Timestamp date)
    {
        return isBetweenDate(startDate, endDate, date);
    }

    public static boolean isBetweenDate(Date startDate, Date endDate, Date date)
    {
        if (startDate == null || endDate == null || date == null)
            return false;

        return (startDate.compareTo(date) <= 0 && endDate.compareTo(date) >= 0);
    }
    
    /**
     * Returns the day of the week for any specific date
     * @param date timestamp of date to derive day of week from
     * @param displayType static value of UPPER_CASE (MON, TUE, etc), LOWER_CASE (mon, tue, etc), 
     * or MIXED_CASE (Mon, Tue, etc)
     * @return day of the week, in the format of SUN, MON, TUE, WED, THU, FRI, or SAT
     */
    public static String getDayOfWeek(Timestamp date, int displayType){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date(date.getTime()));
        int day = calendar.get(Calendar.DAY_OF_WEEK);          
        return getDay(day, displayType);
    }     

    /**
     * Returns day of week as follows:
     * 1=Sunday, 2=Monday, 3=Tuesday, 4=Wednesday, 5=Thursday, 6=Friday, 7=Saturday
     * @param date
     * @return int of day of week
     */
    public static int getDayOfWeekInt(Timestamp date){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date(date.getTime()));
        return calendar.get(Calendar.DAY_OF_WEEK);
    }

    /**
     * Get the date only from given Timestamp, stripping out time part
     * @return Timestamp
     */
    public static Timestamp getDateOnly(Timestamp date) {
        Calendar cal = Calendar.getInstance();
        if (date != null)
            cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return new Timestamp(cal.getTimeInMillis());
    }
    
    /**
     * Get the date only from given Date, stripping out time part
     * @return Date
     */
    public static Date getDateOnly(Date d) {
        Date res = d;
        Calendar calendar = Calendar.getInstance();
        if (d != null)
        	calendar.setTime(d);
        calendar.setTime(d);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        res = calendar.getTime();
        return res;
    }

    public static Timestamp getToday()
    {
        return getDateOnly(null);
    }

    /**
     * get the first day and last day of calendar view
     * @param startDate date to get the month
     * @return array of startDate, and endDate, respectively
     */
    public static Timestamp[] getCalendarViewStartAndEndDate(Timestamp startDate)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        int currentMonth = cal.get(Calendar.MONTH);
        int diff = dayOfWeek - 1;   // diff is the number of days to get from the previous month
        if (diff > 0)
            startDate = new Timestamp(DateUtils.addDays(startDate, -diff).getTime());

        // get the last day of this month
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
        Timestamp endDate = new Timestamp(cal.getTime().getTime());
        dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        diff = 7 - dayOfWeek;   // diff is the number of days to get from the next month
        if (diff > 0)
            endDate = new Timestamp(DateUtils.addDays(endDate, diff).getTime());

        return new Timestamp[]{startDate, endDate};
    }
    
    public static Timestamp getTimestampFromString(String dateStr){
        try {
            String[] pattern = { "MM/dd/yyyy", "yyyy/MM/dd", "MM-dd-yyyy", "d-MMM", "MMddyyyy"};
            Date date = new Date(DateUtils.parseDate(dateStr, pattern).getTime());
            return new Timestamp(date.getTime());
        } catch (Exception e) {
            return null;
        }
    }
    
    public static Timestamp getTimestampFromString(String dateStr, String dateFormat){
        try {
            return new Timestamp(DateUtil.getStringToDate(dateStr, dateFormat).getTime());
        } catch (Exception e) {
            return null;
        }
    }
    
    public static String getMMddyyyyFromTimestamp(Timestamp date){
        try {
            return new SimpleDateFormat("MM/dd/yyyy").format(date);
        } catch (Exception e) {
            return null;
        }
    }
    
    public static String getFormattedDateStringFromTimestamp(Timestamp date, String pattern){
        try {
            return new SimpleDateFormat(pattern).format(date);
        } catch (Exception e) {
            return null;
        }
    }     
    
    private static String getDay(int day, int displayType){
        switch(day){
          case 1:
            return getFormattedDay("Sun", displayType);
          case 2:
            return getFormattedDay("Mon", displayType);
          case 3:
            return getFormattedDay("Tue", displayType);
          case 4:
            return getFormattedDay("Wed", displayType);
          case 5:
            return getFormattedDay("Thu", displayType);
          case 6:
            return getFormattedDay("Fri", displayType);
          case 7:
            return getFormattedDay("Sat", displayType);
          default:
            return null;
        }
    }
    
    private static String getFormattedDay(String dayOfWeek, int displayType){
        if (displayType == UPPER_CASE)
            return dayOfWeek.toUpperCase();
        else if (displayType == LOWER_CASE)
            return dayOfWeek.toLowerCase();
        else if (displayType == MIXED_CASE)
            return dayOfWeek;
        else
            return dayOfWeek.toUpperCase();        
    }
    
    /**
     * Adds a number of days to a Timestamp
     * @param date  the Timestamp, not null
     * @param days, the amount to add, may be negative
     * @return Timestamp object with the days added
     */
    public static Timestamp addDays(Timestamp date, int days) {
    	Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days); //minus number would decrement the days
        return new Timestamp(cal.getTimeInMillis());
    }
    
    /**
     * Adds a number of days to a Date
     * @param date  the Date, not null
     * @param days, the amount to add, may be negative
     * @return Date object with the days added
     */
    public static Date addDays(Date date, int days) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days); //minus number would decrement the days
        return cal.getTime();
    }

    /**
     * Takes current date and gets 1st day of previous month and last day of the
     * next month
     * @return array of timestamp objects with start date and end date
     */
    public static Timestamp[] getCalendarStartAndEndDate()
    {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DATE, 1);
        Date prevMonth = cal.getTime();
        
        Calendar cal2 = Calendar.getInstance();
        cal2.set(Calendar.DATE, cal.getActualMaximum(Calendar.DATE));
        Date nextMonth = cal2.getTime();        
        
        return new Timestamp[]{new Timestamp(prevMonth.getTime()), new Timestamp(nextMonth.getTime())};
    }


    public static Timestamp[] getCalendarStartAndEndDate(Timestamp monthDate)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(monthDate);

        cal.set(Calendar.DATE, 1);
        Date prevMonth = cal.getTime();

        Calendar cal2 = Calendar.getInstance();
        cal2.set(Calendar.DATE, cal.getActualMaximum(Calendar.DATE));
        Date nextMonth = cal2.getTime();

        return new Timestamp[]{new Timestamp(prevMonth.getTime()), new Timestamp(nextMonth.getTime())};
    }

    public static Timestamp[] getMonthStartAndEndDate(Timestamp monthDate)
    {
        Calendar cal = Calendar.getInstance();
        if(monthDate == null){
            cal.set(Calendar.DATE, 1);
        }else{
            cal.setTime(monthDate);
        }

        cal.set(Calendar.DATE, 1);
        Date dayOne = cal.getTime();

        cal.set(Calendar.DATE, cal.getActualMaximum(Calendar.DATE));
        Date dayEnd = cal.getTime();

        return new Timestamp[]{new Timestamp(dayOne.getTime()), new Timestamp(dayEnd.getTime())};
    }

    public static String getDateString(Date dt){
    	if(dt == null){
    		return "";
    	}
    	SimpleDateFormat sdf = new SimpleDateFormat("ddMMMyyyy");
		String date = sdf.format(dt); 
		return date;
    }
    
    public static String getTimestampToString(Timestamp dt){
    	if(dt == null){
    		return "";
    	}
    	SimpleDateFormat sdf = new SimpleDateFormat("ddMMMyyyy");
		String date = sdf.format(dt); 
		return date;
    }
    
    public static String getTimestampToString(Timestamp dt, String pattern){
    	if(dt == null){
    		return "";
    	}
    	SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		String date = sdf.format(dt); 
		return date;
    }

    public static long getUTCInSeconds()
    {
        DateTime now = new DateTime(DateTimeZone.UTC);
        long time = now.getMillis()/1000;   
        return time;
    }
    
    public static Integer getNoOfDays(Date date1, Date date2) {
       return Days.daysBetween(new LocalDate(date1), new LocalDate(date2)).getDays();
        
    }
    
    public static Date getStringToDate(String dateStr, String dateFormate) {
    	Date d = null;
    	String pattern = "MM/dd/yyy";
    	if(dateFormate != null && !dateFormate.isEmpty()){
    		pattern = dateFormate;
    	}
    	SimpleDateFormat sdf = new SimpleDateFormat(pattern);
    	try {
			d = sdf.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
    	return d;
    }

    
    public static Timestamp getDateByHourMin(Timestamp d, Integer h, Integer m) {
        Timestamp res = d;
        Calendar calendar = Calendar.getInstance();

        calendar.setTime( d );
        calendar.set(Calendar.HOUR_OF_DAY, h);
        calendar.set(Calendar.MINUTE, m);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        res = new Timestamp(calendar.getTime().getTime());

        return res;
    }
    /**
     * System is considering Sunday as the start day of the week
     * Joda Time API is considering Monday as the start day of the week
     * for now we are mapping this two pattern.
     */
    
	public static List<Date> getValidDates(Timestamp startDate, Timestamp endDate, String weekDayPattern){
		if(weekDayPattern.length() > 6){
			
		}
		LocalDate startDateLocal = new LocalDate(startDate);
		LocalDate endDateLocal = new LocalDate(endDate);
		
		List<LocalDate> dates = new ArrayList<LocalDate>();
		
		int days = Days.daysBetween(startDateLocal, endDateLocal).getDays()+1;
		for (int i=0; i < days; i++) {
		    LocalDate d = startDateLocal.withFieldAdded(DurationFieldType.days(), i);
		    dates.add(d);
		}
		
		List<Date> valiDates = new ArrayList<Date>();
		
		for (LocalDate localDate : dates) {
			int dayOfWeek = localDate.getDayOfWeek();
			switch (dayOfWeek) {
			case 1:
				if(BooleanUtils.toBooleanObject(dayOfWeek) == (weekDayPattern.charAt(1) == 'Y' ? true : false) ){
					valiDates.add(localDate.toDate());
				}
				break;
			case 2:
				if(BooleanUtils.toBooleanObject(dayOfWeek) == (weekDayPattern.charAt(2) == 'Y' ? true : false)){
					valiDates.add(localDate.toDate());
				}		
				break;
			case 3:
				if(BooleanUtils.toBooleanObject(dayOfWeek) == (weekDayPattern.charAt(3) == 'Y' ? true : false)){
					valiDates.add(localDate.toDate());
				}
				break;
			case 4:
				if(BooleanUtils.toBooleanObject(dayOfWeek) == (weekDayPattern.charAt(4) == 'Y' ? true : false)){
					valiDates.add(localDate.toDate());
				}
				break;
			case 5:
				if(BooleanUtils.toBooleanObject(dayOfWeek) == (weekDayPattern.charAt(5) == 'Y' ? true : false)){
					valiDates.add(localDate.toDate());
				}
				break;
			case 6:
				if(BooleanUtils.toBooleanObject(dayOfWeek) == (weekDayPattern.charAt(6) == 'Y' ? true : false)){
					valiDates.add(localDate.toDate());
				}
				break;
			case 7:
				if(BooleanUtils.toBooleanObject(dayOfWeek) == (weekDayPattern.charAt(0) == 'Y' ? true : false)){
					valiDates.add(localDate.toDate());
				}
				break;
			default:
				break;
			}
			
		}
		return valiDates;
		
	}

    public static boolean overlaps(Timestamp startDate1, Timestamp endDate1, Timestamp startDate2, Timestamp endDate2)
    {
        if (startDate1 == null || endDate1 == null || startDate2 == null || endDate2 == null)
            return false;

        return startDate1.compareTo(endDate2) <= 0 && endDate1.compareTo(startDate2) >= 0;
    }
    
    /**
     * get time by timeZone (GMT) - e.g: GMT+6:60 / GMT-3:00
     * @param gmtTimezone
     * @return
     */
    public static Timestamp getTimestampFromGmtTimezone(String gmtTimezone) {
    	gmtTimezone = gmtTimezone == null ? "GMT" : gmtTimezone;
        String strFormat = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat dateFormatter = new SimpleDateFormat(strFormat);
		dateFormatter.setTimeZone(TimeZone.getTimeZone(gmtTimezone));
		String localTimeStr = dateFormatter.format(new Date());
		return getTimestampFromString(localTimeStr, strFormat);
    }
    
    /**
     * set adjusted time to a Timestamp
     * @param timestamp
     * @param hoursOfDay
     * @param minute
     * @param second
     * @param millisecond
     * @return
     */
    public static Timestamp setAdjustedTime(Timestamp timestamp, int hoursOfDay, int minute, int second, int millisecond) {
        Calendar cal = Calendar.getInstance();
        if (timestamp != null)
            cal.setTime(timestamp);
        cal.set(Calendar.HOUR_OF_DAY, hoursOfDay);
        cal.set(Calendar.MINUTE, minute);
        cal.set(Calendar.SECOND, second);
        cal.set(Calendar.MILLISECOND, millisecond);
        return new Timestamp(cal.getTimeInMillis());
    }

    /**
     * add check in time from properties file
     * @param timestamp
     * @return
     */


    public static Timestamp[] getYearStartAndEndDate(Timestamp monthDate)
    {
        Calendar cal = Calendar.getInstance();
        DateTime dateTime = new DateTime(monthDate);
        cal.set(Calendar.YEAR, dateTime.getYear());
        cal.set(Calendar.DAY_OF_YEAR, 1);
        Date start = cal.getTime();

        //set date to last day of 2014
        cal.set(Calendar.YEAR, dateTime.getYear());
        cal.set(Calendar.MONTH, 11); // 11 = december
        cal.set(Calendar.DAY_OF_MONTH, 31); // new years eve

        Date end = cal.getTime();

        return new Timestamp[]{new Timestamp(start.getTime()), new Timestamp(end.getTime())};
    }


}
