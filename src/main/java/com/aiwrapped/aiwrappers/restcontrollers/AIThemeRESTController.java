package com.aiwrapped.aiwrappers.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import com.aiwrapped.aiwrappers.entities.AITheme;
import com.aiwrapped.aiwrappers.repos.AIThemeRepository;

@RestController
@RequestMapping("/api/cat")
@CrossOrigin("*")
public class AIThemeRESTController {

    @Autowired
    AIThemeRepository AIThemeRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<AITheme> getAllThemes() {
        return AIThemeRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public AITheme createTheme(@RequestBody AITheme theme) {
        return AIThemeRepository.save(theme);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public AITheme getAIThemeById(@PathVariable("id") Long id) {
        return AIThemeRepository.findById(id).get();
    }
}
