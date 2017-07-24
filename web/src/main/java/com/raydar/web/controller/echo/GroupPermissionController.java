package com.raydar.web.controller.echo;
import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.SearchData;
import com.raydar.mybatis.domain.user.PermissionData;
import com.raydar.mybatis.domain.user.UserGroupData;
import com.raydar.service.user.UserGroupService;
import com.raydar.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/7/2016.
 */
@Controller
@RequestMapping("/groupPermission")
public class GroupPermissionController extends BaseController{

    @Autowired
    private UserGroupService userGroupService;


    @RequestMapping(value = {"/getCompanyModulePermission"}, method = RequestMethod.POST)
    @ResponseBody
    public List<PermissionData> getCompanyModulePermission(@RequestBody SearchData data) throws RaydarException {

        Map<String, Object> params = new HashMap<String, Object>();

        params.put("userGroupID", data.getEntityID());
        params.put("companyID", data.getEntityType() == null ? this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID() : data.getEntityType());
        return this.userGroupService.getCompanyModulePermission(params);
    }

    @RequestMapping(value = {"/updateGroupPermission"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateGroupPermission(@RequestBody UserGroupData data) throws RaydarException {
        Map<String, Object> params = new HashMap<String, Object>();
        this.userGroupService.updateGroupPermission(data);
        params.put("status", true);
        return params;
    }
}
