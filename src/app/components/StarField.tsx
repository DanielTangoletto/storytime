"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const StarField: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détecter si on est sur mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Optimisations ultra-drastiques pour Lighthouse
    const starCount = isMobile ? 20 : 40; // Beaucoup moins d'étoiles

    // Générer étoiles statiques (pas d'animations)
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5, // Étoiles très petites
      opacity: Math.random() * 0.3 + 0.7, // Opacité très visible
    }));

    setStars(newStars);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {/* Étoiles statiques uniquement */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
