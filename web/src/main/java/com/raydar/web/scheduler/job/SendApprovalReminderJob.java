package com.raydar.web.scheduler.job;

import com.raydar.common.utility.EchoProperties;
import com.raydar.web.scheduler.task.SendApprovalReminderTask;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.StatefulJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;


/**
 * Created by raj on 12/9/2016.
 */
public class SendApprovalReminderJob extends QuartzJobBean implements StatefulJob {

    private static final Logger log = LoggerFactory.getLogger(SendApprovalReminderJob.class);


    private SendApprovalReminderTask approvalReminderTask;

    public void setApprovalReminderTask(SendApprovalReminderTask approvalReminderTask) {
        this.approvalReminderTask = approvalReminderTask;
    }

    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        try {
            if(EchoProperties.INSTANCE.getProperty("development.mode.scheduler").toString().equalsIgnoreCase("true")){
                this.approvalReminderTask.sendReminderEmail();
            }
        } catch (Exception e) {
            log.error("Error in job execution...");
        }
    }
}
