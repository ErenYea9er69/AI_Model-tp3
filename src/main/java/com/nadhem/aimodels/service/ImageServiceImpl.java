package com.nadhem.aimodels.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.nadhem.aimodels.entities.AIModel;
import com.nadhem.aimodels.entities.Image;
import com.nadhem.aimodels.repos.AIModelRepository;
import com.nadhem.aimodels.repos.ImageRepository;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    ImageRepository imageRepository;
    
    @Autowired
    AIModelRepository aiModelRepository;

    @Override
    public Image uplaodImage(MultipartFile file) throws IOException {
        return imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(file.getBytes()).build());
    }

    @Override
    public Image getImageDetails(Long id) throws IOException {
        final Optional<Image> dbImage = imageRepository.findById(id);
        return Image.builder()
                .idImage(dbImage.get().getIdImage())
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(dbImage.get().getImage()).build();
    }

    @Override
    public ResponseEntity<byte[]> getImage(Long id) throws IOException {
        final Optional<Image> dbImage = imageRepository.findById(id);
        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(dbImage.get().getImage());
    }

    @Override
    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }

    @Override
    public Image uplaodImageProd(MultipartFile file, Long idAI) throws IOException {
        AIModel p = new AIModel();
        p.setIdAI(idAI);
        return imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(file.getBytes())
                .aiModel(p).build());
    }

    @Override
    public List<Image> getImagesParProd(Long idAI) {
        AIModel p = aiModelRepository.findById(idAI).get();
        return p.getImages();
    }
}
