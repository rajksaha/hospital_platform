package com.raydar.web.controller;

import com.raydar.common.exception.RaydarException;
import com.raydar.common.type.EntityType;
import com.raydar.mybatis.domain.user.ContentDetailData;
import com.raydar.service.ContentDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 4/29/2016.
 */

@Controller
@RequestMapping("/contentDetail")
public class ContentDetailController extends BaseController{

    @Autowired
    private ContentDetailService contentDetailService;

    @RequestMapping(value = {"/getContent"}, method = RequestMethod.POST)
    @ResponseBody
    public List<ContentDetailData> getContent(@RequestBody ContentDetailData data) throws RaydarException {

        Map<String, Object> param = new HashMap<>();
        param.put("entityType", data.getEntityType());
        param.put("orderByShortName", true);
        param.put("entityID", data.getEntityID());
        try {
            List<ContentDetailData> contentDetailList = this.contentDetailService.getByParam(param);
            return contentDetailList;
        }catch (Exception e){
            return null;
        }
    }

    @RequestMapping(value = {"/save"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> save(@RequestBody ContentDetailData data) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        this.contentDetailService.create(data);
        return result;
    }

    @RequestMapping(value = {"/update"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> update(@RequestBody ContentDetailData data) throws RaydarException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);

        this.contentDetailService.update(data);
        return result;
    }
}
