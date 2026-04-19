package com.nadhem.aimodels.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nadhem.aimodels.entities.AIModel;

public interface AIModelRepository extends JpaRepository<AIModel, Long> {
}
