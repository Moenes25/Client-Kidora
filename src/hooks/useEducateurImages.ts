// hooks/useEducateurImages.ts
import { useState, useEffect } from 'react';
import { Educateur } from '../components/tables/Educateurs/Types';
import { imageApi } from '../services/api/imageService';

export const useEducateurImages = (educateurs: Educateur[]) => {
  const [imageCache, setImageCache] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImages = async () => {
      const newCache: Record<string, string> = {};
      
      // Limiter à 10 images pour les performances
      const educateursToLoad = educateurs.slice(0, 10);
      
      for (const educateur of educateursToLoad) {
        if (educateur.image && !imageCache[educateur.id]) {
          try {
            const imageUrl = await imageApi.getImage(educateur.image);
            newCache[educateur.id] = imageUrl;
          } catch (error) {
            newCache[educateur.id] = '/default-avatar.png';
          }
        }
      }
      
      setImageCache(prev => ({ ...prev, ...newCache }));
    };

    if (educateurs.length > 0) {
      loadImages();
    }
  }, [educateurs]);

  // Nettoyage
  useEffect(() => {
    return () => {
      Object.values(imageCache).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imageCache]);

  const getImage = (educateur: Educateur): string => {
    if (!educateur.image) return '/default-avatar.png';
    return imageCache[educateur.id] || '/placeholder-avatar.png';
  };

  return { getImage };
};