package com.nadhem.aiwrappers.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nadhem.aiwrappers.dto.AIWrapperDTO;
import com.nadhem.aiwrappers.entities.AITheme;
import com.nadhem.aiwrappers.entities.AIWrapper;
import com.nadhem.aiwrappers.repos.AIWrapperRepository;
import com.nadhem.aiwrappers.repos.ImageRepository;

@Service
public class AIWrapperServiceImpl implements AIWrapperService {

    @Autowired
    AIWrapperRepository aiWrapperRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public AIWrapperDTO saveAIWrapper(AIWrapperDTO p) {
        return convertEntityToDto(aiWrapperRepository.save(convertDtoToEntity(p)));
    }

    @Override
    public AIWrapperDTO updateAIWrapper(AIWrapperDTO p) {
        return convertEntityToDto(aiWrapperRepository.save(convertDtoToEntity(p)));
    }

    @Override
    public void deleteAIWrapper(AIWrapper p) {
        aiWrapperRepository.delete(p);
    }

    @Override
    public void deleteAIWrapperById(Long id) {
        AIWrapper p = aiWrapperRepository.findById(id).get();
        try {
            String imagePath = p.getImagePath();
            if (imagePath == null) imagePath = id + ".jpg";
            Files.deleteIfExists(Paths.get(System.getProperty("user.home") + "/images/" + imagePath));
        } catch (IOException e) {
            e.printStackTrace();
        }
        aiWrapperRepository.deleteById(id);
    }

    @Override
    public AIWrapperDTO getAIWrapper(Long id) {
        return convertEntityToDto(aiWrapperRepository.findById(id).get());
    }

    @Override
    public List<AIWrapperDTO> getAllAIWrappers() {
        return aiWrapperRepository.findAll().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIWrapperDTO> findByNomWrapper(String nom) {
        return aiWrapperRepository.findByNomWrapper(nom).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIWrapperDTO> findByNomWrapperContains(String nom) {
        return aiWrapperRepository.findByNomWrapperContains(nom).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIWrapperDTO> findByNomPrix(String nom, Double prix) {
        return aiWrapperRepository.findByNomPrix(nom, prix).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIWrapperDTO> findByAITheme(AITheme theme) {
        return aiWrapperRepository.findByAITheme(theme).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIWrapperDTO> findByAiThemeIdTheme(Long id) {
        return aiWrapperRepository.findByAiThemeIdTheme(id).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIWrapperDTO> findByOrderByNomWrapperAsc() {
        return aiWrapperRepository.findByOrderByNomWrapperAsc().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIWrapperDTO> trierAINomsPrix() {
        return aiWrapperRepository.trierAINomsPrix().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public AIWrapperDTO convertEntityToDto(AIWrapper model) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        AIWrapperDTO modelDTO = modelMapper.map(model, AIWrapperDTO.class);
        return modelDTO;
    }

    @Override
    public AIWrapper convertDtoToEntity(AIWrapperDTO modelDto) {
        AIWrapper model = modelMapper.map(modelDto, AIWrapper.class);
        if (model.getImages() != null) {
            model.getImages().forEach(img -> img.setAiWrapper(model));
        }
        return model;
    }
}
