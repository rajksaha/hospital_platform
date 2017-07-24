package com.raydar.web.interceptor;

import com.raydar.common.audit.CallerPrinciple;
import com.raydar.mybatis.domain.EchoUserDetail;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by raj on 4/22/16.
 */
public class RestInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth != null && auth.getPrincipal() != null && auth.getPrincipal() instanceof EchoUserDetail){
			EchoUserDetail authUser = (EchoUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			CallerPrinciple.setUser(authUser);
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request,HttpServletResponse response, Object handler, Exception ex)throws Exception {
		
	}

}