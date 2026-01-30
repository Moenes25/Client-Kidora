// hooks/useImage.ts
import { useState, useEffect } from 'react';
import { imageApi } from '../services/api/imageService';

interface UseImageOptions {
  requireAuth?: boolean;
  defaultImage?: string;
}

export const useImage = (imagePath: string | null, options: UseImageOptions = {}) => {
  const { requireAuth = false, defaultImage = '/default-avatar.png' } = options;
  
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);
  const [loading, setLoading] = useState<boolean>(!!imagePath);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imagePath) {
      setImageUrl(defaultImage);
      setLoading(false);
      return;
    }

    const loadImage = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url: string;
        
        if (requireAuth) {
          // Avec authentification
          url = await imageApi.getImage(imagePath);
        } else {
          // Sans authentification - URL directe
          url = imageApi.getImageUrl(imagePath);
          
          // Option: Vérifier que l'image existe
          // const exists = await imageApi.checkImageExists(imagePath);
          // if (!exists) throw new Error('Image non trouvée');
        }
        
        setImageUrl(url);
      } catch (err: any) {
        setError(err.message);
        setImageUrl(defaultImage);
      } finally {
        setLoading(false);
      }
    };

    loadImage();

    // Nettoyage
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imagePath, requireAuth, defaultImage]);

  return { imageUrl, loading, error };
};