package com.aiwrapped.users.security;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.aiwrapped.users.entities.Role;
import com.aiwrapped.users.entities.User;
import com.aiwrapped.users.service.UserService;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        if (!user.getEnabled()) {
            throw new UsernameNotFoundException("User account is disabled: " + username);
        }

        List<GrantedAuthority> auths = new ArrayList<>();
        if (user.getRoles() != null) {
            for (Role role : user.getRoles()) {
                auths.add(new SimpleGrantedAuthority(role.getRole()));
            }
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), auths);
    }
}
