package com.nadhem.aimodels.entities;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AIModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAI;
    private String nomAI;
    private Double prixAI;
    private Date dateCreation;

    public AIModel() {
        super();
    }

    public AIModel(String nomAI, Double prixAI, Date dateCreation) {
        super();
        this.nomAI = nomAI;
        this.prixAI = prixAI;
        this.dateCreation = dateCreation;
    }

    public Long getIdAI() {
        return idAI;
    }

    public void setIdAI(Long idAI) {
        this.idAI = idAI;
    }

    public String getNomAI() {
        return nomAI;
    }

    public void setNomAI(String nomAI) {
        this.nomAI = nomAI;
    }

    public Double getPrixAI() {
        return prixAI;
    }

    public void setPrixAI(Double prixAI) {
        this.prixAI = prixAI;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    @Override
    public String toString() {
        return "AIModel [idAI=" + idAI + ", nomAI=" + nomAI + ", prixAI=" + prixAI + ", dateCreation=" + dateCreation + "]";
    }
}
