package com.hoaxify.webservice.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @PostMapping("/api/1.0/auth")
    void handleAuthentication(@RequestHeader(name = "Authorization") String authorization){

         final Logger log = LoggerFactory.getLogger(AuthController.class);

         log.info(authorization);


    }

}
