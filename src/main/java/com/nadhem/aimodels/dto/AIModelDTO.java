package com.nadhem.aimodels.dto;

import java.util.Date;
import com.nadhem.aimodels.entities.AICategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIModelDTO {
    private Long idAI;
    private String nomAI;
    private Double prixAI;
    private Date dateCreation;
    private AICategory aiCategory;
    private String nomCat;
}
