package com.nadhem.aimodels.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nadhem.aimodels.entities.AICategory;

public interface AICategoryRepository extends JpaRepository<AICategory, Long> {
}
