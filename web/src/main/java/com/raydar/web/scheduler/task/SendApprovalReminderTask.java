package com.raydar.web.scheduler.task;

import com.raydar.common.exception.RaydarException;
import com.raydar.queue.QueueProducer;
import org.apache.commons.collections.map.HashedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 12/9/2016.
 */
public class SendApprovalReminderTask {

    private static final Logger log = LoggerFactory.getLogger(SendApprovalReminderTask.class);

    private static final Integer companyID = 1;


    @Autowired
    private QueueProducer queueProducer;



    public void sendReminderEmail() throws RaydarException, IOException{

    }

    private void prepareAndSendRawData(Timestamp today, Integer companyID, Integer claimType) throws RaydarException, IOException{


    }

    private void sendEmailByApprovalLevel(Timestamp cutOffDate, Integer claimType)throws RaydarException{


    }

}
