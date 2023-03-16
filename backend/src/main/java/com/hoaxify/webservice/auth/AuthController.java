package com.hoaxify.webservice.auth;
import com.hoaxify.webservice.shared.CurrentUser;
import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.vm.UserVM;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    final String basePath = "/api/1.0/auth";

    @PostMapping(basePath)
    UserVM handleAuthentication(@CurrentUser User user){
        return new UserVM(user);
    }

}
