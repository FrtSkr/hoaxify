package com.hoaxify.webservice.user.vm;

import com.hoaxify.webservice.shared.ProfileImage;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateVM {
    @Size(min = 4, max = 255, message = "{hoaxify.constraint.Size.message}")
    private String displayName;
    @ProfileImage
    private String image;
}
