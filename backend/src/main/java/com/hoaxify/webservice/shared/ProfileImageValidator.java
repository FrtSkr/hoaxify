package com.hoaxify.webservice.shared;

import com.hoaxify.webservice.file.FileService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class ProfileImageValidator implements ConstraintValidator<ProfileImage, String> {

    @Autowired
    FileService fileService;


    @Override
    public boolean isValid(String image, ConstraintValidatorContext constraintValidatorContext) {

        if(image == null || image.isEmpty()){
            return true;
        }

        String fileType = fileService.detectType(image);
        if(fileType.equalsIgnoreCase("image/jpeg") || fileType.equalsIgnoreCase("image/png")){
            return true;
        }
        return false;
    }
}
