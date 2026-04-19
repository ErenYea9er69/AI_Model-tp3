package com.nadhem.aimodels.service;

import java.util.List;
import com.nadhem.aimodels.entities.AIModel;

public interface AIModelService {
    AIModel saveAIModel(AIModel p);
    AIModel updateAIModel(AIModel p);
    void deleteAIModel(AIModel p);
    void deleteAIModelById(Long id);
    AIModel getAIModel(Long id);
    List<AIModel> getAllAIModels();
}
