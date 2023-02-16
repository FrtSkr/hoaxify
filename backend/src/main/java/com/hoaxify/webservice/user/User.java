package com.hoaxify.webservice.user;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.shared.Views;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue
    private long id;

    @NotNull(message = "{hoaxify.constraint.username.NotNull.message}")
    @Size(min = 4, max = 255, message = "{hoaxify.constraint.Size.message}")
    @UniqueUserName(message = "{hoaxify.constraint.UniqueUserName.message}")
    @JsonView(Views.Base.class)
    private String username;

    @NotNull(message = "{hoaxify.constraint.displayName.NotNull.message}")
    @Size(min = 4, max = 255, message = "{hoaxify.constraint.Size.message}")
    @JsonView(Views.Base.class)
    private String displayName;

    @NotNull(message = "{hoaxify.constraint.password.NotNull.message}")
    @Size(min = 8, max = 255, message = "{hoaxify.constraint.Size.message}")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoaxify.constraint.password.Pattern.message}")
    @JsonView(Views.Sensitive.class)
    private String password;

    @JsonView(Views.Base.class)
    private String image;
}
