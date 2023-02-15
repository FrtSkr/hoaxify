package com.hoaxify.webservice;

import com.hoaxify.webservice.user.User;
import com.hoaxify.webservice.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class WebServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebServiceApplication.class, args);

	}

	@Bean
	CommandLineRunner createInitialUsers(UserService userService){
		return (args) -> {
			User user = new User();
			user.setUserName("admin");
			user.setDisplayName("admin");
			user.setPassword("Admin123");
			userService.save(user);
		};
	}

}
