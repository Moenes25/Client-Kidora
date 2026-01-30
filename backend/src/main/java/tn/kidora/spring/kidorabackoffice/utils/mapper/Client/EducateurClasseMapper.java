package tn.kidora.spring.kidorabackoffice.utils.mapper.Client;

import org.springframework.stereotype.Service;
import tn.kidora.spring.kidorabackoffice.dto.Client.EducateurClasseResponseDTO;
import tn.kidora.spring.kidorabackoffice.entities.Client.Classes;
import tn.kidora.spring.kidorabackoffice.entities.Client.EducateurClasse;
import tn.kidora.spring.kidorabackoffice.entities.Client.Users;

@Service
public class EducateurClasseMapper {

    public EducateurClasseResponseDTO mapToResponseDTO(EducateurClasse assignation) {
        Users e = assignation != null ? assignation.getEducateur() : null;
        Classes c = assignation != null ? assignation.getClasse() : null;

        EducateurClasseResponseDTO dto = new EducateurClasseResponseDTO();
        dto.setId(assignation != null ? assignation.getId() : null);

        // Champs éducateur (null-safe)
        dto.setEducateurId(e != null ? e.getId() : null);
        dto.setEducateurNom(e != null ? e.getNom() : null);
        dto.setEducateurPrenom(e != null ? e.getPrenom() : null);

        // Champs classe (null-safe)
        dto.setClasseId(c != null ? c.getId() : null);
        dto.setClasseNom(c != null ? c.getNom_classe() : null);

        // Timestamps
        dto.setDateAssignation(assignation != null ? assignation.getDateAssignation() : null);
        dto.setCreatedAt(assignation != null ? assignation.getCreatedAt() : null);
        dto.setUpdatedAt(assignation != null ? assignation.getUpdatedAt() : null);

        return dto;
    }
}
