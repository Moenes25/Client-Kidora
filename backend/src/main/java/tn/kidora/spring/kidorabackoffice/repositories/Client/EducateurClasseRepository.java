package tn.kidora.spring.kidorabackoffice.repositories.Client;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import tn.kidora.spring.kidorabackoffice.entities.Client.EducateurClasse;

public interface EducateurClasseRepository extends MongoRepository<EducateurClasse, String>  {
    List<EducateurClasse> findByEducateur_Id(String educateurId);
    List<EducateurClasse> findByClasse_Id(String classeId);
    Optional<EducateurClasse> findByEducateur_IdAndClasse_Id(String educateurId, String classeId);
    boolean existsByEducateur_IdAndClasse_Id(String educateurId, String classeId);
}

