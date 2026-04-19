package com.nadhem.aimodels.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nadhem.aimodels.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
