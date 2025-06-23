import React, { useState } from 'react';

// --- Estilos Neumórficos e Globais ---
const neumorphicElementBg = "bg-[#e0e0e0] dark:bg-[#374151]";
const neumorphicShadowOut = "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#2d3748,-8px_-8px_16px_#4a5568]";
const neumorphicShadowHover = "hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] dark:hover:shadow-[4px_4px_8px_#2d3748,-4px_-4px_8px_#4a5568]";
const neumorphicShadowActive = "active:shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#2d3748,inset_-2px_-2px_4px_#4a5568]";
const neumorphicShadowIn = "shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#2d3748,inset_-4px_-4px_8px_#4a5568]";

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

// --- Componente NeumorphicInput ---
const NeumorphicInput = ({ placeholder, type = 'text', value, onChange, name }) => (
    <div className={`${neumorphicElementBg} ${neumorphicShadowIn} rounded-lg flex items-center p-3 w-full`}>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-300 font-semibold"
        />
    </div>
);

// --- Componente NeumorphicSelect ---
const NeumorphicSelect = ({ children, value, onChange, name, className = '' }) => (
    <div className={`${neumorphicElementBg} ${neumorphicShadowOut} rounded-lg relative w-full ${className}`}>
        <select
            value={value}
            onChange={onChange}
            name={name}
            className={`w-full appearance-none bg-transparent ${neumorphicElementBg} font-bold text-gray-700 dark:text-gray-300 p-3 rounded-lg focus:outline-none`}
        >
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            ▼
        </div>
    </div>
);

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('opcao1');

  return (
    <div>
      <GlobalStyles />
      <h1 style={{color: 'white'}}>Testando NeumorphicSelect</h1>
      <NeumorphicCard>
        <NeumorphicInput
          placeholder="Digite algo..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <NeumorphicSelect value={selectValue} onChange={e => setSelectValue(e.target.value)}>
          <option value="opcao1">Opção 1</option>
          <option value="opcao2">Opção 2</option>
          <option value="opcao3">Opção 3</option>
        </NeumorphicSelect>
        <NeumorphicButton onClick={() => alert(`Input: ${inputValue} | Select: ${selectValue}`)}>
          Mostrar valores
        </NeumorphicButton>
      </NeumorphicCard>
    </div>
  );
}