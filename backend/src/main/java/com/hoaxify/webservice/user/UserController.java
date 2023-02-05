package com.hoaxify.webservice.user;
import com.hoaxify.webservice.error.ApiError;
import com.hoaxify.webservice.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping("/api/1.0/users")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createUser(@RequestBody User user){
        String username = user.getUserName();
        if(username == null || username.isEmpty()){
            ApiError apiError = new ApiError(400, "validation error", "/api/1.0/users");
            Map<String, String> validationError = new HashMap<>();
            validationError.put("username", "Username cannot be null");
            apiError.setValidationErrors(validationError);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        userService.save(user);
        return ResponseEntity.ok(new GenericResponse("user created"));
    }
}


