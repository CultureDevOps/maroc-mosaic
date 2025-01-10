"use client"

import { useTranslation } from 'app/[locale]/i18n/client';
import { createTranslation } from 'app/[locale]/i18n/server';
import { LocaleTypes } from 'app/[locale]/i18n/settings';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type Props = {
  params: { locale: LocaleTypes };
};

const images = [
  '/static/images/pages/sols-mosaiques/sol-01.png',
  '/static/images/assets/fontaine-02-enhanced.png',
  '/static/images/pages/tapisseries-eclats-marbre/tapisserie-01-white.png',
];

export default function Hero({ params: { locale } }: Props) {
  const { t } = useTranslation(locale, 'hero');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      console.log('Current Index:', currentIndex); // Vérifie la mise à jour de l'index
    }, 12000);
    return () => clearInterval(interval);
  }, []); // Ajout du currentIndex comme dépendance

  return (
    <div className="relative overflow-hidden" style={{ minHeight: '70vh' }}>
      {/* Diaporama */}
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Slide ${index + 1}`}
          fill
          quality={90}
          priority={index === 0} // Optimize for the first image
          className={`object-cover pointer-events-none z-[-1] transition-opacity duration-[3000ms] ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

    </div>
  );
}
