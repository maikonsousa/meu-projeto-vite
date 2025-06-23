import React, { useState } from 'react';

// --- Estilos Neumórficos e Globais ---
const neumorphicBaseBg = "bg-gray-200 dark:bg-gray-900";
const neumorphicElementBg = "bg-[#e0e0e0] dark:bg-[#374151]";
const neumorphicShadowOut = "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#2d3748,-8px_-8px_16px_#4a5568]";
const neumorphicShadowHover = "hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] dark:hover:shadow-[4px_4px_8px_#2d3748,-4px_-4px_8px_#4a5568]";
const neumorphicShadowIn = "shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#2d3748,inset_-4px_-4px_8px_#4a5568]";

// --- Sidebar Simples ---
const Sidebar = ({ activePage, setActivePage }) => {
  const navigationItems = [
    { name: 'Painel', page: 'Painel' },
    { name: 'Transações', page: 'Transacoes' },
    { name: 'Metas', page: 'Metas' },
    { name: 'Relatórios', page: 'Relatorios' },
    { name: 'Categorias', page: 'Categorias' },
    { name: 'Usuários', page: 'Usuarios' },
  ];
  return (
    <aside className={`${neumorphicElementBg} ${neumorphicShadowOut} m-2 rounded-2xl w-64 flex flex-col p-4`}>
      <div className="mb-10">
        <h2 className="font-bold text-lg text-gray-800 dark:text-white">Finanças do Casal</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">Gestão financeira conjunta</p>
      </div>
      <nav>
        <ul>
          {navigationItems.map((item) => (
            <li key={item.name} className="mb-2">
              <a
                href="#"
                onClick={e => { e.preventDefault(); setActivePage(item.page); }}
                className={`flex items-center p-3 rounded-lg transition-all font-extrabold ${activePage === item.page ? `${neumorphicShadowIn} text-black dark:text-white` : `text-gray-900 dark:text-gray-100 ${neumorphicShadowHover}`}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

// --- Conteúdo de cada página ---
const DashboardPage = () => (
  <div>
    <h2 style={{color: 'white'}}>Bem-vindo ao Painel!</h2>
    <p style={{color: 'white'}}>Aqui você verá os gráficos e resumos financeiros.</p>
  </div>
);

const TransacoesPage = () => (
  <div>
    <h2 style={{color: 'white'}}>Página de Transações</h2>
    <p style={{color: 'white'}}>Aqui você verá suas transações.</p>
  </div>
);

// Adicione outros componentes de página conforme for evoluindo!

export default function App() {
  const [activePage, setActivePage] = useState('Painel');

  const renderPage = () => {
    switch(activePage) {
      case 'Painel': return <DashboardPage />;
      case 'Transacoes': return <TransacoesPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className={`flex h-screen font-sans ${neumorphicBaseBg}`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-4">
        {renderPage()}
      </main>
    </div>
  );
}