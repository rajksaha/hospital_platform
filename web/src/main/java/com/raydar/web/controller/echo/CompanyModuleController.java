package com.raydar.web.controller.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.echo.CompanyModuleData;
import com.raydar.service.echo.CompanyModuleService;
import com.raydar.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 6/1/2016.
 */
@Controller
@RequestMapping("/companyModule")
public class CompanyModuleController extends BaseController {

    @Autowired
    private CompanyModuleService companyModuleService;


    @RequestMapping(value = {"/getAll"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAll(HttpServletRequest request) throws RaydarException {

        Map<String, Object> params = this.parseParameter(request);

        List<CompanyModuleData> dataList = this.companyModuleService.getByParam(params);

        return this.buildResultForGrid(dataList, dataList.size(), params);
    }


    @RequestMapping(value = {"/getAllCompanyModule"}, method = RequestMethod.GET)
    @ResponseBody
    public List<CompanyModuleData> getAllCompany(HttpServletRequest request) throws RaydarException {
        Map<String, Object> params = new HashMap<>();
        params.put("companyID", this.getEchoUserDetail().getUserProfilePermissionData().getCompanyID());
        return this.companyModuleService.getByParam(params);
    }


    @RequestMapping(value = {"/save"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> save(@RequestBody CompanyModuleData data) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        this.companyModuleService.create(data);
        return result;
    }

    @RequestMapping(value = {"/update"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> update(@RequestBody CompanyModuleData data) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        this.companyModuleService.update(data);
        return result;
    }

    @RequestMapping(value = "/delete/{companyModuleID}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("companyModuleID") Integer companyModuleID, HttpServletResponse httpResponse_p) throws RaydarException {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("companyModuleID",companyModuleID);
        this.companyModuleService.delete(param);
    }
}
