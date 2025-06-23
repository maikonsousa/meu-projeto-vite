import React from 'react';

// --- Estilos Neumórficos e Globais ---
const neumorphicElementBg = "bg-[#e0e0e0] dark:bg-[#374151]";
const neumorphicShadowOut = "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#2d3748,-8px_-8px_16px_#4a5568]";
const neumorphicShadowHover = "hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] dark:hover:shadow-[4px_4px_8px_#2d3748,-4px_-4px_8px_#4a5568]";
const neumorphicShadowActive = "active:shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#2d3748,inset_-2px_-2px_4px_#4a5568]";

const GlobalStyles = () => (
    <style>{`
        @media (max-width: 639px) {
            html {
                font-size: 90%;
            }
        }
    `}</style>
);

// --- Componente NeumorphicCard ---
const NeumorphicCard = ({ children, className = '' }) => (
    <div className={`${neumorphicElementBg} ${neumorphicShadowOut} p-6 rounded-2xl ${className}`}>
        {children}
    </div>
);

// --- Componente NeumorphicButton ---
const NeumorphicButton = ({ children, onClick, className = '', type = 'button' }) => (
    <button
        onClick={onClick}
        type={type}
        className={`w-full ${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} text-gray-700 dark:text-gray-300 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 ${className}`}
    >
        {children}
    </button>
);

export default function App() {
  return (
    <div>
      <GlobalStyles />
      <h1 style={{color: 'white'}}>Testando NeumorphicButton</h1>
      <NeumorphicCard>
        <NeumorphicButton onClick={() => alert('Botão clicado!')}>
          Clique aqui!
        </NeumorphicButton>
      </NeumorphicCard>
    </div>
  );
}