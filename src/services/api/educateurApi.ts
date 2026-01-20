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
    console.log("createEducateur : ", educateurData);
    try {
      const formData = new FormData();
      
      // const userData = {
      //   nom: educateurData.nom,
      //   prenom: educateurData.prenom,
      //   email: educateurData.email,
      //   password: educateurData.password,
      //   numTel: educateurData.numTel || '',
      //   role: RoleUsers.EDUCATEUR,
      //   statutClient: educateurData.statutClient || StatutClient.ACTIF,
      //   specialisation: educateurData.specialisation || '',
      //   experience: educateurData.experience || 0,
      //   disponibilite: educateurData.disponibilite || 'disponible',
      //   adresse: educateurData.adresse || '',
      // };
      
      // formData.append('user', JSON.stringify(userData));

      // if (imageFile) {
      //   formData.append('image', imageFile);
      // }
    formData.append('nom', educateurData.nom);
    formData.append('prenom', educateurData.prenom);
    formData.append('email', educateurData.email);
    formData.append('password', educateurData.password);
    formData.append('role', RoleUsers.EDUCATEUR);
    
    // Paramètres optionnels
    if (educateurData.numTel) formData.append('numTel', educateurData.numTel);
    if (educateurData.adresse) formData.append('adresse', educateurData.adresse);
    if (educateurData.specialisation) formData.append('specialisation', educateurData.specialisation);
    if (educateurData.experience !== undefined) formData.append('experience', educateurData.experience.toString());
    if (educateurData.disponibilite) formData.append('disponibilite', educateurData.disponibilite);
    if (educateurData.statutClient) formData.append('statutClient', educateurData.statutClient);
    
    if (imageFile) {
      formData.append('image', imageFile); 
    }
      const response = await apiClient.post<User>('/client/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Erreur détaillée createEducateur:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la création de l'éducateur";
      throw new Error(errorMessage);
    }
  },

  updateEducateur: async (id: string, updateData: UpdateEducateurDto, imageFile?: File): Promise<User> => {
    try {
      const formData = new FormData();
    if (updateData.nom) formData.append('nom', updateData.nom);
    if (updateData.prenom) formData.append('prenom', updateData.prenom);
    if (updateData.numTel) formData.append('numTel', updateData.numTel);
    if (updateData.adresse) formData.append('adresse', updateData.adresse);
    if (updateData.specialisation) formData.append('specialisation', updateData.specialisation);
    if (updateData.experience !== undefined) formData.append('experience', updateData.experience.toString());
    if (updateData.disponibilite) formData.append('disponibilite', updateData.disponibilite);
    if (updateData.statutClient) formData.append('statutClient', updateData.statutClient);
    
      
      // Object.entries(updateData).forEach(([key, value]) => {
      //   if (value !== undefined && value !== null && value !== '') {
      //     formData.append(key, value.toString());
      //   }
      // });
      
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