package com.hoaxify.webservice.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        //Cross Site Request Forgery (CSRF)
        http.csrf().disable();
        http.exceptionHandling().authenticationEntryPoint(new AuthEntryPoint());
        http.headers().frameOptions().disable();

        http.authorizeHttpRequests()
                .requestMatchers(HttpMethod.PUT, "/api/1.0/users/{username}")
                .authenticated()
                .requestMatchers(HttpMethod.POST, "/api/1.0/hoaxes")
                .authenticated()
                .requestMatchers(HttpMethod.POST, "/api/1.0/hoax-attachments")
                .authenticated()
                .requestMatchers(HttpMethod.POST, "/api/1.0/logout")
                .authenticated()
                .and()
                .authorizeHttpRequests().anyRequest().permitAll();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(tokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    TokenFilter tokenFilter(){
        return new TokenFilter();
    }

}
