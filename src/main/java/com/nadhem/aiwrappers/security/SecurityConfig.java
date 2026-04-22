package com.nadhem.aiwrappers.security;

import java.util.Collections;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
                @Override
                public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
                    config.setAllowedMethods(Collections.singletonList("*"));
                    config.setAllowedHeaders(Collections.singletonList("*"));
                    config.setExposedHeaders(Collections.singletonList("Authorization"));
                    return config;
                }
            }))
            .authorizeHttpRequests(requests -> requests
                .requestMatchers("/api/image/**", "/error").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
