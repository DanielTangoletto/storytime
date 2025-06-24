import React, { useEffect, useState } from "react";

// Remplacez cette date par votre date de naissance
const BIRTH_DATE = new Date("1990-01-01T00:00:00");

function getAgeParts(from: Date, to: Date) {
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
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { years, months, weeks, days, hours, minutes, seconds } = getAgeParts(BIRTH_DATE, now);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/80 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Mon âge en temps réel</h2>
      <div className="grid grid-cols-2 gap-2 text-lg">
        <span>Années :</span> <span className="font-mono">{years}</span>
        <span>Mois :</span> <span className="font-mono">{months}</span>
        <span>Semaines :</span> <span className="font-mono">{weeks}</span>
        <span>Jours :</span> <span className="font-mono">{days}</span>
        <span>Heures :</span> <span className="font-mono">{hours}</span>
        <span>Minutes :</span> <span className="font-mono">{minutes}</span>
        <span>Secondes :</span> <span className="font-mono">{seconds}</span>
      </div>
    </div>
  );
};

export default AgeCounter;
