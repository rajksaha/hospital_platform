package com.raydar.web.security;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.EchoUserDetail;
import com.raydar.mybatis.domain.echo.CompanyData;
import com.raydar.mybatis.domain.user.UserData;
import com.raydar.mybatis.domain.user.GroupPermissionData;
import com.raydar.mybatis.domain.user.UserProfileData;
import com.raydar.mybatis.domain.user.UserProfilePermissionData;
import com.raydar.service.UserPermissionService;
import com.raydar.service.echo.CompanyService;
import com.raydar.service.user.UserService;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.sql.Timestamp;
import java.util.*;


public class EchoUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {


    @Value("${login.fail.count}")
    private Integer failAttemptMaxCount;

    @Autowired
    private UserService userService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserPermissionService userPermissionService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserData userData = null;
        EchoUserDetail echoUserDetail = null;

        List<GroupPermissionData> rolesPermissions = new ArrayList<GroupPermissionData>();
        try {
            userData = userService.getUserByUserName(username);

            if (userData == null || userData.getUserID() == null || userData.getUserID().equals(0)) {
                throw new BadCredentialsException("Invalid username entered");
            }

            if (userData.getStatus() == null || userData.getStatus().equals(0)) {
                if(userData.getUserProfileData() != null && userData.getUserProfileData().getLastWorkingDay() != null){
                    Timestamp toDay = new Timestamp(new Date().getTime());
                    Date date = DateUtils.truncate(new Date(), Calendar.DATE);
                    Date lastDate = new Date(userData.getUserProfileData().getLastWorkingDay().getTime());
                    if(date.compareTo(lastDate) > 0){
                        throw new BadCredentialsException("Your account is deactivated. Please contact with administrator");
                    }
                }else{
                    throw new BadCredentialsException("Your account is deactivated. Please contact with administrator");
                }
            }

            if (BooleanUtils.toBoolean(userData.getIsBlocked())) {
                throw new BadCredentialsException("Your account has been blocked. Please contact with administrator");
            }

            List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();

            if (userData.getCompanyID() == null && userData.getUserID() == 1) {
                grantedAuths.add(new SimpleGrantedAuthority("SUPER_ADMIN"));
            } else {

                rolesPermissions = userPermissionService.getUserPermissionByUserID(userData.getUserID());

                if (rolesPermissions != null && rolesPermissions.size() > 0) {
                    for (GroupPermissionData role : rolesPermissions) {
                        grantedAuths.add(new SimpleGrantedAuthority(role.getFunctionCode()));
                    }
                } else {
                    throw new BadCredentialsException("No Permission is assigned to this user");
                }


            }


            UserProfilePermissionData userProfilePermissionData = new UserProfilePermissionData();
            echoUserDetail  = new EchoUserDetail(userData.getUserName(), userData.getPassword(), grantedAuths);
            userProfilePermissionData.setUserID(userData.getUserID());
            userProfilePermissionData.setUserName(userData.getUserName());
            userProfilePermissionData.setCompanyID(userData.getCompanyID());
            userProfilePermissionData.setStatus(userData.getStatus());
            userProfilePermissionData.setGroupPermissionDataList(rolesPermissions);
            echoUserDetail.setUserProfilePermissionData(userProfilePermissionData);
            UserProfileData data = this.userService.getUserProfileByID(userData.getUserID());
            userProfilePermissionData.setProfileData(data);

            if (userData.getCompanyID() != null && userData.getUserID() != 1) {
                Map<String, Object> param = new HashMap<>();
                param.put("companyID", userData.getCompanyID());
                CompanyData companyData = companyService.getByID(userData.getCompanyID());


                echoUserDetail.setCompanyData(companyData);
            }



        }catch (RaydarException e){

        }


        return echoUserDetail;
    }

}
