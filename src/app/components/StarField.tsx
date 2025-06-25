"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDelay: number;
  animationDuration: number;
  twinkleIntensity: number; // 0 = pas de scintillement, 1 = scintillement léger, 2 = scintillement fort
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
    // Étoiles avec animations et couleurs
    const starCount = isMobile ? 30 : 60;

    // Couleurs variées
    const starColors = [
      "#ffffff", // Blanc
      "#87CEEB", // Bleu ciel
      "#FFD700", // Or
      "#FFA500", // Orange
      "#FFB6C1", // Rose clair
    ];

    // Générer étoiles avec animations
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5, // Tailles moyennes
      color: starColors[Math.floor(Math.random() * starColors.length)],
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 2 + 2,
      twinkleIntensity: Math.random() < 0.5 ? 2 : Math.random() < 0.8 ? 1 : 0, // 50% scintillement fort, 30% léger, 20% pas de scintillement
    }));

    setStars(newStars);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes twinkle-strong {
            0%, 100% { opacity: 0.2; transform: scale(0.6); }
            25% { opacity: 0.9; transform: scale(1.3); }
            50% { opacity: 1; transform: scale(1.8); }
            75% { opacity: 0.7; transform: scale(1.4); }
          }
          
          @keyframes twinkle-light {
            0%, 100% { opacity: 0.4; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.4); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
          }
          
          .star-animation {
            animation: float calc(var(--duration) * 2) ease-in-out infinite var(--delay);
          }
          
          .star-twinkle-strong {
            animation: twinkle-strong var(--duration) ease-in-out infinite var(--delay),
                       float calc(var(--duration) * 2) ease-in-out infinite var(--delay);
          }
          
          .star-twinkle-light {
            animation: twinkle-light var(--duration) ease-in-out infinite var(--delay),
                       float calc(var(--duration) * 2) ease-in-out infinite var(--delay);
          }
        `,
        }}
      />

      {stars.map((star) => {
        let className = "absolute rounded-full";

        if (star.twinkleIntensity === 2) {
          className += " star-twinkle-strong";
        } else if (star.twinkleIntensity === 1) {
          className += " star-twinkle-light";
        } else {
          className += " star-animation";
        }

        return (
          <div
            key={star.id}
            className={className}
            style={
              {
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.color,
                "--delay": `${star.animationDelay}s`,
                "--duration": `${star.animationDuration}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
};

export default StarField;
