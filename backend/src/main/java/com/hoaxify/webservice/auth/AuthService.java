package com.hoaxify.webservice.auth;

import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserRepository;
import com.hoaxify.webservice.user.vm.UserVM;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    TokenRepository tokenRepository;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenRepository tokenRepository){
         this.userRepository = userRepository;
         this.passwordEncoder = passwordEncoder;
         this.tokenRepository = tokenRepository;
     }

    public AuthResponse authenticate(Credentials credentials) {
        User inDB = userRepository.findByUsername(credentials.getUsername());
        if(inDB != null){
            boolean matches = passwordEncoder.matches(credentials.getPassword(), inDB.getPassword());
            if(matches){
                UserVM userVM = new UserVM(inDB);

                String token = generateRandomToken();

                Token tokenEntity = new Token();
                tokenEntity.setToken(token);
                tokenEntity.setUser(inDB);
                tokenRepository.save(tokenEntity);

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

    @Transactional
    public UserDetails getUserDetails(String token) {

        Optional<Token> optionalToken = tokenRepository.findById(token);
        if (!optionalToken.isPresent()){
            return null;
        }
        return optionalToken.get().getUser();
    }

    private String generateRandomToken(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public void clearToken(String token) {
        tokenRepository.deleteById(token);
    }
}
