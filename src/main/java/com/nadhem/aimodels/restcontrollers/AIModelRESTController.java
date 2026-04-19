package com.nadhem.aimodels.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.nadhem.aimodels.entities.AIModel;
import com.nadhem.aimodels.service.AIModelService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AIModelRESTController {

    @Autowired
    AIModelService aiModelService;

    @GetMapping
    public List<AIModel> getAllAIModels() {
        return aiModelService.getAllAIModels();
    }

    @GetMapping("/{id}")
    public AIModel getAIModelById(@PathVariable("id") Long id) {
        return aiModelService.getAIModel(id);
    }

    @PostMapping
    public AIModel createAIModel(@RequestBody AIModel aiModel) {
        return aiModelService.saveAIModel(aiModel);
    }

    @PutMapping
    public AIModel updateAIModel(@RequestBody AIModel aiModel) {
        return aiModelService.updateAIModel(aiModel);
    }

    @DeleteMapping("/{id}")
    public void deleteAIModel(@PathVariable("id") Long id) {
        aiModelService.deleteAIModelById(id);
    }

    @GetMapping("/aimodelscat/{idCat}")
    public List<AIModel> getAIModelsByCatId(@PathVariable("idCat") Long idCat) {
        return aiModelService.findByAICategoryIdCat(idCat);
    }
}
