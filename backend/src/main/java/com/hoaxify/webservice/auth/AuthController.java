package com.hoaxify.webservice.auth;

import com.hoaxify.webservice.shared.GenericResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }
    @PostMapping("/api/1.0/auth")
    AuthResponse handleAuthentication(@RequestBody Credentials credentials){
        return authService.authenticate(credentials);
    }

    @PostMapping("/api/1.0/logout")
    GenericResponse handleLogout(@RequestHeader(name = "Authorization") String authorization){
        String token = authorization.substring(7);
        authService.clearToken(token);
        return new GenericResponse("Logout success");
    }



}
