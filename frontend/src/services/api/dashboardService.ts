import { enfantApi, EnfantResponse } from './enfantApi';
import { classService, ClasseResponseDto } from './classService';

export interface ClasseWithChildren {
  classe: ClasseResponseDto;
  enfants: EnfantResponse[];
  childrenCount: number;
  occupancyRate: number;
}

export interface EnfantWithClass extends EnfantResponse {
  classeNom: string;
  couleurClasse: string;
}

export const dashboardService = {
  // Récupérer toutes les classes avec leurs enfants
  getAllClassesWithChildren: async (): Promise<ClasseWithChildren[]> => {
    try {
      // Récupérer toutes les classes
      const classes = await classService.getAllClasses();
      
      // Pour chaque classe, récupérer les enfants
      const classesWithChildren = await Promise.all(
        classes.map(async (classe) => {
          try {
            const enfants = await enfantApi.getEnfantsByClasse(classe.id);
            const childrenCount = enfants.length;
            const occupancyRate = classe.capacite > 0 ? (childrenCount / classe.capacite) * 100 : 0;
            
            return {
              classe,
              enfants,
              childrenCount,
              occupancyRate
            };
          } catch (error) {
            console.error(`Erreur lors de la récupération des enfants pour la classe ${classe.nom_classe}:`, error);
            return {
              classe,
              enfants: [],
              childrenCount: 0,
              occupancyRate: 0
            };
          }
        })
      );
      
      return classesWithChildren;
    } catch (error) {
      console.error('Erreur dans getAllClassesWithChildren:', error);
      throw error;
    }
  },

  // Récupérer les enfants d'une classe spécifique
  getEnfantsByClasseId: async (classeId: string): Promise<EnfantWithClass[]> => {
    try {
      const enfants = await enfantApi.getEnfantsByClasse(classeId);
      let classeInfo: { nom_classe: string; couleur_classe: string } | null = null;
      
      // Si vous voulez ajouter des infos sur la classe
      if (enfants.length > 0) {
        try {
          const classes = await classService.getAllClasses();
          const classe = classes.find(c => c.id === classeId);
          if (classe) {
          classeInfo = {
            nom_classe: classe.nom_classe,
            couleur_classe: classe.couleur_classe
          };
        }
          
          // return enfants.map(enfant => ({
          //   ...enfant,
          //   classeNom: classe?.nom_classe,
          //   couleurClasse: classe?.couleur_classe
          // }));
        } catch {
          // return enfants;
          console.warn('Impossible de récupérer les infos de la classe:');
        }
      }
      
      // return enfants;
      return enfants.map(enfant => {
        // Si enfant a déjà une classe, utiliser celle-ci
        const existingClasse = enfant.classe || classeInfo?.nom_classe || 'Non assigné';
        
        return {
          ...enfant,
          classeNom: classeInfo?.nom_classe || existingClasse,
          couleurClasse: classeInfo?.couleur_classe || 'blue',
          // S'assurer que les champs obligatoires sont présents
          idEnfant: enfant.idEnfant,
          nom: enfant.nom,
          prenom: enfant.prenom,
          age: enfant.age,
          classe: existingClasse,
          imageUrl: enfant.imageUrl || '',
          parentId: enfant.parentId
        };
      });
    } catch (error) {
      console.error(`Erreur lors de la récupération des enfants pour la classe ${classeId}:`, error);
      throw error;
    }
  },

  // Statistiques globales
  getDashboardStats: async () => {
    try {
      const classes = await classService.getAllClasses();
      const allEnfants = await enfantApi.getAllEnfants();
      
      const totalClasses = classes.length;
      const totalEnfants = allEnfants.length;
      const totalCapacity = classes.reduce((sum, classe) => sum + classe.capacite, 0);
      const globalOccupancyRate = totalCapacity > 0 ? (totalEnfants / totalCapacity) * 100 : 0;
      
      // Distribution par classe
      const classesWithStats = await Promise.all(
        classes.map(async (classe) => {
          const enfants = await enfantApi.getEnfantsByClasse(classe.id);
          return {
            ...classe,
            currentEnfants: enfants.length,
            occupancyRate: classe.capacite > 0 ? (enfants.length / classe.capacite) * 100 : 0
          };
        })
      );
      
      return {
        totalClasses,
        totalEnfants,
        totalCapacity,
        globalOccupancyRate,
        classesWithStats
      };
    } catch (error) {
      console.error('Erreur dans getDashboardStats:', error);
      throw error;
    }
  }
};