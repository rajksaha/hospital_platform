package com.raydar.common.utility;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.sql.Time;
import java.text.SimpleDateFormat;


public class TimeSerializer extends JsonSerializer<Time> {
    @Override
    public void serialize(Time value, JsonGenerator gen, SerializerProvider arg) throws IOException {

        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
        String formattedDate = formatter.format(value);

        gen.writeString(formattedDate);

    }
}