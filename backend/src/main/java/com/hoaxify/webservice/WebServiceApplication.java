package com.hoaxify.webservice;

import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class WebServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebServiceApplication.class, args);

	}

	@Bean
	// Bu fonksiyon hangi profilde çalışabilir
	@Profile("dev")
	CommandLineRunner createInitialUsers(UserService userService){
		return (args) -> {
			for(int i = 1; i <=10; i++){
				User user = new User();
				user.setUsername("user"+i);
				user.setDisplayName("display"+i);
				user.setPassword("User1234");
				userService.save(user);
			}
		};
	}

}
