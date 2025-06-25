"use client";

import React from "react";

interface DatePickerProps {
  onDateChange: (newDate: Date) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange, isOpen, onClose }) => {
  const predefinedDates = [
    { label: "Un Développeur Génial 👨‍💻", date: new Date("1990-03-20T14:00:00") },
    { label: "Une Femme Exceptionnelle 👩‍💼", date: new Date("1991-12-19T08:00:00") },
    { label: "Premier Pas sur la Lune 🌙", date: new Date("1969-07-21T03:56:00") },
    { label: "Premier Site Web 🌐", date: new Date("1991-08-06T12:00:00") },
    { label: "France 98 ⚽", date: new Date("1998-07-12T22:15:00") },
    { label: "Doctor Who 👨‍⚕️", date: new Date("1963-11-23T17:16:00") },
    { label: "Droits de l'Homme 📜", date: new Date("1789-08-26T14:00:00") },
    { label: "Premier Pokémon ⚡", date: new Date("1996-02-27T02:00:00") },
    { label: "Sortie de Pong 🎮", date: new Date("1972-11-29T12:00:00") },
  ];

  const handlePredefinedDate = (date: Date) => {
    onDateChange(date);
    onClose();
  };

  return (
    <div
      className={`absolute bottom-16 right-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-2xl backdrop-blur-sm z-30 min-w-64 transition-all duration-300 ease-in-out transform ${
        isOpen
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 translate-y-2 pointer-events-none"
      }`}
    >
      <div className="space-y-2">
        {predefinedDates.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handlePredefinedDate(item.date)}
            className="group w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 text-xs text-left shadow-sm hover:shadow-gray-900/30 hover:scale-[1.02]"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
