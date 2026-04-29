package com.aiwrapped.aiwrappers.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.aiwrapped.aiwrappers.entities.AIWrapper;
import com.aiwrapped.aiwrappers.entities.Image;
import com.aiwrapped.aiwrappers.repos.AIWrapperRepository;
import com.aiwrapped.aiwrappers.service.ImageService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "*")
public class ImageRestController {
    @Autowired
    ImageService imageService;

    @Autowired
    AIWrapperRepository aiWrapperRepository;

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

    @PostMapping("/uplaodImageProd/{idWrapper}")
    public Image uploadMultiImages(@RequestParam("image") MultipartFile file, @PathVariable("idWrapper") Long idWrapper)
            throws IOException {
        return imageService.uplaodImageProd(file, idWrapper);
    }

    @GetMapping("/getImagesProd/{idWrapper}")
    public List<Image> getImagesProd(@PathVariable("idWrapper") Long idWrapper) throws IOException {
        return imageService.getImagesParProd(idWrapper);
    }

    @PostMapping("/uploadFS/{id}")
    public void uploadImageFS(@RequestParam("image") MultipartFile file, @PathVariable("id") Long id)
            throws IOException {
        String imagePath = id + ".jpg";
        String fullPath = System.getProperty("user.home") + "/images/" + imagePath;
        Files.createDirectories(Paths.get(System.getProperty("user.home") + "/images/"));
        Files.write(Paths.get(fullPath), file.getBytes());

        // Update imagePath in the database
        AIWrapper model = aiWrapperRepository.findById(id).orElse(null);
        if (model != null) {
            model.setImagePath(imagePath);
            aiWrapperRepository.save(model);
        }
    }

    @GetMapping(value = "/loadfromFS/{id}", produces = org.springframework.http.MediaType.IMAGE_JPEG_VALUE)
    public byte[] getImageFS(@PathVariable("id") Long id) throws IOException {
        String imagePath = id + ".jpg";
        java.nio.file.Path path = Paths.get(System.getProperty("user.home") + "/images/" + imagePath);
        if (Files.exists(path)) {
            return Files.readAllBytes(path);
        }
        return null; // Returns 204 No Content/Empty which is better than 403/500
    }
}
