package com.networknine.config;

/**
 * Created by robertm on 5/11/17.
 */

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeRequests().antMatchers("/").permitAll();
        httpSecurity.csrf().disable(); //might need to figure out how to pass an csrf so I can enable this but still connect to the h2 database
        httpSecurity.headers().frameOptions().disable(); //necessary so that connecting to the h2 database doesnt show a blank page
    }

}
