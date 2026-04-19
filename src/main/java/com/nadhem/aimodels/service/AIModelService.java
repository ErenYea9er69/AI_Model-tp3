package com.nadhem.aimodels.service;

import java.util.List;
import com.nadhem.aimodels.entities.AIModel;
import com.nadhem.aimodels.entities.AICategory;

public interface AIModelService {
    AIModel saveAIModel(AIModel p);
    AIModel updateAIModel(AIModel p);
    void deleteAIModel(AIModel p);
    void deleteAIModelById(Long id);
    AIModel getAIModel(Long id);
    List<AIModel> getAllAIModels();

    List<AIModel> findByNomAI(String nom);
    List<AIModel> findByNomAIContains(String nom);
    List<AIModel> findByNomPrix(String nom, Double prix);
    List<AIModel> findByAICategory(AICategory category);
    List<AIModel> findByAICategoryIdCat(Long id);
    List<AIModel> findByOrderByNomAIAsc();
    List<AIModel> trierAINomsPrix();
}
