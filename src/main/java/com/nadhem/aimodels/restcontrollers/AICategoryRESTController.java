package com.nadhem.aimodels.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.nadhem.aimodels.entities.AICategory;
import com.nadhem.aimodels.repos.AICategoryRepository;

@RestController
@RequestMapping("/api/cat")
@CrossOrigin("*")
public class AICategoryRESTController {

    @Autowired
    AICategoryRepository AICategoryRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<AICategory> getAllCategories() {
        return AICategoryRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public AICategory getAICategoryById(@PathVariable("id") Long id) {
        return AICategoryRepository.findById(id).get();
    }
}
