package com.hoaxify.webservice.user;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.shared.Views;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@Entity
@Table(name = "users")

public class User implements UserDetails {
    @Id
    @GeneratedValue
    private long id;

    @NotNull(message = "{hoaxify.constraint.username.NotNull.message}")
    @Size(min = 4, max = 255, message = "{hoaxify.constraint.Size.message}")
    @UniqueUserName(message = "{hoaxify.constraint.UniqueUserName.message}")
    private String username;

    @NotNull(message = "{hoaxify.constraint.displayName.NotNull.message}")
    @Size(min = 4, max = 255, message = "{hoaxify.constraint.Size.message}")
    private String displayName;

    @NotNull(message = "{hoaxify.constraint.password.NotNull.message}")
    @Size(min = 8, max = 255, message = "{hoaxify.constraint.Size.message}")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoaxify.constraint.password.Pattern.message}")
    private String password;

    @Lob
    private String image;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList("Role_user");
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
