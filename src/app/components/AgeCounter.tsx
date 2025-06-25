"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import CircularTimerUnit from "./CircularTimerUnit";
import DatePicker from "./DatePicker";

// Date de naissance initiale
const INITIAL_BIRTH_DATE = new Date("1990-03-20T14:00:00");

function getElapsedParts(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    // Nombre de jours dans le mois précédent
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  // Calcul des semaines
  const weeks = Math.floor(days / 7);
  days = days % 7;

  return { years, months, weeks, days, hours, minutes, seconds };
}

const AgeCounter: React.FC = () => {
  const [now, setNow] = useState<Date | null>(null);
  const [birthDate, setBirthDate] = useState(INITIAL_BIRTH_DATE);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialiser la date seulement côté client
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen]);

  // Calculer les valeurs seulement si now est défini
  const elapsedParts = useMemo(() => {
    if (!now) return { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return getElapsedParts(birthDate, now);
  }, [birthDate, now]);

  const units = useMemo(
    () => [
      { value: elapsedParts.years, max: 300, label: "Ans" },
      { value: elapsedParts.months, max: 12, label: "Mois" },
      { value: elapsedParts.weeks, max: 4, label: "Semaines" },
      { value: elapsedParts.days, max: 7, label: "Jours" },
      { value: elapsedParts.hours, max: 24, label: "Heures" },
      { value: elapsedParts.minutes, max: 60, label: "Minutes" },
      { value: elapsedParts.seconds, max: 60, label: "Secondes" },
    ],
    [elapsedParts]
  );

  const formattedDate = useMemo(() => {
    if (!now) return "";
    return now.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [now]);

  const formattedTime = useMemo(() => {
    if (!now) return "";
    return now.toLocaleTimeString("fr-FR", { hour12: false });
  }, [now]);

  const formattedBirthDate = useMemo(
    () =>
      birthDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [birthDate]
  );

  const formattedBirthTime = useMemo(
    () =>
      birthDate.toLocaleTimeString("fr-FR", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
    [birthDate]
  );

  const handleDateChange = (newDate: Date) => {
    setBirthDate(newDate);
  };

  // Ne rendre le contenu que si now est défini (côté client)
  if (!now) {
    return (
      <div className="min-h-screen bg-gradient-animated flex flex-col items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-2 text-center pulse-text gradient-text">
            Le temps défile..
          </h1>
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-300 text-center">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-animated flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      {/* Date et heure en haut à gauche */}
      <div className="absolute top-6 left-6 z-20 text-left hidden sm:block">
        <div className="text-gray-300 text-sm mb-1">{formattedDate}</div>
        <div className="text-white text-xl font-bold tracking-wider">{formattedTime}</div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-2 text-center pulse-text gradient-text">
          Le temps défile..
        </h1>
        <div className="flex flex-col items-center mb-6">
          <p className="text-gray-300 text-center">
            Depuis le {formattedBirthDate} à {formattedBirthTime} (Heure FR)
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl">
          {units.map((unit) => (
            <CircularTimerUnit
              key={unit.label}
              value={unit.value % unit.max}
              max={unit.max}
              label={unit.label}
              color="#fff"
            />
          ))}
        </div>
      </div>

      {/* Bouton en bas à droite */}
      <div className="fixed bottom-6 right-6 z-20" ref={datePickerRef}>
        <button
          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          className="group relative px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-gray-900/50 hover:scale-105 backdrop-blur-sm"
          title="Modifier la date de naissance"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg
            className="relative w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        {isDatePickerOpen && (
          <div className="absolute bottom-full right-0 mb-4">
            <DatePicker
              onDateChange={handleDateChange}
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCounter;
