package com.raydar.web.controller.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.UserGroupData;
import com.raydar.service.user.UserGroupService;
import com.raydar.web.controller.BaseController;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/1/2016.
 */
@Controller
@RequestMapping("/userGroup")
public class UserGroupController extends BaseController {

    @Autowired
    private UserGroupService userGroupService;


    @RequestMapping(value = {"/getAll"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAll(HttpServletRequest request) throws RaydarException {

        Map<String, Object> params = this.parseParameter(request);

        params.put("companyID", this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID());
        List<UserGroupData> dataList = this.userGroupService.getByParam(params);

        Integer count = this.userGroupService.getCountByParam(params);

        return this.buildResultForGrid(dataList, count, params);
    }

    @RequestMapping(value = {"/getGroupByCompanyID/companyID/{companyID}"}, method = RequestMethod.GET)
    @ResponseBody
    public List<UserGroupData> getGroupByCompanyID(@PathVariable("companyID") Integer companyID, HttpServletRequest request) throws RaydarException{

        Map<String, Object> params = new HashMap<String, Object>();
        if(companyID == 0){
            companyID = this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID();
        }
        params.put("companyID", companyID);
        List<UserGroupData> dataList = this.userGroupService.getByParam(params);

        return dataList;
    }

    @RequestMapping(value = {"/getAllUserGroup"}, method = RequestMethod.GET)
    @ResponseBody
    public List<UserGroupData> getAllCompany(HttpServletRequest request) throws RaydarException {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("companyID", this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID());
        return this.userGroupService.getByParam(params);
    }

    @RequestMapping(value = {"/save"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> save(@RequestBody UserGroupData data) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        this.userGroupService.create(data);
        return result;
    }

    @RequestMapping(value = {"/update"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> update(@RequestBody UserGroupData data) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        this.userGroupService.update(data);
        return result;
    }

    /*@RequestMapping(value = "/delete/{companyID}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("companyID") Integer companyID, HttpServletResponse httpResponse_p) throws RaydarException {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("companyID",companyID);
        this.userGroupService.delete(param);
    }*/
}
