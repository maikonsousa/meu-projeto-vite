import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

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

// --- Cards de Resumo ---
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

// --- Gráfico de Barras ---
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

// --- Gráfico de Pizza ---
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

// --- Lista de Transações Recentes ---
const initialTransactions = [
  { id: 1, name: 'Internet', amount: 120, date: '2024-06-01' },
  { id: 2, name: 'Água', amount: 78, date: '2024-06-02' },
  { id: 3, name: 'Salário Ela', amount: 2800, date: '2024-06-03' },
  { id: 4, name: 'Salário Ele', amount: 3200, date: '2024-06-04' },
];

const RecentTransactionsCard = () => (
  <NeumorphicCard className="w-full mt-8">
    <div style={{fontWeight: 'bold', color: '#374151', marginBottom: 8}}>Transações Recentes</div>
    <ul>
      {initialTransactions.map(t => (
        <li key={t.id} style={{color: '#222', marginBottom: 4}}>
          <span style={{fontWeight: 'bold'}}>{t.name}</span> — R$ {t.amount} <span style={{fontSize: 12, color: '#666'}}>({t.date})</span>
        </li>
      ))}
    </ul>
  </NeumorphicCard>
);

// --- Card de Progresso de Metas ---
const initialGoals = [
  { id: 1, name: 'Casa', targetAmount: 30000, currentAmount: 2000, deadline: '2025-12-31', status: 'Ativa', category: 'Casa' },
  { id: 2, name: 'Fundo de Emergência', targetAmount: 15000, currentAmount: 15000, deadline: '2024-12-31', status: 'Concluída', category: 'Emergência' },
];

const GoalProgressCard = () => {
  const goal = initialGoals[0]; // Mostra a primeira meta ativa
  const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

  return (
    <NeumorphicCard className="w-full mt-8">
      <div style={{fontWeight: 'bold', color: '#374151', marginBottom: 8}}>Progresso da Meta</div>
      <div style={{fontWeight: 'bold', color: '#222'}}>{goal.name}</div>
      <div style={{margin: '8px 0', color: '#666', fontSize: 14}}>
        {goal.currentAmount} / {goal.targetAmount} ({progress.toFixed(1)}%)
      </div>
      <div style={{background: '#ddd', borderRadius: 8, height: 16, width: '100%', marginBottom: 8}}>
        <div style={{
          background: '#3b82f6',
          width: `${progress}%`,
          height: '100%',
          borderRadius: 8
        }} />
      </div>
      <div style={{fontSize: 12, color: '#666'}}>Até {goal.deadline}</div>
    </NeumorphicCard>
  );
};

// --- DashboardPage ---
const DashboardPage = () => (
  <div>
    <h2 style={{color: 'white', marginBottom: 24}}>Bem-vindo ao Painel!</h2>
    <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32}}>
      {summaryData.map((item, idx) => (
        <NeumorphicCard key={idx} className="w-64">
          <div style={{fontWeight: 'bold', color: '#374151', marginBottom: 8}}>{item.title}</div>
          <div style={{fontSize: 24, fontWeight: 'bold', color: '#111'}}>{item.value}</div>
        </NeumorphicCard>
      ))}
    </div>
    <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32}}>
      <div style={{flex: 2, minWidth: 350}}>
        <BarChartCard />
        <RecentTransactionsCard />
      </div>
      <div style={{flex: 1, minWidth: 350}}>
        <PieChartCard />
        <GoalProgressCard />
      </div>
    </div>
  </div>
);

// --- Outras páginas (exemplo) ---
const TransacoesPage = () => (
  <div>
    <h2 style={{color: 'white'}}>Página de Transações</h2>
    <p style={{color: 'white'}}>Aqui você verá suas transações.</p>
  </div>
);

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