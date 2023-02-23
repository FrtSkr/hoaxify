package com.hoaxify.webservice.auth;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.shared.CurrentUser;
import com.hoaxify.webservice.shared.Views;
import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    final String basePath = "/api/1.0/auth";

    @PostMapping(basePath)
    @JsonView(Views.Base.class)
    ResponseEntity<?> handleAuthentication(@CurrentUser User user){
        return ResponseEntity.ok(user);
    }

}
