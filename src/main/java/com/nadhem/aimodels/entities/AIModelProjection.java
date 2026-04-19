package com.nadhem.aimodels.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "nomAI", types = { AIModel.class })
public interface AIModelProjection {
    public String getNomAI();
}
