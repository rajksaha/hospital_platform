package com.raydar.queue;

import com.raydar.common.type.QueueConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.AmqpTemplate;

/**
 * Created by Mamun on 8/17/2016.
 */
public class QueueProducer {

    private static final Logger log = LoggerFactory.getLogger(QueueProducer.class);

    private AmqpAdmin amqpAdmin;
    private AmqpTemplate amqpTemplate;

    public QueueProducer(AmqpAdmin amqpAdmin, AmqpTemplate amqpTemplate) {
        this.amqpAdmin = amqpAdmin;
        this.amqpTemplate = amqpTemplate;
    }

    public void sendObject(QueueConfig queueConfig, Object queueObject) {
        log.debug("Sending message : " + queueObject + " to queue : " + queueConfig.getQueueName());
        amqpTemplate.convertAndSend(queueConfig.getQueueName(), queueObject);
    }
}
