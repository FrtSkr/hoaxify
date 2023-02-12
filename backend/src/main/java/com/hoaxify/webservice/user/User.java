package com.hoaxify.webservice.user;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private long id;
    @NotNull
    private String userName;
    @NotNull
    private String displayName;
    @NotNull
    private String password;

}
