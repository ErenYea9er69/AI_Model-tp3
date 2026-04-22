package com.nadhem.aiwrappers.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nadhem.aiwrappers.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
