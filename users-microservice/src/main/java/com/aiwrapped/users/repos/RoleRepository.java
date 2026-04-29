package com.aiwrapped.users.repos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aiwrapped.users.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    List<Role> findByRole(String role);
}
