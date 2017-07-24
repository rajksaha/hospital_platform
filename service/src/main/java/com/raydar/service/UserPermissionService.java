package com.raydar.service;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.GroupPermissionData;
import com.raydar.mybatis.persistence.echo.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by raj on 3/19/2016.
 */
@Service
public class UserPermissionService {

    @Autowired
    private UserMapper userMapper;

    public List<GroupPermissionData> getUserPermissionByUserID (Integer userID) throws RaydarException {
        return userMapper.getUserPermissionByUserID(userID);
    }
}
