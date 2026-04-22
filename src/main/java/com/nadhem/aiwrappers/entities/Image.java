package com.nadhem.aiwrappers.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImage;
    private String name;
    private String type;

    @Column(name = "IMAGE", columnDefinition = "LONGBLOB")
    @Lob
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "AI_ID")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private AIWrapper aiWrapper;
}
