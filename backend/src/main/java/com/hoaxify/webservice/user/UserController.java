package com.hoaxify.webservice.user;
import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.shared.GenericResponse;
import com.hoaxify.webservice.shared.Views;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping("/api/1.0/users")
    @ResponseStatus(HttpStatus.CREATED)
    public GenericResponse createUser(@Valid @RequestBody User user){
        userService.save(user);
        return new GenericResponse("user created");
    }

    @GetMapping("/api/1.0/users")
    @JsonView(Views.Base.class)
    public List<User> getUsers(){
        return userService.getUsers();
    }


}


