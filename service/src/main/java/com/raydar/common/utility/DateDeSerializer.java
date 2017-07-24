package com.raydar.common.utility;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


public class DateDeSerializer extends JsonDeserializer<Date> {

    @Override
    public Date deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        String date = jp.getText();
        if (StringUtils.isNotBlank(date)) {
            try {
                return format.parse(date);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        } else {
            return null;
        }
    }
}