package com.hoaxify.webservice.user;
import com.hoaxify.webservice.error.ApiError;
import com.hoaxify.webservice.shared.GenericResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
    public ResponseEntity<?> createUser(@Valid @RequestBody User user){
        ApiError apiError = new ApiError(400, "validation error", "/api/1.0/users");
        Map<String, String> validationError = new HashMap<>();
        String username = user.getUserName();
        String displayName = user.getDisplayName();
        String password = user.getPassword();

        if(username == null || username.trim().isEmpty()){
            validationError.put("userName", "User name cannot be null");
        }

        if(displayName == null || displayName.trim().isEmpty()){
            validationError.put("displayName", "Display name cannot be null");
        }
        if(password == null || password.trim().isEmpty()){
            validationError.put("password", "Password cannot be null");
        }
        if(validationError.size() > 0){
            apiError.setValidationErrors(validationError);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
        }

        userService.save(user);
        return ResponseEntity.ok(new GenericResponse("user created"));
    }
}


