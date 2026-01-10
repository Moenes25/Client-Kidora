import apiClient from './axiosConfig';
import { User, RoleUsers, StatutClient } from '../../types/auth.types';

export interface CreateParentDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  profession?: string;
  relation?: string;
  numTel?: string;
  adresse?: string;
  role: RoleUsers;
  statutClient?: StatutClient;
}


export interface UpdateParentDto {
  nom?: string;
  prenom?: string;
  profession?: string;
  relation?: string;
  numTel?: string;
  adresse?: string;
  statutClient?: StatutClient;
}


export interface CreateEducateurDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  specialisation?: string;
  experience?: number;
  disponibilite?: string;
  classe?: string;
  numTel?: string;
  adresse?: string;
  role: RoleUsers;
  statutClient?: StatutClient;
}

export interface UpdateEducateurDto {
  nom?: string;
  prenom?: string;
  specialisation?: string;
  experience?: number;
  disponibilite?: string;
  classe?: string;
  numTel?: string;
  adresse?: string;
  statutClient?: StatutClient;
}


export const clientApi = {


    getAllParents: async (): Promise<User[]> => {
        try {
        const response = await apiClient.get<User[]>('/client/parents');
        return response.data;
        } catch (error: any) {
        throw new Error(error.message || 'Erreur lors de la récupération des parents');
        }
    },

    createParent: async (parentData: CreateParentDto, imageFile?: File): Promise<User> => {
        try {
        const formData = new FormData();
        
        // Préparer les données pour correspondre à votre DTO backend
        const userData = {
            nom: parentData.nom,
            prenom: parentData.prenom,
            email: parentData.email,
            password: parentData.password,
            numTel: parentData.numTel || '',  // ⭐ Changé de "telephone" à "numTel"
            role: RoleUsers.PARENT,  // ⭐ Ajouter le rôle
            statutClient: parentData.statutClient || StatutClient.ACTIF,
            profession: parentData.profession || '',
            relation: parentData.relation || '',
        };
        
        formData.append('user', JSON.stringify(userData));

        
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }
        
        const response = await apiClient.post<User>('/client/register', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
        } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la création du parent";
        throw new Error(errorMessage);
        }
    },


    updateParent: async (id: string, updateData: UpdateParentDto, imageFile?: File): Promise<User> => {

        try {
            const formData = new FormData();
            
            // Ajouter chaque champ individuellement (comme dans votre backend)
            Object.entries(updateData).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                formData.append(key, value.toString());
                }
            });
            
            if (imageFile) {
                formData.append('imageFile', imageFile);
            }
            
            const response = await apiClient.put<User>(`/client/update-client/${id}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de la mise à jour du parent';
            throw new Error(errorMessage);
            }
        },

    deleteParent: async (id: string): Promise<void> => {
        try {
          await apiClient.delete(`/client/delete-client/${id}`);
        } catch (error: any) {
          throw new Error(error.message || "Erreur lors de la suppression du parent");
        }
    },

    getParentById: async (id: string): Promise<User> => {
        try {
         const response = await apiClient.get<User>(`/client/${id}`);
         return response.data;
        } catch (error: any) {
         throw new Error(error.message || 'Erreur lors de la récupération du parent');
        }
    },


    // Educateurs


     getAllEducateurs: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>('/client/educateurs');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la récupération des éducateurs');
    }
  },

  createEducateur: async (educateurData: CreateEducateurDto, imageFile?: File): Promise<User> => {
    try {
      const formData = new FormData();
      
      const userData = {
        nom: educateurData.nom,
        prenom: educateurData.prenom,
        email: educateurData.email,
        password: educateurData.password,
        numTel: educateurData.numTel || '',
        role: RoleUsers.EDUCATEUR,
        statutClient: educateurData.statutClient || StatutClient.ACTIF,
        specialisation: educateurData.specialisation || '',
        experience: educateurData.experience || 0,
        disponibilite: educateurData.disponibilite || 'disponible',
        classe: educateurData.classe || '',
        adresse: educateurData.adresse || '',
      };
      
      formData.append('user', JSON.stringify(userData));

      if (imageFile) {
        formData.append('imageFile', imageFile);
      }
      
      const response = await apiClient.post<User>('/client/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la création de l'éducateur";
      throw new Error(errorMessage);
    }
  },

  updateEducateur: async (id: string, updateData: UpdateEducateurDto, imageFile?: File): Promise<User> => {
    try {
      const formData = new FormData();
      
      Object.entries(updateData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value.toString());
        }
      });
      
      if (imageFile) {
        formData.append('imageFile', imageFile);
      }
      
      const response = await apiClient.put<User>(`/client/update-client/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la mise à jour de l'éducateur";
      throw new Error(errorMessage);
    }
  },

  deleteEducateur: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/client/delete-client/${id}`);
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la suppression de l'éducateur");
    }
  },

  getEducateurById: async (id: string): Promise<User> => {
    try {
      const response = await apiClient.get<User>(`/client/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la récupération de l'éducateur");
    }
  },
}