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
const summaryData = [
  { title: 'Saldo do Mês', value: 'R$ 2.500,00' },
  { title: 'Receitas do Mês', value: 'R$ 6.000,00' },
  { title: 'Despesas do Mês', value: 'R$ 3.500,00' },
  { title: 'Despesas Fixas do Mês', value: 'R$ 1.200,00' },
];

const NeumorphicCard = ({ children, className = '' }) => (
  <div className={`bg-[#e0e0e0] shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] p-6 rounded-2xl ${className}`}>
    {children}
  </div>
);

const DashboardPage = () => (
  <div>
    <h2 style={{color: 'white'}}>Bem-vindo ao Painel!</h2>
    <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 32}}>
      {summaryData.map((item, idx) => (
        <NeumorphicCard key={idx} className="w-64">
          <div style={{fontWeight: 'bold', color: '#374151', marginBottom: 8}}>{item.title}</div>
          <div style={{fontSize: 24, fontWeight: 'bold', color: '#111'}}>{item.value}</div>
        </NeumorphicCard>
      ))}
    </div>
  </div>
);
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Dados mock para o gráfico
const revenueVsExpensesData = [
  { name: 'Jan', receitas: 3000, despesas: 2000 },
  { name: 'Fev', receitas: 3200, despesas: 2100 },
  { name: 'Mar', receitas: 2800, despesas: 2500 },
  { name: 'Abr', receitas: 3500, despesas: 2200 },
  { name: 'Mai', receitas: 4000, despesas: 3000 },
  { name: 'Jun', receitas: 3700, despesas: 2700 },
];

const BarChartCard = () => (
  <NeumorphicCard className="w-full mt-8">
    <div style={{fontWeight: 'bold', color: '#374151', marginBottom: 8}}>Receitas vs Despesas (Últimos 6 meses)</div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={revenueVsExpensesData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="receitas" fill="#22c55e" name="Receitas" />
        <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
      </BarChart>
    </ResponsiveContainer>
  </NeumorphicCard>
);
const DashboardPage = () => (
  <div>
    <h2 style={{color: 'white'}}>Bem-vindo ao Painel!</h2>
    <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 32}}>
      {summaryData.map((item, idx) => (
        <NeumorphicCard key={idx} className="w-64">
          <div style={{fontWeight: 'bold', color: '#374151', marginBottom: 8}}>{item.title}</div>
          <div style={{fontSize: 24, fontWeight: 'bold', color: '#111'}}>{item.value}</div>
        </NeumorphicCard>
      ))}
    </div>
    <BarChartCard />
    <PieChartCard />
  </div>
);
import { PieChart, Pie, Cell } from 'recharts';

// Dados mock para o gráfico de pizza
const expensesByCategoryData = [
  { name: 'Moradia', value: 1200 },
  { name: 'Alimentação', value: 800 },
  { name: 'Transporte', value: 400 },
  { name: 'Lazer', value: 300 },
  { name: 'Saúde', value: 200 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

const PieChartCard = () => (
  <NeumorphicCard className="w-full mt-8">
    <div style={{fontWeight: 'bold', color: '#374151', marginBottom: 8}}>Despesas por Categoria</div>
    <PieChart width={400} height={250}>
      <Pie
        data={expensesByCategoryData}
        cx={200}
        cy={120}
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {expensesByCategoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </NeumorphicCard>
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