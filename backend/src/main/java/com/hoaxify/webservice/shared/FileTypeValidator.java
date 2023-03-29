package com.hoaxify.webservice.shared;
import com.hoaxify.webservice.file.FileService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.stream.Collectors;

public class FileTypeValidator implements ConstraintValidator<FileType, String> {

    @Autowired
    FileService fileService;

    String[] types;

    @Override
    public void initialize(FileType constraintAnnotation) {
       this.types= constraintAnnotation.types();
    }

    @Override
    public boolean isValid(String image, ConstraintValidatorContext constraintValidatorContext) {
        if(image == null || image.isEmpty()){
            return true;
        }
        String fileType = fileService.detectType(image);
        for(String supportedType: this.types){
            if(fileType.contains(supportedType)){
                return true;
            }
        }
        // hata mesajı için constraint parametre (types) default değerlerini istediğimiz şekilde düzenledik
        String supportedTypes = String.join(", ", this.types);

        constraintValidatorContext.disableDefaultConstraintViolation();
        HibernateConstraintValidatorContext hibernateConstraintValidatorContext =
                constraintValidatorContext.unwrap(HibernateConstraintValidatorContext.class);
        hibernateConstraintValidatorContext.addMessageParameter("types", supportedTypes);

        hibernateConstraintValidatorContext.buildConstraintViolationWithTemplate(
                constraintValidatorContext.getDefaultConstraintMessageTemplate()).addConstraintViolation();

        return false;
    }
}
