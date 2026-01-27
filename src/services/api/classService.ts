import apiClient from "./axiosConfig";
export interface ClasseRequestDto {
  nom_classe: string;
  description_classe?: string;
  trancheAge: string; 
  couleur_classe: string;
  capacite: number;
  salle?: string;
}

export interface ClasseResponseDto {
  id: string;
  nom_classe: string;
  description_classe?: string;
  trancheAge: string;
  couleur_classe: string;
  capacite: number;
  salle?: string;
  created_by_id: string;
  created_by_nom: string;
}

export interface AgeRangeOption {
  value: string;
  label: string;
  description?: string;
}

export const classService = {
     getAllClasses: async (): Promise<ClasseResponseDto[]> => {
    try {
      const response = await apiClient.get('/classes/all');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des classes:', error);
      throw error;
    }
  },

  createClass: async (classeData: ClasseRequestDto): Promise<ClasseResponseDto> => {
    try {
      const validAgeRanges = ['4-5 ans', '5-6 ans', '6-7 ans', '8-9 ans', '10-11 ans'];
      if (!validAgeRanges.includes(classeData.trancheAge)) {
        throw new Error(`Tranche d'âge invalide. Valeurs acceptées: ${validAgeRanges.join(', ')}`);
      }
      
      const response = await apiClient.post('/classes/ajouter', classeData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la classe:', error);
      throw error;
    }
  },

  getAgeRangeOptions: (): AgeRangeOption[] => {
    return [
      { value: '4-5 ans', label: '4-5 ans' },
      { value: '5-6 ans', label: '5-6 ans' },
      { value: '6-7 ans', label: '6-7 ans' },
      { value: '8-9 ans', label: '8-9 ans' },
      { value: '10-11 ans', label: '10-11 ans' },
    ];
  },

  /**
   * Options pour les couleurs
   */
  getColorOptions: () => {
    return [
      { value: 'blue', label: 'Bleu', bg: 'bg-blue-100', text: 'text-blue-600' },
      { value: 'green', label: 'Vert', bg: 'bg-green-100', text: 'text-green-600' },
      { value: 'purple', label: 'Violet', bg: 'bg-purple-100', text: 'text-purple-600' },
      { value: 'orange', label: 'Orange', bg: 'bg-orange-100', text: 'text-orange-600' },
      { value: 'pink', label: 'Rose', bg: 'bg-pink-100', text: 'text-pink-600' },
      { value: 'indigo', label: 'Indigo', bg: 'bg-indigo-100', text: 'text-indigo-600' },
    ];
  }
}

export default classService;