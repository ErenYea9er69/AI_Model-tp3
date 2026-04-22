package com.nadhem.aiwrappers.service;

import java.util.List;
import com.nadhem.aiwrappers.entities.AIWrapper;
import com.nadhem.aiwrappers.entities.AITheme;
import com.nadhem.aiwrappers.dto.AIWrapperDTO;

public interface AIWrapperService {
    AIWrapperDTO saveAIWrapper(AIWrapperDTO p);
    AIWrapperDTO updateAIWrapper(AIWrapperDTO p);
    void deleteAIWrapper(AIWrapper p);
    void deleteAIWrapperById(Long id);
    AIWrapperDTO getAIWrapper(Long id);
    List<AIWrapperDTO> getAllAIWrappers();

    List<AIWrapperDTO> findByNomWrapper(String nom);
    List<AIWrapperDTO> findByNomWrapperContains(String nom);
    List<AIWrapperDTO> findByNomPrix(String nom, Double prix);
    List<AIWrapperDTO> findByAITheme(AITheme theme);
    List<AIWrapperDTO> findByAiThemeIdTheme(Long id);
    List<AIWrapperDTO> findByOrderByNomWrapperAsc();
    List<AIWrapperDTO> trierAINomsPrix();

    AIWrapperDTO convertEntityToDto(AIWrapper model);
    AIWrapper convertDtoToEntity(AIWrapperDTO dto);
}
