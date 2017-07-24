package com.raydar.common.utility;

import com.raydar.common.exception.RaydarException;

/**
 * Created by raj on 4/28/2016.
 */
public class PasswordEncryptor {

    public static String encrypt(String pwd) throws RaydarException {

        try{

            java.security.MessageDigest digest = null;
            digest = java.security.MessageDigest.getInstance("SHA-1");
            digest.reset();
            digest.update(pwd.getBytes("UTF-8"));
            return byteArrayToHexString(digest.digest());

        }catch (Exception e){

        }

        return null;

    }

    public static String byteArrayToHexString(byte[] b) {
        String result = "";
        for (int i=0; i < b.length; i++) {
            result +=Integer.toString( ( b[i] & 0xff ) + 0x100, 16).substring( 1 );
        }
        return result;
    }
}
