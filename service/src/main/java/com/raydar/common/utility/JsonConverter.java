package com.raydar.common.utility;

import com.google.gson.*;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class JsonConverter {

    /**
     * Converts JSON string to object
     *
     * @param <T>
     * @param jsonString
     * @param type
     * @return object converted from JSON string
     */
    public static <T> T convertJsonToObject(String jsonString, Class<T> type) {
        return convertJsonToObject(jsonString, type, null);
    }

    /**
     * Converts JSON string to object
     *
     * @param <T>
     * @param jsonString
     * @param type
     * @param dateFormat
     * @return
     */
    public static <T> T convertJsonToObject(String jsonString, Class<T> type, String dateFormat) {
        if (StringUtils.isEmpty(jsonString))
            return null;
        Gson gson = new GsonBuilder().create();
        //System.out.println("Converting to data object for Json:"+jsonString);
        T t = type.cast(gson.fromJson(jsonString, type));
        return t;
    }

    /**
     * Converts Java object to JSON string
     *
     * @param obj
     * @return json string
     */
    public static String convertObjectToJson(Object obj) {
        String result = null;
        Gson gson = new GsonBuilder().disableHtmlEscaping().create();
        result = gson.toJson(obj);
        return result;
    }

    /**
     * Converts Java list to JSON string
     *
     * @param list
     * @return json string
     */
    public static String convertListToJson(List list, boolean prettyPrint) {
        String result = null;
        Gson gson = null;
        if (prettyPrint)
            gson = new GsonBuilder().setPrettyPrinting().create();
        else
            gson = new GsonBuilder().disableHtmlEscaping().create();
        result = gson.toJson(list);
        return result;
    }

    /**
     * Converts JSON string to list of Java objects
     *
     * @param <T>
     * @param jsonString
     * @param type
     * @return list of Java objects
     */
    public static <T> List<T> convertJsonToList(String jsonString, Class<T> type) {
        Gson gson = new GsonBuilder().create();
        JsonParser parser = new JsonParser();
        JsonArray array = parser.parse(jsonString).getAsJsonArray();
        List<T> list = new ArrayList<T>();
        for (final JsonElement json : array) {
            T entity = gson.fromJson(json, type);
            list.add(entity);
        }
        return list;
    }

}
