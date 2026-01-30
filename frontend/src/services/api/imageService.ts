// services/imageService.ts
import axios, { AxiosInstance } from 'axios';

// Créer un client axios DÉDIÉ aux images
const createImageClient = (): AxiosInstance => {
  const imageClient = axios.create({
    baseURL: 'http://localhost:8086', // Pas de /api ici !
    timeout: 15000, // Plus long timeout pour les images
  });

  // Ajouter le token si nécessaire
  imageClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return imageClient;
};

// Instancier le client
const imageClient = createImageClient();

export const imageApi = {
  /**
   * Récupère une image avec authentification
   */
  getImage: async (imagePath: string): Promise<string> => {
    try {
      // Nettoyer le chemin
      let cleanPath = imagePath.trim();
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
      }

      const response = await imageClient.get(`/${cleanPath}`, {
        responseType: 'blob',
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error: any) {
      console.error('Erreur de chargement d\'image:', error);
      throw new Error('Impossible de charger l\'image');
    }
  },

  /**
   * Vérifie si une image existe
   */
  checkImageExists: async (imagePath: string): Promise<boolean> => {
    try {
      let cleanPath = imagePath.trim();
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
      }

      await imageClient.head(`/${cleanPath}`);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Méthode simple si l'image est publique
   */
  getImageUrl: (imagePath: string): string => {
    if (!imagePath) return '/default-avatar.png';
    
    let cleanPath = imagePath.trim();
    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.substring(1);
    }
    
    return `http://localhost:8086/${encodeURI(cleanPath)}`;
  }
};

export default imageApi;