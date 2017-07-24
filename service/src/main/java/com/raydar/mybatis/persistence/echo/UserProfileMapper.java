package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.UserProfileData;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 4/28/2016.
 */
public interface UserProfileMapper {


    public void create(UserProfileData userProfileData) throws RaydarException;

    public void update(UserProfileData userProfileData) throws RaydarException;

    public UserProfileData getUserProfileByID(Integer userID) throws RaydarException;

    public List<UserProfileData> getUserProfileByParam(Map<String, Object> param) throws RaydarException;

    public Integer getUserCountByParam(Map<String, Object> param) throws RaydarException;
}
