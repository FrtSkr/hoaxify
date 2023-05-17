package com.hoaxify.webservice.auth;


import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.Timestamp;

@Data
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class AuthException extends RuntimeException{
}
