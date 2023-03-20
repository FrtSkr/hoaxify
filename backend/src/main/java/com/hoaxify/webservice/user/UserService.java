package com.hoaxify.webservice.user;

import com.hoaxify.webservice.error.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    PasswordEncoder passwordEncoder;
    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    public void save(User user){
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Page<User> getUsers(Pageable page, User user) {
        if( user != null){
            return userRepository.findByUsernameNot(user.getUsername(), page);
        }
        return userRepository.findAll(page);
    }

    public User getByUsername(String username) {
        User inDb = userRepository.findByUsername(username);
        if (inDb == null){
            throw new NotFoundException("User Not Found", "/api/1.0/users/{username}");
        }
        return inDb;
    }
}
