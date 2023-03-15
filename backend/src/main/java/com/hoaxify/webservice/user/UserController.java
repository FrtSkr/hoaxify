package com.hoaxify.webservice.user;
import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.shared.GenericResponse;
import com.hoaxify.webservice.shared.Views;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


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
    public Page<User> getUsers(Pageable page){
        return userService.getUsers(page);
    }


}


