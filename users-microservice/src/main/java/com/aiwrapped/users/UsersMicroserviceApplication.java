package com.aiwrapped.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.aiwrapped.users.entities.Role;
import com.aiwrapped.users.entities.User;
import com.aiwrapped.users.service.UserService;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class UsersMicroserviceApplication {

    @Autowired
    UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(UsersMicroserviceApplication.class, args);
    }

    @PostConstruct
    void init_users() {
        // Only seed data if users don't already exist
        if (userService.findUserByUsername("admin") != null) {
            return; // Data already seeded
        }

        // Ajouter les rôles
        userService.addRole(new Role(null, "ADMIN"));
        userService.addRole(new Role(null, "USER"));

        // Ajouter les users
        userService.saveUser(new User(null, "admin", "123", "admin@email.com", true, null));
        userService.saveUser(new User(null, "aiwrapped", "123", "aiwrapped@email.com", true, null));
        userService.saveUser(new User(null, "yassine", "123", "yassine@email.com", true, null));

        // Ajouter les rôles aux users
        userService.addRoleToUser("admin", "ADMIN");
        userService.addRoleToUser("admin", "USER");
        userService.addRoleToUser("aiwrapped", "USER");
        userService.addRoleToUser("yassine", "USER");
    }

    @Bean
    BCryptPasswordEncoder getBCE() {
        return new BCryptPasswordEncoder();
    }
}
