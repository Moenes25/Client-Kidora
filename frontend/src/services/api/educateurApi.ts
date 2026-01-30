import { CreateEducateurDto, UpdateEducateurDto } from "../../components/tables/Educateurs/Types";
import { RoleUsers, StatutClient, User } from "../../types/auth.types";
import apiClient from "./axiosConfig";

export const educateurApi = {


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