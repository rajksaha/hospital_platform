package com.raydar.common.exception;

/**
 * Created by raj on 4/2/2016.
 */
public class RaydarException extends Exception {

    public RaydarException (String message){
        super(message);
    }

    public RaydarException (String message, Throwable th){
        super(message, th);
    }
}
