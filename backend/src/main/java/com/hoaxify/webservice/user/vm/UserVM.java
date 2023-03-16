package com.hoaxify.webservice.user.vm;

import com.hoaxify.webservice.user.User;
import lombok.Data;

@Data
public class UserVM {
    private String username;
    private String displayName;
    private String image;

    public UserVM(User user){
        this.setUsername(user.getUsername());
        this.setImage(user.getImage());
        this.setDisplayName(user.getDisplayName());
    }
}
