import React from "react";

interface CircularTimerUnitProps {
  value: number;
  max: number;
  label: string;
  color: string; // ex: "#22d3ee"
  size?: number; // taille du cercle en px
}

const DEFAULT_SIZE = 120;
const STROKE = 6;

const CircularTimerUnit: React.FC<CircularTimerUnitProps> = ({
  value,
  max,
  label,
  color,
  size = DEFAULT_SIZE,
}) => {
  const RADIUS = size / 2 - STROKE / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  // Calcul du pourcentage de progression
  const percent = max === 0 ? 0 : value / max;
  const offset = CIRCUMFERENCE * (1 - percent);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="mb-2">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke="#22293a"
          strokeWidth={STROKE}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke={color}
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s linear" }}
        />
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.21}
          fill={color}
          fontFamily="'Poppins', 'Montserrat', 'Roboto', Arial, sans-serif"
          fontWeight="bold"
        >
          {value.toString().padStart(2, "0")}
        </text>
      </svg>
      <span
        className="text-gray-100 tracking-widest text-sm uppercase drop-shadow-sm"
        style={{
          letterSpacing: 2,
          fontFamily: "'Poppins', 'Montserrat', 'Roboto', Arial, sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default CircularTimerUnit;
