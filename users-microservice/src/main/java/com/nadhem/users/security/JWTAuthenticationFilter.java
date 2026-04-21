package com.nadhem.users.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl("/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try {
            // Parse JSON body to get username + password
            com.nadhem.users.entities.User credentials =
                    new ObjectMapper().readValue(request.getInputStream(), com.nadhem.users.entities.User.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.getUsername(),
                            credentials.getPassword()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult)
            throws IOException, ServletException {

        User springUser = (User) authResult.getPrincipal();

        List<String> roles = new ArrayList<>();
        for (GrantedAuthority ga : springUser.getAuthorities()) {
            roles.add(ga.getAuthority());
        }

        String jwt = JWT.create()
                .withSubject(springUser.getUsername())
                .withArrayClaim("roles", roles.toArray(new String[0]))
                .withExpiresAt(new Date(System.currentTimeMillis() + SecParams.EXP_TIME))
                .sign(Algorithm.HMAC256(SecParams.SECRET));

        response.addHeader("Authorization", SecParams.PREFIX + jwt);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed)
            throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        String errorCause = "badCredentials";
        if (failed instanceof DisabledException) {
            errorCause = "disabled";
        }

        response.getWriter().write("{\"errorCause\": \"" + errorCause + "\"}");
    }
}
