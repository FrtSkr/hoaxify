package com.hoaxify.webservice.auth;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.error.ApiError;
import com.hoaxify.webservice.shared.Views;
import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

@RestController
public class AuthController {
    final String basePath = "/api/1.0/auth";
    @Autowired
    UserRepository userRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @PostMapping(basePath)
    @JsonView(Views.Base.class)
    ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization", required = false) String authorization){
        if(authorization == null){
            ApiError apiError = new ApiError(401, "Unauthorization request", basePath);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }

        String base64Encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64Encoded));

        if(decoded.trim().equalsIgnoreCase(":")){
            ApiError apiError = new ApiError(401, "Unauthorization request", basePath);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }
        String[] parts = decoded.split(":");
        String username = parts[0];
        String password = parts[1];
        User inDB = userRepository.findByUsername(username);
        if(inDB == null){
            ApiError apiError = new ApiError(401, "Unauthorization request", basePath);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }
        String hashedPassword = inDB.getPassword();
        if(!passwordEncoder.matches(password, hashedPassword)){
            ApiError apiError = new ApiError(401, "Unauthorization request", basePath);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }


        return ResponseEntity.ok(inDB);


    }

}
