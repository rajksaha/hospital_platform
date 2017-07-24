package com.raydar.common.utility;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;


public class CommonUtils {

    public static String getHomeUrl(HttpServletRequest req) {
        String scheme = req.getScheme(); // http
        String serverName = req.getServerName(); // hostname.com
        int serverPort = req.getServerPort(); // 80
        String contextPath = req.getContextPath(); // /mywebapp


        // Reconstruct original requesting URL
        StringBuffer url = new StringBuffer();
        url.append(scheme).append("://").append(serverName);

        if ((serverPort != 80) && (serverPort != 443)) {
            url.append(":").append(serverPort);
        }

        url.append(contextPath);

        return url.toString();
    }


    public static String getContentBaseURL(HttpServletRequest req) {
        String scheme = req.getScheme(); // http
        String serverName = req.getServerName(); // hostname.com
        int serverPort = req.getServerPort(); // 80

        // Reconstruct original requesting URL
        StringBuffer url = new StringBuffer();
        url.append(scheme).append("://").append(serverName);

        if ((serverPort != 80) && (serverPort != 443)) {
            url.append(":").append(serverPort);
        }

        url.append("/content");

        return url.toString();
    }

    public static boolean hasCSVHeaderError(String[] fixedHeader, String[] header) {
        boolean error = true;
        if (header != null && fixedHeader != null) {
            if (header.length == fixedHeader.length) {
                for (int i = 0; i < header.length; i++) {
                    if (!header[i].trim().equalsIgnoreCase(fixedHeader[i])) {
                        error = true;
                        break;
                    }
                    error = false;
                }
            } else {
                error = true;
            }
        }
        return error;
    }

    public static boolean hasNullValueInCSV(String[] row) {
        boolean error = false;
        System.out.println("row : " + Arrays.toString(row));
        for (int i = 0; i < row.length; i++) {
            System.out.println("row[" + i + "] : " + row[i]);
            if (row[i] == null || row[i].equalsIgnoreCase("")) {
                error = true;
                System.out.println(row[i]);
            }
        }
        return error;
    }

}
