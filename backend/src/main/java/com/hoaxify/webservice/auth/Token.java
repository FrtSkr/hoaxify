package com.hoaxify.webservice.auth;

import com.hoaxify.webservice.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;


@Entity
@Data
public class Token {

    @Id
    private String Token;

    @ManyToOne
    private User user;
}
