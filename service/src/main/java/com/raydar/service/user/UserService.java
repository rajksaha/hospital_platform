package com.raydar.service.user;

import com.raydar.common.type.EmailType;
import com.raydar.common.type.QueueConfig;
import com.raydar.common.utility.JsonConverter;
import com.raydar.common.utility.PasswordEncryptor;
import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.UserData;
import com.raydar.mybatis.domain.user.UserGroupAssignmentData;
import com.raydar.mybatis.domain.user.UserProfileData;
import com.raydar.mybatis.persistence.echo.UserGroupAssignmentMapper;
import com.raydar.mybatis.persistence.echo.UserMapper;
import com.raydar.mybatis.persistence.echo.UserProfileMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.raydar.queue.QueueProducer;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.*;

/**
 * Created by raj on 4/20/2016.
 */

@Service
public class UserService {


    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserProfileMapper userProfileMapper;

    @Autowired
    private QueueProducer queueProducer;

    @Autowired
    private UserGroupAssignmentMapper userGroupAssignmentMapper;


    public UserData getUserByUserName(String userName) throws RaydarException {
        return this.userMapper.getUserByUserName(userName);
    }

    public void updatePassword(UserData userData) throws RaydarException {

        PasswordEncryptor encryptor = new PasswordEncryptor();
        userData.setPassword(encryptor.encrypt(userData.getPassword()));
        this.userMapper.updatePassword(userData);
    }

    public void updateStatus(UserData userData) throws RaydarException {
        this.userMapper.updateStatus(userData);
    }

    public void update(UserData userData) throws RaydarException {
        this.userMapper.update(userData);
    }

    public void create(UserData userData) throws RaydarException {
        this.userMapper.create(userData);
    }

    public UserProfileData getUserProfileByID(Integer userID) throws RaydarException {
        UserProfileData userProfileData = this.userProfileMapper.getUserProfileByID(userID);


        return userProfileData;
    }

    public void createUserProfile(UserProfileData userProfileData, Integer companyID) throws RaydarException {


        UserData userData = new UserData();
        userData.setUserName(userProfileData.getUserName());
        userData.setCompanyID(companyID);
        String defaultPassword = "123456";
        PasswordEncryptor encryptor = new PasswordEncryptor();
        userData.setPassword(encryptor.encrypt(defaultPassword));
        userData.setStatus(2);
        userData.setIsBlocked(false);

        this.create(userData);

        userProfileData.setUserID(userData.getUserID());
        this.userProfileMapper.create(userProfileData);

        if(userProfileData.getUserType() == 1){
            UserGroupAssignmentData userGroupAssignmentData = new UserGroupAssignmentData();
            userGroupAssignmentData.setUserID(userData.getUserID());
            userGroupAssignmentData.setUserGroupID(2);
            userGroupAssignmentData.setStatus(1);
            userGroupAssignmentMapper.create(userGroupAssignmentData);
        }
    }

    public void updateUserProfile(UserProfileData userProfileData) throws RaydarException {
        this.userProfileMapper.update(userProfileData);
    }

    public List<UserProfileData> getUserProfileByParam(Map<String, Object> param) throws RaydarException {
        return this.userProfileMapper.getUserProfileByParam(param);
    }

    public Integer getUserCountByParam(Map<String, Object> param) throws RaydarException {
        return this.userProfileMapper.getUserCountByParam(param);
    }

    public Map<String, Object> requestForPasswordReset(String userName, String url) throws RaydarException {


        Map<String, Object> result = new HashMap<String, Object>();
        result.put("hasError", false);
        result.put("message", "Password reset email send successfully, please check ur email");

        if (StringUtils.isNotBlank(userName)) {
            UserData userData = this.userMapper.getUserByUserName(userName);

            if (userData == null) {
                result.put("hasError", true);
                result.put("message", "No User exist with that username");
            } else {
                if(userData.getStatus() != null && userData.getStatus() == 1 || userData.getStatus() == 2){
                    sendResetPasswordEmail(userData,result,url);
                }else{
                    result.put("hasError", true);
                    result.put("message", "Your account is inactive.Please contact to System Admin.");
                }
            }
        }
        return result;
    }


    private Map<String, Object> sendResetPasswordEmail(UserData userData, Map<String, Object> result, String url)throws RaydarException{

        UserProfileData userProfileData = this.userProfileMapper.getUserProfileByID(userData.getUserID());
        if(userProfileData.getEmailAddress() != null){

            String secretKey = UUID.randomUUID().toString();
            userData.setSecretKey(secretKey);
            userData.setSecretKeyCreatedOn(new Timestamp(new java.util.Date().getTime()));
            this.userMapper.update(userData);
            try{
                Map<String, Object> queueParam = new HashMap<>();
                queueParam.put("emailType", EmailType.PASSWORD_RESET.name());
                queueParam.put("username", userData.getUserName());
                queueParam.put("url", url);
                queueParam.put("email", userProfileData.getEmailAddress());
                //queueParam.put("email", "raj.gmk@gmail.com");
                queueProducer.sendObject(QueueConfig.EMAIL_QUEUE, queueParam);
            }catch (Exception e){
                result.put("hasError", true);
                result.put("message", "Profile has no email address.");
            }


        }else{
            result.put("hasError", true);
            result.put("message", "Profile has no email address.");
        }



        return result;
    }

    public Map<String, Object> requestForPasswordReset(UserData userData) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("hasError", false);
        result.put("message", "Password reset email send successfully, please check ur email");

        Map<String, Object> queryParam = new HashMap<String, Object>();
        queryParam.put("secretKey", userData.getSecretKey());
        List<UserData> listUser = this.userMapper.getUserByParam(queryParam);
        if(CollectionUtils.isNotEmpty(listUser)){

            UserData dbUser = listUser.get(0);
            dbUser.setPassword(PasswordEncryptor.encrypt(userData.getPassword()));
            dbUser.setSecretKey(null);
            dbUser.setSecretKeyCreatedOn(null);
            this.userMapper.update(dbUser);

        }else{
            result.put("hasError", true);
            result.put("message", "This Password reset email has been expired, Please Try again");
        }
        return result;
    }


}
