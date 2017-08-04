package com.raydar.web.controller.user;

import com.google.gson.Gson;
import com.raydar.common.exception.RaydarException;
import com.raydar.common.utility.JsonConverter;
import com.raydar.mybatis.domain.SearchData;
import com.raydar.mybatis.domain.user.UserData;
import com.raydar.mybatis.domain.user.UserGroupData;
import com.raydar.mybatis.domain.user.UserProfileData;
import com.raydar.service.user.UserGroupAssignmentService;
import com.raydar.service.user.UserGroupService;
import com.raydar.service.user.UserService;
import com.raydar.web.controller.BaseController;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by raj on 5/3/2016.
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserGroupService userGroupService;

    @Autowired
    private UserGroupAssignmentService userGroupAssignmentService;


    @RequestMapping(value = {"/getAll"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAll(HttpServletRequest request) throws RaydarException{


        Map<String, Object> params = this.parseParameter(request);
            if(this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID() == null){
            if(params.get("companyID") == null){
                params.put("companyID", -1);
            }else{
                params.put("companyID", params.get("companyID"));
            }
        }else{
            params.put("companyID", this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID());
        }

        List<UserProfileData> dataList = this.userService.getUserProfileByParam(params);
        Integer count = this.userService.getUserCountByParam(params);
        return this.buildResultForGrid(dataList, count, params);
    }

    @RequestMapping(value = {"/getItemForTypeHead/data/{data}"}, method = RequestMethod.GET)
    @ResponseBody
    public List<UserProfileData> getItemForTypeHead(@PathVariable("data") String data, HttpServletRequest request) throws RaydarException {

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("companyID", this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID());
        params.put("likeStaffCode", data);
        params.put("limit", 20);
        List<UserProfileData> temp = this.userService.getUserProfileByParam(params);
        return temp;
    }

    @RequestMapping(value = {"/getUserProfile/userID/{userID}"}, method = RequestMethod.GET)
    @ResponseBody
    public UserProfileData getUserProfile(@PathVariable("userID") Integer userID, HttpServletRequest request) throws RaydarException {
        return this.userService.getUserProfileByID(userID);
    }

    @RequestMapping(value = {"/updateUserPassword"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateUserPassword(@RequestBody UserData userData) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        this.userService.updatePassword(userData);
        userData.setStatus(1);
        updateUserStatus(userData);
        return result;
    }


    @RequestMapping(value = {"/updateUserStatus"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateUserStatus(@RequestBody UserData userData) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        this.userService.updateStatus(userData);
        this.getEchoUserDetail().getUserProfilePermissionData().setStatus(userData.getStatus());
        return result;
    }

    @RequestMapping(value = {"/save"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> save(@RequestBody UserProfileData data) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        Integer companyID = data.getCompanyID();
        if(companyID == null){
            companyID = this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID();
        }
        this.userService.createUserProfile(data, companyID);
        return result;
    }


    @RequestMapping(value = {"/update"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> update(@RequestBody UserProfileData data) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);


        this.userService.updateUserProfile(data);
        UserData userData = new UserData();
        userData.setStatus(data.getStatus());
        userData.setUserID(data.getUserID());
        this.userService.updateStatus(userData);
        return result;
    }

    @RequestMapping(value = {"/getUserGroupForUser"}, method = RequestMethod.POST)
    @ResponseBody
    public List<UserGroupData> getUserGroupForUser(@RequestBody SearchData data) throws RaydarException{

        Map<String, Object> params = new HashMap<String, Object>();

        params.put("userID", data.getUserID());
        params.put("companyID", this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID());
        return this.userGroupService.getUserGroupForUser(params);
    }

    @RequestMapping(value = {"/updateUserGroupAssignment"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateUserGroupAssignment(@RequestBody UserProfileData data) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        /*if(isDuplicate(categoryDATA)) {
            result.put("success", false);
            result.put("message", "Duplicate category name exists");
            return result;
        }*/
        //data.setC`
        this.userGroupAssignmentService.updateUserGroupAssignment(data);
        return result;
    }
}
