package com.hoaxify.webservice.user;

import com.hoaxify.webservice.error.NotFoundException;
import com.hoaxify.webservice.file.FileService;
import com.hoaxify.webservice.hoax.HoaxService;
import com.hoaxify.webservice.user.vm.UserUpdateVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.io.IOException;



@Service
public class UserService {
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    private FileService fileService;

    private HoaxService hoaxService;



    public UserService(PasswordEncoder passwordEncoder, FileService fileService, UserRepository userRepository) {

        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
        this.userRepository = userRepository;

    }

    @Autowired
    public void setHoaxService(@Lazy HoaxService hoaxService) {
        this.hoaxService = hoaxService;
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

    public User updateUser(String username, UserUpdateVM updatedUser) {
        User inDb = getByUsername(username);
        inDb.setDisplayName(updatedUser.getDisplayName());
        if(updatedUser.getImage() != null){
            String oldImageName = inDb.getImage();
            try{
                String storedFileName = fileService.writeBase64EncodedStringToFile(updatedUser.getImage());
                inDb.setImage(storedFileName);
            }catch (IOException e){
                e.printStackTrace();;
            }
            fileService.deleteProfileImage(oldImageName);
        }

        return userRepository.save(inDb);
    }


    public void deleteUser(String username) {
        hoaxService.deleteHoaxesOfUser(username);
        User inDB = userRepository.findByUsername(username);
        userRepository.delete(inDB);
    }
}
