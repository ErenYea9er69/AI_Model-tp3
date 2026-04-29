package com.aiwrapped.aiwrappers.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import com.aiwrapped.aiwrappers.dto.AIWrapperDTO;
import com.aiwrapped.aiwrappers.service.AIWrapperService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class AIWrapperRESTController {

    @Autowired
    AIWrapperService aiWrapperService;

    @RequestMapping(path = "all", method = RequestMethod.GET)
    public List<AIWrapperDTO> getAllAIWrappers() {
        return aiWrapperService.getAllAIWrappers();
    }

    @RequestMapping(value = "/getbyid/{id}", method = RequestMethod.GET)
    public AIWrapperDTO getAIWrapperById(@PathVariable("id") Long id) {
        return aiWrapperService.getAIWrapper(id);
    }

    @RequestMapping(path = "/addprod", method = RequestMethod.POST)
    public AIWrapperDTO createAIWrapper(@RequestBody AIWrapperDTO aiWrapperDTO) {
        return aiWrapperService.saveAIWrapper(aiWrapperDTO);
    }

    @RequestMapping(path = "/updateprod", method = RequestMethod.PUT)
    public AIWrapperDTO updateAIWrapper(@RequestBody AIWrapperDTO aiWrapperDTO) {
        return aiWrapperService.updateAIWrapper(aiWrapperDTO);
    }

    @RequestMapping(value = "/delprod/{id}", method = RequestMethod.DELETE)
    public void deleteAIWrapper(@PathVariable("id") Long id) {
        aiWrapperService.deleteAIWrapperById(id);
    }

    @RequestMapping(value = "/prodscat/{idTheme}", method = RequestMethod.GET)
    public List<AIWrapperDTO> getAIWrappersByCatId(@PathVariable("idTheme") Long idTheme) {
        return aiWrapperService.findByAiThemeIdTheme(idTheme);
    }

    @RequestMapping(value = "/prodsByName/{nom}", method = RequestMethod.GET)
    public List<AIWrapperDTO> findByNomWrapperContains(@PathVariable("nom") String nom) {
        return aiWrapperService.findByNomWrapperContains(nom);
    }
}
