package com.raydar.web.controller;

import com.raydar.common.exception.RaydarException;
import com.raydar.common.type.EmailType;
import com.raydar.common.type.QueueConfig;
import com.raydar.mybatis.domain.SearchData;
import com.raydar.mybatis.domain.otc.*;
import com.raydar.mybatis.domain.user.UserData;
import com.raydar.mybatis.domain.user.UserProfileData;
import com.raydar.queue.QueueProducer;
import com.raydar.service.user.UserService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * Handles requests for the application front page for non login users.
 */
@Controller
public class LoginController extends BaseController{

    @Autowired
    private UserService userService;





    private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);


    @RequestMapping(value = "login/authenticate", method = RequestMethod.POST)
    @ResponseBody
    public String authenticate() throws Exception {
        return "success";
    }

    @RequestMapping(value = "logout", method = RequestMethod.GET)
    @ResponseBody
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "success";
    }



    @RequestMapping(value = {"login/resetPassword"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> sendResetPasswordMail(@RequestBody UserData userData, HttpServletRequest request, HttpServletResponse response) throws RaydarException {
        return this.userService.requestForPasswordReset(userData.getUserName(), this.getURL(request));
    }

    @Autowired
    private QueueProducer queueProducer;
    @RequestMapping(value = "login/test_email", method = RequestMethod.GET)
    @ResponseBody
    public String testEmail(@RequestParam("email") String email, HttpServletRequest request, HttpServletResponse response) {

            /*String scheme = request.getScheme();
            String serverName = request.getServerName();
            int serverPort = request.getServerPort();
            String contextPath = request.getContextPath();
            String servletPath = request.getServletPath();
            String pathInfo = request.getPathInfo();
            String queryString = request.getQueryString(); // d=789 //
             URL StringBuilder url = new StringBuilder(); url.append(scheme).append("://").append(serverName); if (serverPort != 80 && serverPort != 443) { url.append(":").append(serverPort); } url.append(contextPath).append(servletPath); if (pathInfo != null) { url.append(pathInfo); } if (queryString != null) { url.append("?").append(queryString); } return url.toString(); }

        Map<String, Object> queueParam = new HashMap<>();
        queueParam.put("emailType", EmailType.TEST_USER.name());
        queueParam.put("username", "echoAdmin");
        queueParam.put("email", email);
        queueProducer.sendObject(QueueConfig.EMAIL_QUEUE, queueParam);*/
        return "sent";
    }

    @RequestMapping(value = {"login/updateUserPasswordByKey"}, method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateUserPasswordByKey(@RequestBody UserData userData) throws RaydarException {
        return this.userService.requestForPasswordReset(userData);
    }



}
