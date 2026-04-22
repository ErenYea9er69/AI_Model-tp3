package com.nadhem.aiwrappers.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.nadhem.aiwrappers.entities.AITheme;

@RepositoryRestResource(path = "cat")
@CrossOrigin("http://localhost:4200/")
public interface AIThemeRepository extends JpaRepository<AITheme, Long> {
}
