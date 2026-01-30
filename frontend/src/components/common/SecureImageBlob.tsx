// components/common/SecureImageBlob.tsx
import React from 'react';
import { useSecureImageBlob } from '../../hooks/useSecureImageBlob'; // Ajustez le chemin

interface SecureImageBlobProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
}

const SecureImageBlob: React.FC<SecureImageBlobProps> = ({
  src,
  alt,
  className,
  width,
  height,
  fallbackSrc = '/images/default-child.jpg'
}) => {
  const { imageUrl, isLoading } = useSecureImageBlob(src);

  if (isLoading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse rounded-full ${className}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={(e) => {
        console.error('Erreur affichage image blob:', src);
        e.currentTarget.src = fallbackSrc;
      }}
    />
  );
};

export default SecureImageBlob;