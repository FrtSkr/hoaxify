package com.hoaxify.webservice.user;
import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.shared.CurrentUser;
import com.hoaxify.webservice.shared.GenericResponse;
import com.hoaxify.webservice.shared.Views;
import com.hoaxify.webservice.user.vm.UserUpdateVM;
import com.hoaxify.webservice.user.vm.UserVM;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/1.0")
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public GenericResponse createUser(@Valid @RequestBody User user){
        userService.save(user);
        return new GenericResponse("user created");
    }

    @GetMapping("/users")
    public Page<UserVM> getUsers(Pageable page, @CurrentUser User user){
        // method reference, it came with Java 8 --> UserVM::new
        return userService.getUsers(page, user).map(UserVM::new);
    }

    @GetMapping("/users/{username}")
    UserVM getUser(@PathVariable String username){
       User user = userService.getByUsername(username);
       return new UserVM(user);
    }

    @PutMapping("/users/{username}")
    UserVM updateUser(@RequestBody UserUpdateVM updatedUser, @PathVariable String username){
       User user = userService.updateUser(username, updatedUser);
       return new UserVM(user);
    }


}


