package com.aiwrapped.aiwrappers.entities;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AITheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTheme;
    private String nomTheme;
    private String descriptionCat;

    @JsonIgnore
    @OneToMany(mappedBy = "aiTheme")
    private List<AIWrapper> aiWrappers;
}
