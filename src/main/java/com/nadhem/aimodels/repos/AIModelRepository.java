package com.nadhem.aimodels.repos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.nadhem.aimodels.entities.AIModel;
import com.nadhem.aimodels.entities.AICategory;

public interface AIModelRepository extends JpaRepository<AIModel, Long> {

    List<AIModel> findByNomAI(String nom);
    List<AIModel> findByNomAIContains(String nom);

    @Query("select p from AIModel p where p.nomAI like %:nom and p.prixAI > :prix")
    List<AIModel> findByNomPrix(@Param("nom") String nom, @Param("prix") Double prix);

    @Query("select p from AIModel p where p.aiCategory = ?1")
    List<AIModel> findByAICategory(AICategory category);

    List<AIModel> findByAICategoryIdCat(Long id);

    List<AIModel> findByOrderByNomAIAsc();

    @Query("select p from AIModel p order by p.nomAI ASC, p.prixAI DESC")
    List<AIModel> trierAINomsPrix();
}
