package com.raydar.common.utility;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


public class TimeDeSerializer extends JsonDeserializer<Time> {

    @Override
    public Time deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm");
        String date = jp.getText();
        if (StringUtils.isNotBlank(date)) {
            try {
                Date parseDate = format.parse(date);
                Time time = new Time(parseDate.getTime());
                return time;
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        } else {
            return null;
        }
    }
}