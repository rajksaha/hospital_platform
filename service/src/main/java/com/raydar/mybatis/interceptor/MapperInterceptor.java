package com.raydar.mybatis.interceptor;

import com.raydar.common.audit.Auditable;
import com.raydar.common.audit.CallerPrinciple;
import com.raydar.common.exception.RaydarException;
import com.raydar.common.utility.JsonConverter;
import com.raydar.context.AppContextManager;
import com.raydar.mybatis.domain.Audit;
import com.raydar.mybatis.domain.BaseData;
import com.raydar.mybatis.domain.eclaim.ClaimAuditData;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Properties;

/**
 * Created by raj on 4/22/16.
 */
@Intercepts({@Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class})})
public class MapperInterceptor implements Interceptor {

    private static final Logger log = LoggerFactory.getLogger(MapperInterceptor.class);

    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    public void setProperties(Properties properties) {
    }

    public Object intercept(Invocation invocation) throws Throwable {
        this.setBaseValue(invocation.getArgs());
        Object proceedObj = invocation.proceed();
        return proceedObj;
    }

    private void setBaseValue(Object[] args) {

        MappedStatement stmt = null;
        Object paramObj = null;
        stmt = (MappedStatement) args[0];
        paramObj = args[1];
        if (paramObj instanceof BaseData) {
            ((BaseData) paramObj).setCreatedOn(new Timestamp(new Date().getTime()));
            ((BaseData) paramObj).setUpdatedOn(new Timestamp(new Date().getTime()));
            ((BaseData) paramObj).setCreatedBy(CallerPrinciple.getUsername());
            ((BaseData) paramObj).setUpdatedBy(CallerPrinciple.getUsername());
        }
    }

    private void handleAudit(Object[] args) {
        MappedStatement stmt = null;
        Object paramObj = null;
        try {
            stmt = (MappedStatement) args[0];
            paramObj = args[1];

            if (!isAuditable(paramObj)) {
                return;
            }
            Auditable auditData = (Auditable) paramObj;
            this.createAudit(stmt, auditData);
        } catch (Exception ex) {
            log.error("Error creating audit " + (stmt != null ? ("for statement: " + stmt.getId()) : ""), ex);
        }
    }

    private void createAudit(MappedStatement stmt, Auditable auditData) throws RaydarException {
        Audit audit = new Audit();
        String jsonValue = JsonConverter.convertObjectToJson(auditData);

        audit.setEntityName(auditData.getEntityName());
        audit.setEntityId(auditData.getEntityId());
        audit.setAuditType(stmt.getSqlCommandType().name());
        audit.setAuditValue(jsonValue);
        audit.setQueryName(stmt.getId());
        audit.setPerformedBy(0); // TODO: set user id
        audit.setPerformedOn(new Timestamp(new Date().getTime()));

        ApplicationContext applicationContext = AppContextManager.getAppContext();
        /*AuditMapper auditMapper = applicationContext.getBean(AuditMapper.class);
        auditMapper.create(audit);*/
    }

    private boolean isAuditable(Object paramObj) {
        if (!(paramObj instanceof Auditable)) {
            return false;
        }
        if (paramObj instanceof BaseData) {
            if (((BaseData) paramObj).getSkipAudit() != null && ((BaseData) paramObj).getSkipAudit()) {
                return false;
            }
        }

        return true;
    }
}
