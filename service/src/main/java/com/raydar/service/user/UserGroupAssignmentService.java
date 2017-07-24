package com.raydar.service.user;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.UserGroupAssignmentData;
import com.raydar.mybatis.domain.user.UserGroupData;
import com.raydar.mybatis.domain.user.UserProfileData;
import com.raydar.mybatis.persistence.echo.UserGroupAssignmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/3/2016.
 */
@Service
public class UserGroupAssignmentService {

    @Autowired
    private UserGroupAssignmentMapper userGroupAssignmentMapper;

    public void create(UserGroupAssignmentData data) throws RaydarException {
        this.userGroupAssignmentMapper.create(data);
    }

    public void update(UserGroupAssignmentData data) throws RaydarException{
        this.userGroupAssignmentMapper.update(data);
    }

    public void deleteByUserID(Integer userID) throws RaydarException{
        this.userGroupAssignmentMapper.deleteByUserID(userID);
    }

    public UserGroupAssignmentData getByID(Integer ID) throws RaydarException{
        return this.userGroupAssignmentMapper.getByID(ID);
    }

    public List<UserGroupAssignmentData> getByParam(Map<String, Object> param) throws RaydarException{
        return this.userGroupAssignmentMapper.getByParam(param);
    }

    public void updateUserGroupAssignment(UserProfileData userProfileData)throws RaydarException{

        this.deleteByUserID(userProfileData.getUserID());

        for(UserGroupData group : userProfileData.getUserGroupList()){
            if(group.getIsAssigned() != null && group.getIsAssigned()){
                UserGroupAssignmentData assignmentData = new UserGroupAssignmentData();
                assignmentData.setUserGroupID(group.getUserGroupID());
                assignmentData.setUserID(userProfileData.getUserID());
                assignmentData.setStatus(1);
                this.create(assignmentData);
            }
        }
    }

}
