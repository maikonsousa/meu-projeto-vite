import React, { useState, useMemo, useEffect } from 'react';

// --- Estilos Neumórficos e Globais ---
const neumorphicElementBg = "bg-[#e0e0e0] dark:bg-[#374151]";
const neumorphicShadowOut = "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#2d3748,-8px_-8px_16px_#4a5568]";

const GlobalStyles = () => (
    <style>{`
        @media (max-width: 639px) {
            html {
                font-size: 90%;
            }
        }
    `}</style>
);

// --- Dados Iniciais (Mock) ---
const initialTransactions = [
    { id: 1, name: 'Internet', amount: 120 },
    { id: 2, name: 'Água', amount: 78 },
    { id: 3, name: 'Salário Ela', amount: 2800 },
    { id: 4, name: 'Salário Ele', amount: 3200 },
];

// --- Componente NeumorphicCard ---
const NeumorphicCard = ({ children, className = '' }) => (
    <div className={`${neumorphicElementBg} ${neumorphicShadowOut} p-6 rounded-2xl ${className}`}>
        {children}
    </div>
);

export default function App() {
  return (
    <div>
      <GlobalStyles />
      <h1 style={{color: 'white'}}>Testando NeumorphicCard</h1>
      <NeumorphicCard>
        <ul>
          {initialTransactions.map(t => (
            <li key={t.id}>{t.name} - {t.amount}</li>
          ))}
        </ul>
      </NeumorphicCard>
    </div>
  );
}