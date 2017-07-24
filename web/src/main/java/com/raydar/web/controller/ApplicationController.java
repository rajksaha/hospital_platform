package com.raydar.web.controller;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.EchoUserDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Handles requests for the application initial context datas.
 */
@Controller
public class ApplicationController extends BaseController {

/*    @Autowired
    private UserService  userService;*/

    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationController.class);

    @RequestMapping(value = {"/application/data"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAppData(HttpServletRequest request) throws RaydarException {

        Map<String, Object> result = new HashMap<String, Object>();

        EchoUserDetail echoUserDetail = this.getEchoUserDetail();

        Collection<GrantedAuthority> permissions = echoUserDetail.getAuthorities();
        Iterator<GrantedAuthority> it = permissions.iterator();
        Map<String, Boolean> perm = new HashMap<String, Boolean>();
        while (it.hasNext()) {
            String key = it.next().toString();
            perm.put(key, true);
        }
        echoUserDetail.getUserProfilePermissionData().setPermissions(perm);
        result.put("userData",echoUserDetail.getUserProfilePermissionData());
        return result;
    }


}
