package com.aiwrapped.aiwrappers.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aiwrapped.aiwrappers.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
