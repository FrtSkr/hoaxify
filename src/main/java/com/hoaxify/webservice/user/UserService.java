package com.hoaxify.webservice.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public void save(User user){
        userRepository.save(user);
    }

}
