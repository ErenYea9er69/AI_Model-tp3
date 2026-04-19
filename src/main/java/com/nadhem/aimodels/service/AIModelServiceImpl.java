package com.nadhem.aimodels.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    @Override
    public AIModel saveAIModel(AIModel p) {
        return aiModelRepository.save(p);
    }

    @Override
    public AIModel updateAIModel(AIModel p) {
        return aiModelRepository.save(p);
    }

    @Override
    public void deleteAIModel(AIModel p) {
        aiModelRepository.delete(p);
    }

    @Override
    public void deleteAIModelById(Long id) {
        AIModel p = getAIModel(id);
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
    public AIModel getAIModel(Long id) {
        return aiModelRepository.findById(id).get();
    }

    @Override
    public List<AIModel> getAllAIModels() {
        return aiModelRepository.findAll();
    }

    @Override
    public List<AIModel> findByNomAI(String nom) {
        return aiModelRepository.findByNomAI(nom);
    }

    @Override
    public List<AIModel> findByNomAIContains(String nom) {
        return aiModelRepository.findByNomAIContains(nom);
    }

    @Override
    public List<AIModel> findByNomPrix(String nom, Double prix) {
        return aiModelRepository.findByNomPrix(nom, prix);
    }

    @Override
    public List<AIModel> findByAICategory(AICategory category) {
        return aiModelRepository.findByAICategory(category);
    }

    @Override
    public List<AIModel> findByAICategoryIdCat(Long id) {
        return aiModelRepository.findByAICategoryIdCat(id);
    }

    @Override
    public List<AIModel> findByOrderByNomAIAsc() {
        return aiModelRepository.findByOrderByNomAIAsc();
    }

    @Override
    public List<AIModel> trierAINomsPrix() {
        return aiModelRepository.trierAINomsPrix();
    }
}
