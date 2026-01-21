import apiClient from './axiosConfig';

// Types d'enfant basés sur votre backend
export interface EnfantRequest {
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  parentId?: string;
  
}

export interface EnfantResponse {
  idEnfant: string;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  imageUrl: string;
  parentId: string;
  classeNom: string;
}

// Type pour le frontend (à adapter selon vos besoins)
export interface EnfantFrontend {
  id: string;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  imageUrl: string;
  parentId: string;
  parent: {
    nom: string;
    prenom: string;
    imageUrl?: string;
  };
  statut?: 'actif' | 'inactif' | 'en_attente';
  dateInscription?: string;
  dernierAcces?: string;
}

export const enfantApi = {
  // 1. Récupérer tous les enfants
  getAllEnfants: async (): Promise<EnfantResponse[]> => {
    try {
      const response = await apiClient.get<EnfantResponse[]>('/enfants/AllEnfant');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Erreur lors de la récupération des enfants');
    }
  },

  // 2. Récupérer les enfants d'un parent spécifique
  getEnfantsByParent: async (parentId: string): Promise<EnfantResponse[]> => {
    try {
      const response = await apiClient.get<EnfantResponse[]>(`/enfants/BYIdPrent/${parentId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Erreur lors de la récupération des enfants du parent');
    }
  },

  // 3. Ajouter un enfant
  ajouterEnfant: async (
    data: EnfantRequest,
    parentId: string,
    imageFile: File
  ): Promise<EnfantResponse> => {
    try {
      const formData = new FormData();
      
      // Créer l'objet enfant JSON
      const enfantJson = JSON.stringify({
        nom: data.nom,
        prenom: data.prenom,
        age: data.age,
        classe: data.classe
      });
      formData.append('image', imageFile);
      
      formData.append('enfant', enfantJson);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      const response = await apiClient.post<EnfantResponse>(
        '/enfants/ajouter',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Parent-Id': parentId
          }
        }
      );
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Erreur lors de l'ajout de l'enfant");
    }
  },

  // 4. Modifier un enfant
  updateEnfant: async (
    idEnfant: string,
    data: Partial<EnfantRequest>,
    imageFile?: File
  ): Promise<EnfantResponse> => {
    try {
      const formData = new FormData();
      
      // Filtrer les champs non définis
      const enfantData: any = {};
      if (data.nom !== undefined) enfantData.nom = data.nom;
      if (data.prenom !== undefined) enfantData.prenom = data.prenom;
      if (data.age !== undefined) enfantData.age = data.age;
      if (data.classe !== undefined) enfantData.classe = data.classe;
      if (data.parentId !== undefined) enfantData.parentId = data.parentId;
      
      formData.append('enfant', JSON.stringify(enfantData));
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      const response = await apiClient.put<EnfantResponse>(
        `/enfants/UpdateEnfant/${idEnfant}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Erreur lors de la modification de l'enfant");
    }
  },

  // 5. Supprimer un enfant
  deleteEnfant: async (idEnfant: string): Promise<void> => {
    try {
      await apiClient.delete(`/enfants/delet-enfnat/${idEnfant}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Erreur lors de la suppression de l'enfant");
    }
  },

  // 6. Fonction utilitaire pour convertir l'API en format frontend
  convertToFrontendFormat: (enfant: EnfantResponse, parentInfo?: any): EnfantFrontend => {
    return {
      id: enfant.idEnfant,
      nom: enfant.nom,
      prenom: enfant.prenom,
      age: enfant.age,
      classe: enfant.classe,
      imageUrl: enfant.imageUrl || '/images/default-child.jpg',
      parentId: enfant.parentId,
      parent: parentInfo || {
        nom: 'Parent',
        prenom: 'Non',
        imageUrl: '/images/default-parent.jpg'
      },
      statut: 'actif', // À adapter selon votre logique
      dateInscription: new Date().toISOString().split('T')[0],
      dernierAcces: new Date().toISOString().split('T')[0]
    };
  },

  // 7. Fonction pour télécharger une image
  uploadImage: async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post<{ url: string }>('/enfants/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.url;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Erreur lors du téléchargement de l'image");
    }
  },
   getEnfantsByClasse: async (classeId: string): Promise<EnfantResponse[]> => {
    try {
      const response = await apiClient.get<EnfantResponse[]>(`/enfants/enfants-by-classe/${classeId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Erreur lors de la récupération des enfants par classe');
    }
  },
};