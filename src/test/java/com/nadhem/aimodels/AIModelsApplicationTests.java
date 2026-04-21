package com.nadhem.aimodels;

import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.nadhem.aimodels.entities.AIModel;
import com.nadhem.aimodels.entities.AICategory;
import com.nadhem.aimodels.repos.AIModelRepository;

@SpringBootTest
class AIModelsApplicationTests {

    @Autowired
    private AIModelRepository aiModelRepository;

    @Test
    public void testCreateAIModel() {
        AIModel ai = new AIModel("GPT-4", 2500.500, new Date(), null);
        aiModelRepository.save(ai);
    }

    @Test
    public void testFindAIModel() {
        AIModel ai = aiModelRepository.findById(1L).get();
        System.out.println(ai);
    }

    @Test
    public void testUpdateAIModel() {
        AIModel ai = aiModelRepository.findById(1L).get();
        ai.setPrixAI(3000.0);
        aiModelRepository.save(ai);
    }

    @Test
    public void testDeleteAIModel() {
        aiModelRepository.deleteById(1L);
    }

    @Test
    public void testListerTousAIModels() {
        List<AIModel> ais = aiModelRepository.findAll();
        for (AIModel ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByNomAI() {
        List<AIModel> ais = aiModelRepository.findByNomAI("GPT-4");
        for (AIModel ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByNomAIContains() {
        List<AIModel> ais = aiModelRepository.findByNomAIContains("GPT");
        for (AIModel ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByNomPrix() {
        List<AIModel> ais = aiModelRepository.findByNomPrix("GPT-4", 1000.0);
        for (AIModel ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByAICategory() {
        AICategory cat = new AICategory();
        cat.setIdCat(1L);
        List<AIModel> ais = aiModelRepository.findByAICategory(cat);
        for (AIModel ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByAICategoryIdCat() {
        List<AIModel> ais = aiModelRepository.findByAiCategoryIdCat(1L);
        for (AIModel ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByOrderByNomAIAsc() {
        List<AIModel> ais = aiModelRepository.findByOrderByNomAIAsc();
        for (AIModel ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testTrierAINomsPrix() {
        List<AIModel> ais = aiModelRepository.trierAINomsPrix();
        for (AIModel ai : ais) {
            System.out.println(ai);
        }
    }
}
