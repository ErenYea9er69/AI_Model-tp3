package com.aiwrapped.aiwrappers.entities;

import java.util.Date;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AIWrapper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idWrapper;
    private String nomWrapper;
    private Double prixWrapper;
    private Date dateCreation;

    @ManyToOne
    private AITheme aiTheme;

    @OneToMany(mappedBy = "aiWrapper", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

    private String imagePath;

    public AIWrapper(String nomWrapper, Double prixWrapper, Date dateCreation, AITheme aiTheme) {
        this.nomWrapper = nomWrapper;
        this.prixWrapper = prixWrapper;
        this.dateCreation = dateCreation;
        this.aiTheme = aiTheme;
    }
}
