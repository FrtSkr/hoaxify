package com.hoaxify.webservice.user;
import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.error.ApiError;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    // Spring Security'nin sağlamış olduğu bir kolaylık. # işaretini kullanarak metodun parametrelerine ulaşabiliyoruz.
    // Bu dile SpEL yani Spring Expression Language deniyor.
    @PreAuthorize("#username == principal.username")
    UserVM updateUser(@Valid @RequestBody UserUpdateVM updatedUser, @PathVariable String username){
        // PreAuthorize işlemini yazdığımız işin aşağıdaki yetki kontrolüne gerek kalmadı
//        if(!loggedInUser.getUsername().equals(username)){
//            ApiError error = new ApiError(403, "Cannot change another users data", "/api/1.0/users/"+username);
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
//        }
       User user = userService.updateUser(username, updatedUser);
       return new UserVM(user);
    }


}


