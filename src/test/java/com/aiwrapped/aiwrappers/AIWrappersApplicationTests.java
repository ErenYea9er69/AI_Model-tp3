package com.aiwrapped.aiwrappers;

import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.aiwrapped.aiwrappers.entities.AIWrapper;
import com.aiwrapped.aiwrappers.entities.AITheme;
import com.aiwrapped.aiwrappers.repos.AIWrapperRepository;

@SpringBootTest
class AIWrappersApplicationTests {

    @Autowired
    private AIWrapperRepository aiWrapperRepository;

    @Test
    public void testCreateAIWrapper() {
        AIWrapper ai = new AIWrapper("GPT-4", 2500.500, new Date(), null);
        aiWrapperRepository.save(ai);
    }

    @Test
    public void testFindAIWrapper() {
        AIWrapper ai = aiWrapperRepository.findById(1L).get();
        System.out.println(ai);
    }

    @Test
    public void testUpdateAIWrapper() {
        AIWrapper ai = aiWrapperRepository.findById(1L).get();
        ai.setPrixWrapper(3000.0);
        aiWrapperRepository.save(ai);
    }

    @Test
    public void testDeleteAIWrapper() {
        aiWrapperRepository.deleteById(1L);
    }

    @Test
    public void testListerTousAIWrappers() {
        List<AIWrapper> ais = aiWrapperRepository.findAll();
        for (AIWrapper ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByNomWrapper() {
        List<AIWrapper> ais = aiWrapperRepository.findByNomWrapper("GPT-4");
        for (AIWrapper ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByNomWrapperContains() {
        List<AIWrapper> ais = aiWrapperRepository.findByNomWrapperContains("G");
        for (AIWrapper ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByNomPrix() {
        List<AIWrapper> ais = aiWrapperRepository.findByNomPrix("GPT-4", 1000.0);
        for (AIWrapper ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByAITheme() {
        AITheme cat = new AITheme();
        cat.setIdTheme(1L);
        List<AIWrapper> ais = aiWrapperRepository.findByAITheme(cat);
        for (AIWrapper ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByThemeIdTheme() {
        List<AIWrapper> ais = aiWrapperRepository.findByAiThemeIdTheme(1L);
        for (AIWrapper ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testFindByOrderByNomWrapperAsc() {
        List<AIWrapper> ais = aiWrapperRepository.findByOrderByNomWrapperAsc();
        for (AIWrapper ai : ais) {
            System.out.println(ai);
        }
    }

    @Test
    public void testTrierAINomsPrix() {
        List<AIWrapper> ais = aiWrapperRepository.trierAINomsPrix();
        for (AIWrapper ai : ais) {
            System.out.println(ai);
        }
    }
}
