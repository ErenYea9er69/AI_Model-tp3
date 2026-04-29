package com.aiwrapped.aiwrappers.repos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.aiwrapped.aiwrappers.entities.AIWrapper;
import com.aiwrapped.aiwrappers.entities.AITheme;

@RepositoryRestResource(path = "rest")
public interface AIWrapperRepository extends JpaRepository<AIWrapper, Long> {

    List<AIWrapper> findByNomWrapper(String nom);
    List<AIWrapper> findByNomWrapperContains(String nom);

    @Query("select p from AIWrapper p where p.nomWrapper like %:nom and p.prixWrapper > :prix")
    List<AIWrapper> findByNomPrix(@Param("nom") String nom, @Param("prix") Double prix);

    @Query("select p from AIWrapper p where p.aiTheme = ?1")
    List<AIWrapper> findByAITheme(AITheme theme);

    List<AIWrapper> findByAiThemeIdTheme(Long id);

    List<AIWrapper> findByOrderByNomWrapperAsc();

    @Query("select p from AIWrapper p order by p.nomWrapper ASC, p.prixWrapper DESC")
    List<AIWrapper> trierAINomsPrix();
}
