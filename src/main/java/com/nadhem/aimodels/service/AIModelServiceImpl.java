package com.nadhem.aimodels.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nadhem.aimodels.dto.AIModelDTO;
import com.nadhem.aimodels.entities.AICategory;
import com.nadhem.aimodels.entities.AIModel;
import com.nadhem.aimodels.repos.AIModelRepository;
import com.nadhem.aimodels.repos.ImageRepository;

@Service
public class AIModelServiceImpl implements AIModelService {

    @Autowired
    AIModelRepository aiModelRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public AIModelDTO saveAIModel(AIModelDTO p) {
        return convertEntityToDto(aiModelRepository.save(convertDtoToEntity(p)));
    }

    @Override
    public AIModelDTO updateAIModel(AIModelDTO p) {
        return convertEntityToDto(aiModelRepository.save(convertDtoToEntity(p)));
    }

    @Override
    public void deleteAIModel(AIModel p) {
        aiModelRepository.delete(p);
    }

    @Override
    public void deleteAIModelById(Long id) {
        AIModel p = aiModelRepository.findById(id).get();
        try {
            String imagePath = p.getImagePath();
            if (imagePath == null) imagePath = id + ".jpg";
            Files.deleteIfExists(Paths.get(System.getProperty("user.home") + "/images/" + imagePath));
        } catch (IOException e) {
            e.printStackTrace();
        }
        aiModelRepository.deleteById(id);
    }

    @Override
    public AIModelDTO getAIModel(Long id) {
        return convertEntityToDto(aiModelRepository.findById(id).get());
    }

    @Override
    public List<AIModelDTO> getAllAIModels() {
        return aiModelRepository.findAll().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIModelDTO> findByNomAI(String nom) {
        return aiModelRepository.findByNomAI(nom).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIModelDTO> findByNomAIContains(String nom) {
        return aiModelRepository.findByNomAIContains(nom).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIModelDTO> findByNomPrix(String nom, Double prix) {
        return aiModelRepository.findByNomPrix(nom, prix).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIModelDTO> findByAICategory(AICategory category) {
        return aiModelRepository.findByAICategory(category).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIModelDTO> findByAICategoryIdCat(Long id) {
        return aiModelRepository.findByAICategoryIdCat(id).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIModelDTO> findByOrderByNomAIAsc() {
        return aiModelRepository.findByOrderByNomAIAsc().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AIModelDTO> trierAINomsPrix() {
        return aiModelRepository.trierAINomsPrix().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public AIModelDTO convertEntityToDto(AIModel model) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        AIModelDTO modelDTO = modelMapper.map(model, AIModelDTO.class);
        return modelDTO;
    }

    @Override
    public AIModel convertDtoToEntity(AIModelDTO modelDto) {
        AIModel model = modelMapper.map(modelDto, AIModel.class);
        return model;
    }
}
