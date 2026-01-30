import apiClient from "./axiosConfig";

export interface EducateurClasseRequestDto {
  educateurId: string;
  classeId: string;
  dateAssignation?: string; 
}

export interface EducateurClasseResponseDTO {
  id: string;
  educateurId: string;
  educateurNom: string;
  educateurPrenom: string;
  classeId: string;
  classeNom: string;
  dateAssignation: string;
  createdAt: string;
  updatedAt: string;
}

export const educateurClasseApi ={
    assignerEducateurAClasse: async (data: EducateurClasseRequestDto): Promise<EducateurClasseResponseDTO> => {
    try {
      const response = await apiClient.post<EducateurClasseResponseDTO>('/educateur-classe/save', data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de l'assignation";
      throw new Error(errorMessage);
    }
  },

  getClassesByEducateur: async (educateurId: string): Promise<EducateurClasseResponseDTO[]> => {
    try {
      const response = await apiClient.get<EducateurClasseResponseDTO[]>(`/educateur-classe/${educateurId}/classes`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la récupération des classes";
      throw new Error(errorMessage);
    }
  },
  getAllAssignations: async (): Promise<EducateurClasseResponseDTO[]> => {
    try {
      const response = await apiClient.get<EducateurClasseResponseDTO[]>('/educateur-classe/all');
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la récupération des assignations";
      throw new Error(errorMessage);
    }
  },
  updateEducateurClasse : async (id: string, data: EducateurClasseRequestDto): Promise<EducateurClasseResponseDTO> => {
    try {
      const response = await apiClient.put<EducateurClasseResponseDTO>(`/educateur-classe/${id}`, data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la mise à jour";
      throw new Error(errorMessage);
    }
  },
  deleteEducateurClasse: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/educateur-classe/delete/${id}`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la suppression";
      throw new Error(errorMessage);
    }
  },
  getEducateursByClasse: async (classeId: string): Promise<EducateurClasseResponseDTO[]> => {
    try {
      const response = await apiClient.get<EducateurClasseResponseDTO[]>(
        `/educateur-classe/${classeId}/educateurs`
      );
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la récupération des éducateurs";
      throw new Error(errorMessage);
    }
  }
}