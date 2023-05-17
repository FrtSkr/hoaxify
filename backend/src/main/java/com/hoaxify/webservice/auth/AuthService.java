package com.hoaxify.webservice.auth;

import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserRepository;
import com.hoaxify.webservice.user.UserService;
import com.hoaxify.webservice.user.vm.UserVM;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder){
         this.userRepository = userRepository;
         this.passwordEncoder = passwordEncoder;
     }

    public AuthResponse authenticate(Credentials credentials) {
        User inDB = userRepository.findByUsername(credentials.getUsername());
        if(inDB != null){
            boolean matches = passwordEncoder.matches(credentials.getPassword(), inDB.getPassword());
            if(matches){
                UserVM userVM = new UserVM(inDB);
                String token = Jwts.builder().setSubject(""+ inDB.getId()).signWith(SignatureAlgorithm.HS512, "my-app-secret").compact();
                AuthResponse response = new AuthResponse();
                response.setUser(userVM);
                response.setToken(token);
                return response;
            }
            else {
                throw new AuthException();
            }
        }else {
            throw new AuthException();
        }
    }
}
