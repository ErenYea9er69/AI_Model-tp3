package com.nadhem.aimodels.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import com.nadhem.aimodels.dto.AIModelDTO;
import com.nadhem.aimodels.service.AIModelService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class AIModelRESTController {

    @Autowired
    AIModelService aiModelService;

    @RequestMapping(path = "all", method = RequestMethod.GET)
    public List<AIModelDTO> getAllAIModels() {
        return aiModelService.getAllAIModels();
    }

    @RequestMapping(value = "/getbyid/{id}", method = RequestMethod.GET)
    public AIModelDTO getAIModelById(@PathVariable("id") Long id) {
        return aiModelService.getAIModel(id);
    }

    @RequestMapping(path = "/addprod", method = RequestMethod.POST)
    public AIModelDTO createAIModel(@RequestBody AIModelDTO aiModelDTO) {
        return aiModelService.saveAIModel(aiModelDTO);
    }

    @RequestMapping(path = "/updateprod", method = RequestMethod.PUT)
    public AIModelDTO updateAIModel(@RequestBody AIModelDTO aiModelDTO) {
        return aiModelService.updateAIModel(aiModelDTO);
    }

    @RequestMapping(value = "/delprod/{id}", method = RequestMethod.DELETE)
    public void deleteAIModel(@PathVariable("id") Long id) {
        aiModelService.deleteAIModelById(id);
    }

    @RequestMapping(value = "/prodscat/{idCat}", method = RequestMethod.GET)
    public List<AIModelDTO> getAIModelsByCatId(@PathVariable("idCat") Long idCat) {
        return aiModelService.findByAiCategoryIdCat(idCat);
    }

    @RequestMapping(value = "/prodsByName/{nom}", method = RequestMethod.GET)
    public List<AIModelDTO> findByNomAIContains(@PathVariable("nom") String nom) {
        return aiModelService.findByNomAIContains(nom);
    }
}
