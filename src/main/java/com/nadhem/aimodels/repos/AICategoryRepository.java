package com.nadhem.aimodels.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.nadhem.aimodels.entities.AICategory;

@RepositoryRestResource(path = "cat")
@CrossOrigin("http://localhost:4200/")
public interface AICategoryRepository extends JpaRepository<AICategory, Long> {
}
