package com.nadhem.aimodels.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.nadhem.aimodels.entities.Image;
import com.nadhem.aimodels.service.ImageService;
import java.io.IOException;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "*")
public class ImageRestController {
    @Autowired
    ImageService imageService;

    @PostMapping("/upload")
    public Image uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uplaodImage(file);
    }

    @GetMapping("/get/info/{id}")
    public Image getImageDetails(@PathVariable("id") Long id) throws IOException {
        return imageService.getImageDetails(id);
    }

    @GetMapping("/load/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) throws IOException {
        return imageService.getImage(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteImage(@PathVariable("id") Long id) {
        imageService.deleteImage(id);
    }

    @PutMapping("/update")
    public Image updateImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uplaodImage(file);
    }
}
