package com.raydar.mybatis.persistence.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.user.ContentDetailData;
import com.raydar.mybatis.domain.user.UserData;

import javax.swing.plaf.PanelUI;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 4/29/2016.
 */
public interface ContentDetailMapper {


    public void create(ContentDetailData data) throws RaydarException;

    public void update(ContentDetailData data) throws RaydarException;

    public ContentDetailData getByID(Integer userProfileID) throws RaydarException;

    public List<ContentDetailData> getByParam(Map<String, Object> param) throws RaydarException;

    public List<ContentDetailData> getChildContentInfo(Map<String, Object> param) throws RaydarException;

    public void deleteByParam(Map<String, Object> param) throws RaydarException;

    public List<UserData> getDuplicateApprover(Map<String, Object> param) throws RaydarException;
}
