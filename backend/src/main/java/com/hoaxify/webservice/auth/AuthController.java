package com.hoaxify.webservice.auth;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.shared.Views;
import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

@RestController
public class AuthController {
    final String basePath = "/api/1.0/auth";
    @Autowired
    UserRepository userRepository;

    @PostMapping(basePath)
    @JsonView(Views.Base.class)
    ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization") String authorization){
        String base64Encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64Encoded));
        String[] parts = decoded.split(":");
        String username = parts[0];
        User inDB = userRepository.findByUsername(username);

        return ResponseEntity.ok(inDB);


    }

}
