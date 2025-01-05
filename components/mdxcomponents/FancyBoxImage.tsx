'use client'
import NextImage, { ImageProps } from "next/image";
import siteMetadata from '@/data/siteMetadata'

interface ImageWithFancyboxProps extends ImageProps {
  src: string; // Source obligatoire
  alt: string; // Texte alternatif obligatoire
  noShadow?: boolean;
}

const FancyBoxImage = ({ alt, src, noShadow, ...rest }: ImageWithFancyboxProps) => {
  const isExternal = src.startsWith('http'); // Vérifie si l'URL est externe

  // Génère une URL optimisée pour les images internes
  const generateOptimizedSrc = (src: string): string => {
    if (isExternal) return src; // Pas d'optimisation pour les images externes

    const basePath = process.env.NEXT_PUBLIC_SITE_URL || siteMetadata.siteUrl;;
    return `${basePath}/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;
  };

  // Génère la source optimisée pour FancyBox
  const optimizedSrc = generateOptimizedSrc(src);

  const shadow = noShadow ? "" : "shadow-xl shadow-gray-400 dark:shadow-gray-950"

  const imageContent = isExternal ? (
    // Si l'image est externe, on utilise une balise <img> standard
    <img alt={alt} src={src} {...rest} className={`rounded-lg ${shadow}`}/>
  ) : (
    <NextImage 
      {...rest} 
      src={src} 
      alt={alt} 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-cover rounded-lg ${shadow}`}
      />
  );

  // Fonction pour enlever le focus du bouton avant d'ouvrir la modale
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const button = e.currentTarget as HTMLElement;
    button.blur(); // Enlève le focus du bouton
  };
  
  return (
    <div 
      className="fancybox-wrapper" 
      data-fancybox="gallery" 
      data-src={optimizedSrc} 
      aria-label={alt}
      role="button" // Indique qu'il s'agit d'un bouton pour l'accessibilité
      tabIndex={0}  // Rend focusable
      onClick={handleClick}
    >
      {imageContent}
    </div>
  );
};

export default FancyBoxImage;
