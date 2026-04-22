package com.nadhem.aiwrappers.service;

import java.io.IOException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.nadhem.aiwrappers.entities.Image;

public interface ImageService {
    Image uplaodImage(MultipartFile file) throws IOException;
    Image getImageDetails(Long id) throws IOException;
    ResponseEntity<byte[]> getImage(Long id) throws IOException;
    void deleteImage(Long id);
    Image uplaodImageProd(MultipartFile file, Long idWrapper) throws IOException;
    List<Image> getImagesParProd(Long idWrapper);
}
