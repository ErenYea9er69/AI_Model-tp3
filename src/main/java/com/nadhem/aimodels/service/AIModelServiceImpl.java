package com.nadhem.aimodels.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        // Optimized update: if DB images were used in the old version, we might need cleanup
        // However, with OneToMany, the patterns slightly differ.
        // Following user's specific pattern for optimization:
        /*
        Long oldProdImageId = this.getAIModel(p.getIdAI()).getImage().getIdImage();
        Long newProdImageId = p.getImage().getIdImage();
        AIModel prodUpdated = aiModelRepository.save(p);
        if (oldProdImageId != newProdImageId)
            imageRepository.deleteById(oldProdImageId);
        return prodUpdated;
        */
        // Since we switched to List<Image>, we will just save for now as the 'images' list handles it.
        return aiModelRepository.save(p);
    }

    @Override
    public void supprimerAIModel(AIModel p) {
        aiModelRepository.delete(p);
    }

    @Override
    public void supprimerAIModelById(Long id) {
        AIModel p = getAIModel(id);
        // Supprimer l'image du FS avant de supprimer le produit
        try {
            String imagePath = p.getImagePath();
            if (imagePath == null) imagePath = id + ".jpg"; // fallback
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
        return aiModelRepository.findByNomAIContains(nom);
    }

    @Override
    public List<AIModel> findByNomAIContains(String nom) {
        return aiModelRepository.findByNomAIContains(nom);
    }

    @Override
    public List<AIModel> findByCategoryIdCat(Long id) {
        return aiModelRepository.findByAiCategoryIdCat(id);
    }

    @Override
    public List<AIModel> findByOrderByNomAICasc() {
        return aiModelRepository.findByOrderByNomAIAsc();
    }

    @Override
    public List<AIModel> trierAIModelsNomsPrix() {
        return aiModelRepository.trierAIModelsNomsPrix();
    }
}
