package com.nadhem.aiwrappers.dto;

import java.util.Date;
import java.util.List;
import com.nadhem.aiwrappers.entities.AITheme;
import com.nadhem.aiwrappers.entities.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIWrapperDTO {
    private Long idWrapper;
    private String nomWrapper;
    private Double prixWrapper;
    private Date dateCreation;
    private AITheme aiTheme;
    private String nomTheme;
    private String imagePath;
    private List<Image> images;
}
