package com.nadhem.aiwrappers.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "nomWrapper", types = { AIWrapper.class })
public interface AIWrapperProjection {
    public String getNomWrapper();
}
