package com.nadhem.aimodels.entities;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AIModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAI;
    private String nomAI;
    private Double prixAI;
    private Date dateCreation;

    @ManyToOne
    private AICategory aiCategory;

    public AIModel(String nomAI, Double prixAI, Date dateCreation, AICategory aiCategory) {
        this.nomAI = nomAI;
        this.prixAI = prixAI;
        this.dateCreation = dateCreation;
        this.aiCategory = aiCategory;
    }
}
