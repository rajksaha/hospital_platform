package com.raydar.mybatis.domain;

import com.raydar.mybatis.domain.echo.CompanyData;
import com.raydar.mybatis.domain.user.UserProfilePermissionData;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

/**
 * Created by raj on 3/20/2016.
 */
public class EchoUserDetail extends User{

    public EchoUserDetail (String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    private UserProfilePermissionData userProfilePermissionData;

    private CompanyData companyData;

    public UserProfilePermissionData getUserProfilePermissionData() {
        return userProfilePermissionData;
    }

    public void setUserProfilePermissionData(UserProfilePermissionData userProfilePermissionData) {
        this.userProfilePermissionData = userProfilePermissionData;
    }

    public CompanyData getCompanyData() {
        return companyData;
    }

    public void setCompanyData(CompanyData companyData) {
        this.companyData = companyData;
    }
}
