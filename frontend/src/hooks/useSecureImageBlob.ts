// hooks/useSecureImageBlob.ts
import { useState, useEffect } from 'react';
import { authApi } from '../services/api/authApi'; // Ajustez le chemin

export const useSecureImageBlob = (imagePath: string) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let blobUrl: string | null = null;

    const loadImage = async () => {
      if (!imagePath) {
        setImageUrl('/images/default-child.jpg');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const blob = await authApi.getImage(imagePath);
        
        if (isMounted) {
          blobUrl = URL.createObjectURL(blob);
          setImageUrl(blobUrl);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Erreur chargement image:', err);
          setError(err.message);
          setImageUrl('/images/default-child.jpg');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadImage();

    // Cleanup
    return () => {
      isMounted = false;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [imagePath]);

  return { imageUrl, isLoading, error };
};