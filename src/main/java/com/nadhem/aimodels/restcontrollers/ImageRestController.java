package com.nadhem.aimodels.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.nadhem.aimodels.entities.Image;
import com.nadhem.aimodels.service.ImageService;
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

    @PostMapping("/uplaodImageProd/{idAI}")
    public Image uploadMultiImages(@RequestParam("image") MultipartFile file, @PathVariable("idAI") Long idAI)
            throws IOException {
        return imageService.uplaodImageProd(file, idAI);
    }

    @GetMapping("/getImagesProd/{idAI}")
    public List<Image> getImagesProd(@PathVariable("idAI") Long idAI) throws IOException {
        return imageService.getImagesParProd(idAI);
    }

    @PostMapping("/uploadFS/{id}")
    public void uploadImageFS(@RequestParam("image") MultipartFile file, @PathVariable("id") Long id)
            throws IOException {
        // Here we would normally interact with AIModelService to set the path,
        // but for now we follow the pattern of direct FS write.
        // In a real scenario, you'd save the path in the DB.
        String imagePath = id + ".jpg";
        String fullPath = System.getProperty("user.home") + "/images/" + imagePath;
        Files.createDirectories(Paths.get(System.getProperty("user.home") + "/images/"));
        Files.write(Paths.get(fullPath), file.getBytes());
    }

    @GetMapping(value = "/loadfromFS/{id}", produces = org.springframework.http.MediaType.IMAGE_JPEG_VALUE)
    public byte[] getImageFS(@PathVariable("id") Long id) throws IOException {
        String imagePath = id + ".jpg";
        return Files.readAllBytes(Paths.get(System.getProperty("user.home") + "/images/" + imagePath));
    }
}
