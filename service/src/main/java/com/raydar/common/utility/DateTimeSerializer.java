package com.raydar.common.utility;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeSerializer extends JsonSerializer<Date> {
    @Override
    public void serialize(Date value, JsonGenerator gen, SerializerProvider arg) throws IOException {

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm a");
        String formattedDate = formatter.format(value);

        gen.writeString(formattedDate);

    }
}