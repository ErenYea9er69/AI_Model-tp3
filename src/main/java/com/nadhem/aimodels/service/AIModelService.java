package com.nadhem.aimodels.service;

import java.util.List;
import com.nadhem.aimodels.entities.AIModel;
import com.nadhem.aimodels.entities.AICategory;
import com.nadhem.aimodels.dto.AIModelDTO;

public interface AIModelService {
    AIModelDTO saveAIModel(AIModelDTO p);
    AIModelDTO updateAIModel(AIModelDTO p);
    void deleteAIModel(AIModel p);
    void deleteAIModelById(Long id);
    AIModelDTO getAIModel(Long id);
    List<AIModelDTO> getAllAIModels();

    List<AIModelDTO> findByNomAI(String nom);
    List<AIModelDTO> findByNomAIContains(String nom);
    List<AIModelDTO> findByNomPrix(String nom, Double prix);
    List<AIModelDTO> findByAICategory(AICategory category);
    List<AIModelDTO> findByAiCategoryIdCat(Long id);
    List<AIModelDTO> findByOrderByNomAIAsc();
    List<AIModelDTO> trierAINomsPrix();

    AIModelDTO convertEntityToDto(AIModel model);
    AIModel convertDtoToEntity(AIModelDTO dto);
}
