package com.raydar.queue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.amqp.support.converter.SerializerMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.backoff.ExponentialBackOffPolicy;
import org.springframework.retry.support.RetryTemplate;

/**
 * Created by Mamun on 8/17/2016.
 */
@Configuration
public class QueueConfiguration {

    private static final Logger log = LoggerFactory.getLogger(QueueConfiguration.class);

    @Value("${amqp.host}")
    private String host;

    @Value("${amqp.port}")
    private int port;

    @Value("${amqp.username}")
    private String username;

    @Value("${amqp.password}")
    private String password;

    @Value("${amqp.vhost}")
    private String vhost;

    @Value("${amqp.maxConsumer}")
    private int maxConsumer;


    public ConnectionFactory connectionFactory() {
        log.debug("AMQP CONNECTION:" + host + ":" + port + ":" + vhost);
        CachingConnectionFactory cf = new CachingConnectionFactory(host, port);
        cf.setUsername(username);
        cf.setPassword(password);
        cf.setVirtualHost(vhost);
        return cf;
    }

    public AmqpAdmin amqpAdmin() {
        return new RabbitAdmin(connectionFactory());
    }

    public AmqpTemplate amqpTemplate() {
        RabbitTemplate template = new RabbitTemplate(connectionFactory());
        RetryTemplate retryTemplate = new RetryTemplate();
        ExponentialBackOffPolicy backOffPolicy = new ExponentialBackOffPolicy();
        backOffPolicy.setInitialInterval(500);
        backOffPolicy.setMultiplier(10.0);
        backOffPolicy.setMaxInterval(10000);
        retryTemplate.setBackOffPolicy(backOffPolicy);
        template.setRetryTemplate(retryTemplate);
        template.setMessageConverter(serializerMessageConverter());
        return template;
    }

    @Bean
    public MessageConverter serializerMessageConverter() {
        return new SerializerMessageConverter();
    }

    @Bean
    public QueueProducer queueProducer() {
        return new QueueProducer(amqpAdmin(), amqpTemplate());
    }

    public int getMaxConsumer() {
        return maxConsumer;
    }

}
