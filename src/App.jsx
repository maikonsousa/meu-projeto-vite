import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { Home, BarChart2, Repeat, Target, Settings, Users, Sun, Moon, DollarSign, ArrowUp, ArrowDown, Calendar, User, Briefcase, Plus, Search, Edit, Trash2, ChevronDown, Download, GripVertical, X, Save, ArrowUpRight, ArrowDownRight, Heart, CreditCard, ShieldCheck, Menu, AlertTriangle } from 'lucide-react';
import "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";

// --- Estilos Neumórficos e Globais (Layout de Cores do Projeto Anterior) ---
// As cores e sombras foram substituídas para corresponder ao layout anterior.
const neumorphicBaseBg = "bg-gray-200 dark:bg-gray-900";
const neumorphicElementBg = "bg-[#e0e0e0] dark:bg-[#374151]";
const neumorphicShadowOut = "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#2d3748,-8px_-8px_16px_#4a5568]";
const neumorphicShadowIn = "shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#2d3748,inset_-4px_-4px_8px_#4a5568]";
// O hover foi adaptado para uma sombra mais sutil, como no projeto original
const neumorphicShadowHover = "hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] dark:hover:shadow-[4px_4px_8px_#2d3748,-4px_-4px_8px_#4a5568]"; 
// O active foi adaptado para o estilo 'inset' do projeto original
const neumorphicShadowActive = "active:shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#2d3748,inset_-2px_-2px_4px_#4a5568]";

const GlobalStyles = () => (
    <style>{`
        /* Estilos para os dropdowns (select) para combinar com o tema */
        select option {
            background-color: #e0e0e0;
            color: #1f2937;
            font-weight: bold;
        }
        .dark select option {
             background-color: #374151;
             color: #e5e7eb;
        }
        /* Ajuste de fonte para telas menores */
        @media (max-width: 639px) {
            html {
                font-size: 90%;
            }
        }
    `}</style>
);

// --- Dados Iniciais (Mock) ---
const initialTransactions = [
    { id: 1, groupId: null, name: 'Internet', category: 'Moradia', date: '2025-06-04', purchaseDate: '2025-06-04', amount: 120.00, type: 'despesa', responsible: 'ambos', recurrence: 'Mensal', status: 'Pago', notes: '', installments: null },
    { id: 2, groupId: null, name: 'Água', category: 'Moradia', date: '2025-06-04', purchaseDate: '2025-06-04', amount: 78.00, type: 'despesa', responsible: 'ambos', recurrence: 'Mensal', status: 'Pago', notes: '', installments: null },
    { id: 3, groupId: null, name: 'Salário Ela', category: 'Salário', date: '2025-06-04', purchaseDate: '2025-06-04', amount: 2800.00, type: 'receita', responsible: 'ela', recurrence: 'Mensal', status: 'Pago', notes: '', installments: null },
    { id: 4, groupId: null, name: 'Salário Ele', category: 'Salário', date: '2025-06-04', purchaseDate: '2025-06-04', amount: 3200.00, type: 'receita', responsible: 'ele', recurrence: 'Mensal', status: 'Pago', notes: '', installments: null },
];

const initialCategories = [
    { id: 1, name: 'Alimentação', type: 'despesa' }, { id: 2, name: 'Educação', type: 'despesa' },
    { id: 3, name: 'Roupas', type: 'despesa' }, { id: 4, name: 'Transporte', type: 'despesa' },
    { id: 5, name: 'Lazer', type: 'despesa' }, { id: 6, name: 'Investimentos', type: 'despesa' },
    { id: 7, name: 'Outras Despesas', type: 'despesa' }, { id: 8, name: 'Serviços', type: 'despesa' },
    { id: 9, name: 'Outras Receitas', type: 'receita' }, { id: 10, name: 'Saúde', type: 'despesa' },
    { id: 11, name: 'Cuidados Pessoais', type: 'despesa' }, { id: 12, name: 'Salário', type: 'receita' },
    { id: 13, name: 'Moradia', type: 'despesa' },
];

const initialGoals = [
    { id: 1, name: 'Casa', targetAmount: 30000, currentAmount: 2000, deadline: '2029-06-07', status: 'Ativa', category: 'Casa', notes: 'Comprar a casa dos sonhos.' },
    { id: 2, name: 'Fundo de Emergência', targetAmount: 15000, currentAmount: 15000, deadline: '2025-12-31', status: 'Concluída', category: 'Emergência', notes: '6 meses de despesas cobertas.' },
]

const usersData = [
    { id: 1, name: 'Maikon89', email: 'maikonsousa89@gmail.com', role: 'Admin', isYou: true },
    { id: 2, name: 'Beatriz Marques', email: 'biamarques95@gmail.com', role: 'Usuário', isYou: false },
];

// --- Componentes Reutilizáveis ---
const NeumorphicButton = ({ children, onClick, className = '', type = 'button' }) => (
    <button onClick={onClick} type={type} className={`w-full ${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} text-gray-700 dark:text-gray-300 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 ${className}`}>
        {children}
    </button>
);

const NeumorphicCard = ({ children, className = '' }) => (
    <div className={`${neumorphicElementBg} ${neumorphicShadowOut} p-6 rounded-2xl ${className}`}>
        {children}
    </div>
);

const NeumorphicInput = ({ placeholder, type = 'text', value, onChange, name, icon: Icon }) => (
    <div className={`${neumorphicElementBg} ${neumorphicShadowIn} rounded-lg flex items-center p-3 w-full`}>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-300 font-semibold" />
        {Icon && <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
    </div>
);

const NeumorphicSelect = ({ children, value, onChange, name, className = '' }) => (
     <div className={`${neumorphicElementBg} ${neumorphicShadowOut} rounded-lg relative w-full ${className}`}>
        <select value={value} onChange={onChange} name={name} className={`w-full appearance-none bg-transparent ${neumorphicElementBg} font-bold text-gray-700 dark:text-gray-300 p-3 rounded-lg focus:outline-none`}>
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <ChevronDown className="w-5 h-5" />
        </div>
    </div>
);

const AlertModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <NeumorphicCard className="w-full max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-red-500 rounded-full">
                       <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Aviso</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
                <NeumorphicButton onClick={onClose} className="w-1/2 mx-auto">
                    OK
                </NeumorphicButton>
            </NeumorphicCard>
        </div>
    );
};

// --- Funções e Estilos para Gráficos ---
const yAxisFormatter = (value) => `R$ ${value.toLocaleString('pt-BR')}`;
const tooltipFormatter = (value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const TooltipContent = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-[#374151] shadow-[8px_8px_16px_#2d3748,-8px_-8px_16px_#4a5568]' : 'bg-[#e0e0e0] shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]'}`}>
                <p className={`label font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{`${label}`}</p>
                {payload.map((entry, index) => (
                    <p key={`item-${index}`} style={{ color: entry.color }} className="font-semibold">
                        {`${entry.name}: ${tooltipFormatter(entry.value)}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f'];

// --- Componentes do Painel ---
const DonutChartCard = ({transactions, isDarkMode}) => {

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill={isDarkMode ? "#FFF" : "#333"} textAnchor="middle" dominantBaseline="central" className="font-bold text-sm">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const expensesByCategory = useMemo(() => {
        const today = new Date();
        const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
        
        const lastSixMonthsTransactions = transactions.filter(t => {
            const transactionDate = new Date(t.date + 'T00:00:00');
            return t.type === 'despesa' && transactionDate >= sixMonthsAgo;
        });

        const expenseData = lastSixMonthsTransactions.reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {});

        const sortedExpenses = Object.entries(expenseData)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        return sortedExpenses;
    }, [transactions]);

    const totalExpenses = useMemo(() => expensesByCategory.reduce((sum, item) => sum + item.value, 0), [expensesByCategory]);

    const dataWithPercent = useMemo(() => {
      if (totalExpenses === 0) return [];
      return expensesByCategory.map(entry => ({
        ...entry,
        percent: entry.value / totalExpenses
      }));
    }, [expensesByCategory, totalExpenses]);


    return (
        <NeumorphicCard className="flex flex-col h-full">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Despesas por Categoria (Últimos 6 meses)</h3>
            <div className="flex-grow flex items-center justify-center">
                {dataWithPercent.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie 
                                data={dataWithPercent} 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={70} 
                                outerRadius={100} 
                                paddingAngle={5} 
                                dataKey="value"
                                labelLine={false}
                                label={renderCustomizedLabel}
                            >
                                {dataWithPercent.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip content={<TooltipContent isDarkMode={isDarkMode} />} cursor={{fill: 'transparent'}}/>
                        </PieChart>
                    </ResponsiveContainer>
                ) : <p className="text-gray-500">Sem dados de despesa para este período.</p>}
            </div>
            <div className="space-y-2 mt-4 text-sm">
                {dataWithPercent.slice(0, 6).map((entry, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                            <span className="font-semibold text-gray-600 dark:text-gray-400">{entry.name}</span>
                        </div>
                        <span className="font-bold text-gray-800 dark:text-white">{tooltipFormatter(entry.value)}</span>
                    </div>
                ))}
            </div>
        </NeumorphicCard>
    );
};


const BarChartCard = ({transactions, isDarkMode}) => {
    const revenueVsExpensesData = useMemo(() => {
        const today = new Date();
        const monthsData = new Map();

        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthKey = date.toLocaleString('pt-BR', { month: 'short', year: '2-digit' }).replace('.', '');
            monthsData.set(monthKey, { name: monthKey, receitas: 0, despesas: 0 });
        }
        
        const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);

        transactions.forEach(t => {
            const transactionDate = new Date(t.date + 'T00:00:00');
            if (transactionDate >= sixMonthsAgo) {
                const monthKey = transactionDate.toLocaleString('pt-BR', { month: 'short', year: '2-digit' }).replace('.', '');
                
                if (monthsData.has(monthKey)) {
                    const currentMonthData = monthsData.get(monthKey);
                    if (t.type === 'receita') {
                        currentMonthData.receitas += t.amount;
                    } else {
                        currentMonthData.despesas += t.amount;
                    }
                }
            }
        });
        
        return Array.from(monthsData.values());
    }, [transactions]);

    const tickColor = isDarkMode ? '#e5e7eb' : '#1f2937';

    return (
        <NeumorphicCard>
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Receitas vs Despesas (Últimos 6 meses)</h3>
            <ResponsiveContainer width="100%" height={300}>
                {revenueVsExpensesData.length > 0 ? (
                    <BarChart data={revenueVsExpensesData}>
                        <XAxis dataKey="name" tick={{ fill: tickColor, fontWeight: 'bold' }} />
                        <YAxis tickFormatter={yAxisFormatter} tick={{ fill: tickColor, fontWeight: 'bold' }} />
                        <Tooltip content={<TooltipContent isDarkMode={isDarkMode} />} cursor={{fill: 'transparent'}}/>
                        <Legend wrapperStyle={{ fontWeight: 'bold' }} />
                        <Bar dataKey="receitas" fill="#22c55e" name="Receitas" radius={[10, 10, 0, 0]} barSize={20} />
                        <Bar dataKey="despesas" fill="#ef4444" name="Despesas" radius={[10, 10, 0, 0]} barSize={20} />
                    </BarChart>
                ) : (
                    <p className="text-gray-500 flex items-center justify-center h-full">Sem dados para este período.</p>
                )}
            </ResponsiveContainer>
        </NeumorphicCard>
    );
};

const SummaryCard = ({ title, value, icon: Icon }) => { 
    return (
        <NeumorphicCard className="relative !p-4">
            <div className="flex items-start justify-between">
                <div className={`${neumorphicElementBg} ${neumorphicShadowOut} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-gray-700 dark:text-gray-400" />
                </div>
                 <ArrowUpRight className="w-5 h-5 text-blue-500" />
            </div>
            <div className="mt-4">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
            </div>
        </NeumorphicCard>
    );
}
const RecentTransactionsCard = ({transactions}) => (
    <NeumorphicCard className="h-full">
        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Transações Recentes (do Mês)</h3>
        <div className="space-y-4">
            {transactions.length > 0 ? transactions.slice(0, 4).map((t, i) => {
                const Icon = t.type === 'receita' ? ArrowUpRight : ArrowDownRight;
                const date = new Date(t.date);
                date.setDate(date.getDate() + 1); // Ajuste de fuso horário
                const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

                return (
                    <div key={i} className={`${neumorphicElementBg} ${neumorphicShadowIn} p-4 rounded-xl flex items-center`}>
                        <div className={`${neumorphicShadowOut} rounded-full p-2 mr-4`}>
                            <Icon className="w-5 h-5 text-gray-800 dark:text-gray-300" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-bold text-gray-800 dark:text-white">{t.name}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                <span className={`w-2 h-2 rounded-full bg-gray-400 mr-1.5`}></span>{t.category}
                                <Calendar className="w-3 h-3 ml-2 mr-1" />{formattedDate}
                            </div>
                        </div>
                        <p className={`font-bold ${t.type === 'receita' ? 'text-green-500' : 'text-red-500'}`}>{t.type === 'receita' ? '+' : '-'}R$ {t.amount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    </div>
                )
            }) : <p className="text-gray-500">Nenhuma transação neste período.</p>}
        </div>
    </NeumorphicCard>
);
const GoalProgressCard = ({ goals }) => {
    const firstActiveGoal = goals.find(g => g.status === 'Ativa');

    return (
        <NeumorphicCard className="flex flex-col h-full">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Progresso das Metas</h3>
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                {firstActiveGoal ? (() => {
                    const progress = Math.min((firstActiveGoal.currentAmount / firstActiveGoal.targetAmount) * 100, 100);
                    const deadlineDate = new Date(firstActiveGoal.deadline + 'T00:00:00');
                    const formattedDeadline = deadlineDate.toLocaleDateString('pt-BR');
                    
                    return (
                        <div className={`${neumorphicElementBg} ${neumorphicShadowIn} p-4 rounded-xl w-full text-left`}>
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-bold text-gray-800 dark:text-white">{firstActiveGoal.name}</p>
                                <span className="text-xs font-semibold text-green-800 bg-green-200 dark:bg-green-700 dark:text-green-200 px-2 py-0.5 rounded-full">{firstActiveGoal.category}</span>
                            </div>
                            <div className="flex justify-between items-end text-sm text-gray-600 dark:text-gray-400 font-semibold mb-1">
                                <span>{tooltipFormatter(firstActiveGoal.currentAmount)}</span>
                                <span>{tooltipFormatter(firstActiveGoal.targetAmount)}</span>
                            </div>
                            <div className={`w-full rounded-full h-2.5 ${neumorphicElementBg} ${neumorphicShadowIn}`}>
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
                            </div>
                            <div className="flex justify-between items-start mt-1 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                                <span>{progress.toFixed(1)}% concluído</span>
                                <span>Até {formattedDeadline}</span>
                            </div>
                        </div>
                    );
                })() : (
                    <>
                        <div className={`${neumorphicShadowIn} p-5 rounded-full mb-4`}><Target className="w-10 h-10 text-gray-400" /></div>
                        <p className="font-semibold text-gray-500">Nenhuma meta ativa</p>
                    </>
                )}
            </div>
        </NeumorphicCard>
    );
};

// --- Página do Painel ---
const DashboardPage = ({transactions, categories, goals, isDarkMode}) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const transactionDate = new Date(t.date + 'T00:00:00');
            return transactionDate.getMonth() === selectedMonth && transactionDate.getFullYear() === selectedYear;
        });
    }, [transactions, selectedMonth, selectedYear]);
    
    const summaryData = useMemo(() => {
        const totalIncome = filteredTransactions.filter(t => t.type === 'receita').reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = filteredTransactions.filter(t => t.type === 'despesa').reduce((sum, t) => sum + t.amount, 0);
        const fixedExpense = filteredTransactions.filter(t => t.type === 'despesa' && t.recurrence === 'Mensal').reduce((sum, t) => sum + t.amount, 0);
        const balance = totalIncome - totalExpense;

        return [
          { title: 'Saldo do Mês', value: tooltipFormatter(balance), icon: DollarSign },
          { title: 'Receitas do Mês', value: tooltipFormatter(totalIncome), icon: ArrowUp },
          { title: 'Despesas do Mês', value: tooltipFormatter(totalExpense), icon: ArrowDown },
          { title: 'Despesas Fixas do Mês', value: tooltipFormatter(fixedExpense), icon: Calendar },
        ];
    }, [filteredTransactions]);

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    return (
    <>
        <header className="mb-8 hidden md:block"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Painel Financeiro</h1>
            <div className="flex items-center gap-4 mt-2">
                <div className={`${neumorphicElementBg} ${neumorphicShadowIn} rounded-full relative flex items-center`}>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} className={`appearance-none w-full bg-transparent font-bold text-gray-800 dark:text-white py-2 pl-6 pr-10 rounded-full focus:outline-none`}>
                        {months.map((month, index) => <option key={month} value={index}>{month}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700 dark:text-gray-300">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
                <div className={`${neumorphicElementBg} ${neumorphicShadowIn} rounded-full relative flex items-center`}>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} className={`appearance-none w-full bg-transparent font-bold text-gray-800 dark:text-white py-2 pl-6 pr-10 rounded-full focus:outline-none`}>
                        {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700 dark:text-gray-300">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">{summaryData.map((item, index) => <SummaryCard key={index} title={item.title} value={item.value} icon={item.icon} />)}</div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8"><div className="lg:col-span-2"> <DonutChartCard transactions={transactions} isDarkMode={isDarkMode} /> </div><div className="lg:col-span-3"> <BarChartCard transactions={transactions} isDarkMode={isDarkMode}/> </div></div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6"><div className="lg:col-span-3"> <RecentTransactionsCard transactions={filteredTransactions} /> </div><div className="lg:col-span-2"> <GoalProgressCard goals={goals} /> </div></div>
    </>
    );
};

// --- Modal de Transação (Adicionar/Editar) ---
const TransactionModal = ({ isOpen, onClose, categories, onSave, transactionToEdit }) => {
    const getInitialState = () => ({
        name: '', amount: '', type: 'despesa',
        category: categories.find(c => c.type === 'despesa')?.name || '',
        responsible: 'ambos', recurrence: 'Única', status: 'Pago',
        date: new Date().toISOString().split('T')[0],
        purchaseDate: new Date().toISOString().split('T')[0],
        notes: '', installments: 1,
    });

    const [transaction, setTransaction] = useState(getInitialState());
    const [installmentPreview, setInstallmentPreview] = useState(null);

    useEffect(() => {
        if (transactionToEdit) {
            setTransaction({ 
                ...transactionToEdit, 
                amount: transactionToEdit.amount.toString(), 
                installments: transactionToEdit.installments || 1,
                purchaseDate: transactionToEdit.purchaseDate || transactionToEdit.date 
            });
        } else {
            setTransaction(getInitialState());
        }
    }, [transactionToEdit, isOpen]);

    useEffect(() => {
        if (transaction.recurrence === 'Parcelado' && transaction.amount > 0 && transaction.installments > 0) {
            const numInstallments = parseInt(transaction.installments, 10);
            const firstDate = new Date(transaction.date + 'T00:00:00');
            const lastDate = new Date(firstDate);
            lastDate.setMonth(firstDate.getMonth() + numInstallments - 1);

            setInstallmentPreview({
                count: numInstallments,
                value: parseFloat(transaction.amount) / numInstallments,
                firstDate: firstDate.toISOString().split('T')[0],
                lastDate: lastDate.toISOString().split('T')[0]
            });
        } else {
            setInstallmentPreview(null);
        }
    }, [transaction.amount, transaction.installments, transaction.date, transaction.recurrence]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newTransaction = { ...transaction, [name]: value };
        if (name === 'recurrence' && value !== 'Parcelado') newTransaction.installments = 1;
        setTransaction(newTransaction);
    };
    
    const handleTypeChange = (e) => {
        const newType = e.target.value;
        const relevantCategories = categories.filter(c => c.type === newType || c.type === 'nenhum');
        setTransaction(prev => ({
            ...prev, type: newType,
            category: relevantCategories[0]?.name || ''
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(transaction, !!transactionToEdit);
        onClose();
    };

    if (!isOpen) return null;

    const filteredCategories = categories.filter(c => c.type === transaction.type || c.type === 'nenhum');
    const modalTitle = transactionToEdit ? "Editar Transação" : "Nova Transação";
    const installmentOptions = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <NeumorphicCard className="w-full max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-gray-800 dark:text-white">{modalTitle}</h2><button type="button" onClick={onClose} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-2 rounded-full`}><X className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button></div>
                    <div className="space-y-4">
                        <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Nome da Transação</label><NeumorphicInput name="name" value={transaction.name} onChange={handleChange} placeholder="Ex: Supermercado" /></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Valor (R$)</label>
                                <NeumorphicInput name="amount" value={transaction.amount} onChange={handleChange} type="number" placeholder="0,00" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Data da Compra</label>
                                <NeumorphicInput name="purchaseDate" value={transaction.purchaseDate} onChange={handleChange} type="date" icon={Calendar} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Tipo</label>
                                <NeumorphicSelect name="type" value={transaction.type} onChange={handleTypeChange}>
                                    <option value="receita">Receita</option>
                                    <option value="despesa">Despesa</option>
                                </NeumorphicSelect>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Categoria</label><NeumorphicSelect name="category" value={transaction.category} onChange={handleChange}>{filteredCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</NeumorphicSelect></div>
                            <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Responsável</label><NeumorphicSelect name="responsible" value={transaction.responsible} onChange={handleChange}><option value="ambos">Ambos</option><option value="ele">Ele</option><option value="ela">Ela</option></NeumorphicSelect></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-1"><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Recorrência</label><NeumorphicSelect name="recurrence" value={transaction.recurrence} onChange={handleChange}><option>Única</option><option>Mensal</option><option>Anual</option><option>Parcelado</option></NeumorphicSelect></div>
                            {transaction.recurrence === 'Parcelado' && (
                                <div className="md:col-span-1"><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Parcelas</label><NeumorphicSelect name="installments" value={transaction.installments} onChange={handleChange}>{installmentOptions.map(i => <option key={i} value={i}>{i}x</option>)}</NeumorphicSelect></div>
                            )}
                            <div className="md:col-span-1"><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Status</label><NeumorphicSelect name="status" value={transaction.status} onChange={handleChange}><option>Pago</option><option>Pendente</option></NeumorphicSelect></div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Data da Cobrança</label>
                                <NeumorphicInput name="date" value={transaction.date} onChange={handleChange} type="date" icon={Calendar} />
                            </div>
                        </div>
                        {installmentPreview && (
                            <div className={`${neumorphicElementBg} ${neumorphicShadowIn} p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300 space-y-1`}>
                                <p className="font-bold">Prévia das Parcelas:</p>
                                <ul>
                                    <li>• Serão criadas {installmentPreview.count} transações</li>
                                    <li>• Valor por parcela: {tooltipFormatter(installmentPreview.value)}</li>
                                    <li>• Primeira parcela: {new Date(installmentPreview.firstDate  + 'T00:00:00').toLocaleDateString('pt-BR')}</li>
                                    <li>• Última parcela: {new Date(installmentPreview.lastDate + 'T00:00:00').toLocaleDateString('pt-BR')}</li>
                                </ul>
                            </div>
                        )}
                         <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Observações</label><div className={`${neumorphicElementBg} ${neumorphicShadowIn} rounded-lg flex items-center p-3 w-full`}><textarea name="notes" value={transaction.notes} onChange={handleChange} placeholder="Observações adicionais..." className="bg-transparent w-full h-20 focus:outline-none text-gray-700 dark:text-gray-300 font-semibold resize-none" /></div></div>
                        <div className="flex gap-4 pt-4">
                            <NeumorphicButton type="button" onClick={onClose} className="!bg-gray-400/20 !shadow-none hover:!bg-gray-400/50 dark:hover:!bg-gray-600/50">Cancelar</NeumorphicButton>
                            <NeumorphicButton type="submit"><Save className="w-5 h-5 mr-2" />Salvar</NeumorphicButton>
                        </div>
                    </div>
                </form>
            </NeumorphicCard>
        </div>
    );
};

// --- Página de Transações ---
const TransactionsPage = ({ transactions, categories, onSaveTransaction, onDeleteTransaction }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [filters, setFilters] = useState({ searchTerm: '', type: 'all', category: 'all', responsible: 'all', status: 'all', recurrence: 'all' });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenModalForEdit = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleOpenModalForAdd = () => {
        setEditingTransaction(null);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
    }

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            return (filters.searchTerm === '' || t.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
                   (filters.type === 'all' || t.type === filters.type) &&
                   (filters.category === 'all' || t.category === filters.category) &&
                   (filters.responsible === 'all' || t.responsible === filters.responsible) &&
                   (filters.status === 'all' || t.status === filters.status) &&
                   (filters.recurrence === 'all' || t.recurrence === filters.recurrence);
        });
    }, [transactions, filters]);
    
    return (<>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Transações</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Gerencie as suas receitas e despesas</p>
        <div className={`${neumorphicElementBg} ${neumorphicShadowOut} rounded-lg p-3 mb-6`}><NeumorphicButton onClick={handleOpenModalForAdd}><Plus className="w-5 h-5 mr-2" />Nova Transação</NeumorphicButton></div>
        <NeumorphicCard className="mb-6 !p-4">
            <div className={`${neumorphicElementBg} ${neumorphicShadowIn} rounded-lg flex items-center p-2 mb-4`}>
                <Search className="w-5 h-5 text-gray-400 mx-2" />
                <input type="text" placeholder="Buscar transação..." className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-300 font-semibold" name="searchTerm" value={filters.searchTerm} onChange={handleFilterChange} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <NeumorphicSelect name="type" value={filters.type} onChange={handleFilterChange}><option value="all">Todos os tipos</option><option value="receita">Receita</option><option value="despesa">Despesa</option></NeumorphicSelect>
                <NeumorphicSelect name="category" value={filters.category} onChange={handleFilterChange}><option value="all">Todas as categorias</option>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</NeumorphicSelect>
                <NeumorphicSelect name="responsible" value={filters.responsible} onChange={handleFilterChange}><option value="all">Todos responsáveis</option><option value="ele">Ele</option><option value="ela">Ela</option><option value="ambos">Ambos</option></NeumorphicSelect>
                <NeumorphicSelect name="status" value={filters.status} onChange={handleFilterChange}><option value="all">Todos status</option><option value="Pago">Pago</option><option value="Pendente">Pendente</option></NeumorphicSelect>
                <NeumorphicSelect name="recurrence" value={filters.recurrence} onChange={handleFilterChange}><option value="all">Todas recorrências</option><option value="Única">Única</option><option value="Mensal">Mensal</option><option value="Anual">Anual</option><option value="Parcelado">Parcelado</option></NeumorphicSelect>
            </div>
        </NeumorphicCard>
        <NeumorphicCard>
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Todas as Transações ({filteredTransactions.length})</h3>
            <div className="space-y-4">{filteredTransactions.map((trans) => {
                const Icon = trans.type === 'receita' ? ArrowUpRight : ArrowDownRight;
                const date = new Date(trans.date); date.setDate(date.getDate() + 1);
                const formattedDate = date.toLocaleDateString('pt-BR');
                const displayName = trans.recurrence === 'Parcelado' && trans.totalInstallments 
                    ? `${trans.name} (${trans.currentInstallment}/${trans.totalInstallments})`
                    : trans.name;

                return (<div key={trans.id} className={`${neumorphicElementBg} ${neumorphicShadowIn} p-4 rounded-xl flex items-center`}>
                    <div className={`${neumorphicShadowOut} rounded-full p-2 mr-4`}><Icon className="w-5 h-5 text-gray-800 dark:text-gray-300" /></div>
                    <div className="flex-grow">
                        <p className="font-bold text-gray-800 dark:text-white">{displayName}</p>
                        <div className="flex items-center flex-wrap text-xs text-gray-500 mt-1 gap-x-3 gap-y-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-400 text-white`}>{trans.category}</span>
                            <span className="inline-flex items-center"><User className="w-3 h-3 mr-1" />{trans.responsible}</span>
                            <span className="inline-flex items-center"><Calendar className="w-3 h-3 mr-1" />{trans.recurrence}</span>
                            <span className="inline-flex items-center">{formattedDate}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <p className={`font-bold text-lg ${trans.type === 'receita' ? 'text-green-500' : 'text-red-500'}`}>{trans.type === 'receita' ? '+' : '-'}R$ {trans.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <button onClick={() => handleOpenModalForEdit(trans)} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-2 rounded-lg`}><Edit className="w-4 h-4 text-gray-600"/></button>
                        <button onClick={() => onDeleteTransaction(trans.id)} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-2 rounded-lg`}><Trash2 className="w-4 h-4 text-gray-600"/></button>
                    </div>
                </div>)
            })}</div>
        </NeumorphicCard>
        <TransactionModal isOpen={isModalOpen} onClose={handleCloseModal} categories={categories} onSave={onSaveTransaction} transactionToEdit={editingTransaction}/>
    </>);
}

// --- Componente do Cartão de Meta ---
const GoalCard = ({ goal, onAddProgress, onEdit, onDelete }) => {
    const [amountToAdd, setAmountToAdd] = useState('');
    const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
    const deadlineDate = new Date(goal.deadline);
    deadlineDate.setDate(deadlineDate.getDate() + 1); // Ajuste de fuso horário
    const formattedDeadline = deadlineDate.toLocaleDateString('pt-BR');

    const handleAddClick = () => {
        const amount = parseFloat(amountToAdd);
        if (amount > 0) {
            onAddProgress(goal.id, amount);
            setAmountToAdd('');
        }
    };

    return (
        <NeumorphicCard className="flex flex-col space-y-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{goal.name}</h3>
                    <span className="text-xs font-semibold text-green-800 bg-green-200 dark:bg-green-700 dark:text-green-200 px-2 py-0.5 rounded-full">{goal.category}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${goal.status === 'Ativa' ? 'text-blue-800 bg-blue-200 dark:bg-blue-700 dark:text-blue-200' : 'text-gray-800 bg-gray-300 dark:bg-gray-600 dark:text-gray-200'}`}>{goal.status}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(goal)} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-2 rounded-lg`}><Edit className="w-4 h-4 text-gray-600"/></button>
                    <button onClick={() => onDelete(goal.id)} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-2 rounded-lg`}><Trash2 className="w-4 h-4 text-gray-600"/></button>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-end mb-1">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Progresso</p>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Até {formattedDeadline}</p>
                </div>
                <div className={`w-full rounded-full h-4 ${neumorphicElementBg} ${neumorphicShadowIn}`}>
                    <div className="bg-blue-600 h-4 rounded-full" style={{width: `${progress}%`}}></div>
                </div>
                <div className="flex justify-between items-start mt-1">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{progress.toFixed(1)}% concluído</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{tooltipFormatter(goal.currentAmount)} / {tooltipFormatter(goal.targetAmount)}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Adicionar progresso:</label>
                <div className="flex-grow w-full max-w-[150px]">
                    <NeumorphicInput name="addAmount" value={amountToAdd} onChange={(e) => setAmountToAdd(e.target.value)} type="number" placeholder="Adicionar R$" />
                </div>
                <button onClick={handleAddClick} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-3 rounded-lg`}>
                    <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                </button>
            </div>
        </NeumorphicCard>
    );
};

// --- Modal de Meta ---
const GoalModal = ({ isOpen, onClose, onSave, goalToEdit }) => {
    const getInitialState = () => ({
        name: '', targetAmount: '', currentAmount: '0',
        deadline: new Date().toISOString().split('T')[0], status: 'Ativa', category: 'Outros', notes: ''
    });
    const [goal, setGoal] = useState(getInitialState());

    useEffect(() => {
        if (goalToEdit) {
            setGoal({
                ...goalToEdit,
                targetAmount: goalToEdit.targetAmount.toString(),
                currentAmount: goalToEdit.currentAmount.toString(),
            });
        } else {
            setGoal(getInitialState());
        }
    }, [goalToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoal(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalGoal = {
            ...goal,
            targetAmount: parseFloat(goal.targetAmount),
            currentAmount: parseFloat(goal.currentAmount) || 0,
        };
        onSave(goalToEdit ? finalGoal : { ...finalGoal, id: Date.now() });
        onClose();
    };

    if (!isOpen) return null;
    const modalTitle = goalToEdit ? "Editar Meta" : "Nova Meta";
    const goalCategories = ['Casa', 'Carro', 'Viagem', 'Emergência', 'Investimento', 'Outros'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <NeumorphicCard className="w-full max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-gray-800 dark:text-white">{modalTitle}</h2><button type="button" onClick={onClose} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-2 rounded-full`}><X className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button></div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Nome da Meta</label><NeumorphicInput name="name" value={goal.name} onChange={handleChange} placeholder="Ex: Viagem para a Europa" /></div>
                            <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Valor Objetivo (R$)</label><NeumorphicInput name="targetAmount" value={goal.targetAmount} onChange={handleChange} type="number" placeholder="0,00" /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Valor Atual (R$)</label><NeumorphicInput name="currentAmount" value={goal.currentAmount} onChange={handleChange} type="number" placeholder="0" /></div>
                            <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Data Limite</label><NeumorphicInput name="deadline" value={goal.deadline} onChange={handleChange} type="date" icon={Calendar} /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Categoria</label><NeumorphicSelect name="category" value={goal.category} onChange={handleChange}>{goalCategories.map(c => <option key={c}>{c}</option>)}</NeumorphicSelect></div>
                            <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Status</label><NeumorphicSelect name="status" value={goal.status} onChange={handleChange}><option>Ativa</option><option>Pausada</option><option>Concluída</option></NeumorphicSelect></div>
                        </div>
                         <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Observações</label><div className={`${neumorphicElementBg} ${neumorphicShadowIn} rounded-lg flex items-center p-3 w-full`}><textarea name="notes" value={goal.notes} onChange={handleChange} placeholder="Observações sobre a meta..." className="bg-transparent w-full h-20 focus:outline-none text-gray-700 dark:text-gray-300 font-semibold resize-none" /></div></div>
                    </div>
                    <div className="flex gap-4 pt-6">
                        <NeumorphicButton type="button" onClick={onClose} className="!bg-gray-400/20 !shadow-none hover:!bg-gray-400/50 dark:hover:!bg-gray-600/50">Cancelar</NeumorphicButton>
                        <NeumorphicButton type="submit"><Save className="w-5 h-5 mr-2" />Salvar</NeumorphicButton>
                    </div>
                </form>
            </NeumorphicCard>
        </div>
    );
};


// --- Página de Metas ---
const GoalsPage = ({ goals, onSaveGoal, onDeleteGoal, onAddProgress }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    const handleOpenModalForEdit = (goal) => {
        setEditingGoal(goal);
        setIsModalOpen(true);
    };

    const handleOpenModalForAdd = () => {
        setEditingGoal(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingGoal(null);
    };

    return (
        <>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Metas Financeiras</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Defina e acompanhe os seus objetivos financeiros</p>
            <div className={`${neumorphicElementBg} ${neumorphicShadowOut} rounded-lg p-3 mb-6`}>
                <NeumorphicButton onClick={handleOpenModalForAdd} className="font-extrabold"><Plus className="w-5 h-5 mr-2" />Nova Meta</NeumorphicButton>
            </div>
            
            {goals.length > 0 ? (
                <div className="flex flex-col space-y-6">
                    {goals.map(goal => (
                        <GoalCard 
                            key={goal.id} 
                            goal={goal} 
                            onAddProgress={onAddProgress}
                            onEdit={handleOpenModalForEdit}
                            onDelete={onDeleteGoal}
                        />
                    ))}
                </div>
            ) : (
                <NeumorphicCard className="flex flex-col items-center justify-center text-center h-80">
                    <div className={`${neumorphicShadowIn} p-5 rounded-full mb-4`}><Target className="w-12 h-12 text-gray-400" /></div>
                    <p className="font-bold text-lg text-gray-700 dark:text-gray-300">Nenhuma meta registada</p>
                    <p className="text-gray-500 dark:text-gray-400">Crie a sua primeira meta financeira para começar</p>
                </NeumorphicCard>
            )}

            <GoalModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={onSaveGoal} goalToEdit={editingGoal} />
        </>
    );
}

// --- Página de Relatórios ---
const ReportsPage = ({ transactions, isDarkMode }) => {
    const revenueVsExpensesData = useMemo(() => {
        const data = transactions.reduce((acc, t) => {
            const month = new Date(t.date).toLocaleString('pt-br', { month: 'short', year: '2-digit' });
            if (!acc[month]) acc[month] = { name: month, receitas: 0, despesas: 0 };
            if (t.type === 'receita') {
                acc[month].receitas += t.amount;
            } else {
                acc[month].despesas += t.amount;
            }
            return acc;
        }, {});
        
        return Object.values(data).map(monthData => ({
            ...monthData,
            saldo: monthData.receitas - monthData.despesas
        }));
    }, [transactions]);

    const expensesByCategoryData = useMemo(() => {
        const data = transactions
            .filter(t => t.type === 'despesa')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {});
        return Object.entries(data).map(([name, value], index) => ({
            name,
            value,
            fill: COLORS[index % COLORS.length],
        }));
    }, [transactions]);

    const balanceTrendData = useMemo(() => {
        const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
        const monthlyData = {};
        let runningBalance = 0;

        sorted.forEach(t => {
            runningBalance += t.type === 'receita' ? t.amount : -t.amount;
            const month = new Date(t.date).toLocaleString('pt-br', { month: 'short', year: '2-digit' });
            monthlyData[month] = { name: month, saldo: runningBalance };
        });
        
        return Object.values(monthlyData);
    }, [transactions]);
    
    const responsibleAnalysisData = useMemo(() => {
        const data = ['Ambos', 'Ele', 'Ela'].reduce((acc, name) => {
            acc[name] = { receitas: 0, despesas: 0 };
            return acc;
        }, {});

        transactions.forEach(t => {
            const key = t.responsible.charAt(0).toUpperCase() + t.responsible.slice(1);
            if (data[key]) {
                if(t.type === 'receita') data[key].receitas += t.amount;
                else data[key].despesas += t.amount;
            }
        });
        
        return Object.entries(data).map(([name, values]) => ({
            name,
            saldo: values.receitas - values.despesas,
            receitas: values.receitas,
            despesas: values.despesas
        }));
    }, [transactions]);

    const tickColor = isDarkMode ? '#e5e7eb' : '#1f2937';

    return (
        <>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Relatórios Financeiros</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Análise detalhada das suas finanças</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NeumorphicCard>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Evolução Mensal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueVsExpensesData}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" tick={{ fill: tickColor, fontWeight: 'bold' }} />
                            <YAxis tickFormatter={yAxisFormatter} tick={{ fill: tickColor, fontWeight: 'bold' }} />
                            <Tooltip content={<TooltipContent isDarkMode={isDarkMode} />} />
                            <Legend wrapperStyle={{ fontWeight: 'bold' }} />
                            <Bar dataKey="receitas" fill="#22c55e" name="Receitas" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="despesas" fill="#ef4444" name="Despesas" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="saldo" fill="#3b82f6" name="Saldo" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </NeumorphicCard>
                <NeumorphicCard>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Análise por Categoria (Despesas)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                           <Pie data={expensesByCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={100} paddingAngle={5}>
                                {expensesByCategoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                           </Pie>
                           <Tooltip content={<TooltipContent isDarkMode={isDarkMode} />} />
                        </PieChart>
                    </ResponsiveContainer>
                     <div className="space-y-2 mt-4 text-sm">
                        {expensesByCategoryData.map((entry, index) => (
                            <div key={index} className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                <span className="font-semibold text-gray-600 dark:text-gray-400">{entry.name}</span>
                                <span className="ml-auto font-bold text-gray-800 dark:text-white">{tooltipFormatter(entry.value)}</span>
                            </div>
                        ))}
                    </div>
                </NeumorphicCard>
                <NeumorphicCard>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Tendência do Saldo</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={balanceTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" tick={{ fill: tickColor, fontWeight: 'bold' }} />
                            <YAxis tickFormatter={yAxisFormatter} tick={{ fill: tickColor, fontWeight: 'bold' }} />
                            <Tooltip content={<TooltipContent isDarkMode={isDarkMode} />} />
                            <Line type="monotone" dataKey="saldo" stroke="#8884d8" strokeWidth={2} dot={{r: 6, fill: '#8884d8'}} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </NeumorphicCard>
                <NeumorphicCard>
                     <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Análise por Responsável</h3>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={responsibleAnalysisData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" tick={{ fill: tickColor, fontWeight: 'bold' }} />
                            <YAxis tickFormatter={yAxisFormatter} tick={{ fill: tickColor, fontWeight: 'bold' }} />
                            <Tooltip content={<TooltipContent isDarkMode={isDarkMode} />} />
                            <Bar dataKey="saldo" name="Saldo">
                               {responsibleAnalysisData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.saldo >= 0 ? '#22c55e' : '#ef4444'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        {responsibleAnalysisData.map(item => (
                            <div key={item.name} className={`${neumorphicElementBg} ${neumorphicShadowIn} p-3 rounded-xl flex justify-between items-center text-sm`}>
                                <span className="font-bold text-gray-800 dark:text-white">{item.name}</span>
                                <span className={`font-bold ${item.saldo >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    Saldo: {tooltipFormatter(item.saldo)}
                                </span>
                            </div>
                        ))}
                    </div>
                </NeumorphicCard>
            </div>
        </>
    );
};

// --- Modal de Categoria ---
const CategoryModal = ({ isOpen, onClose, onSave, categoryToEdit }) => {
    const getInitialState = () => ({ name: '', type: 'despesa' });
    const [category, setCategory] = useState(getInitialState());
    
    useEffect(() => {
        if (categoryToEdit) setCategory(categoryToEdit);
        else setCategory(getInitialState());
    }, [categoryToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(categoryToEdit ? category : { ...category, id: Date.now() });
        onClose();
    };

    if (!isOpen) return null;
    const modalTitle = categoryToEdit ? "Editar Categoria" : "Nova Categoria";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <NeumorphicCard className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-gray-800 dark:text-white">{modalTitle}</h2><button type="button" onClick={onClose} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-2 rounded-full`}><X className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button></div>
                    <div className="space-y-6">
                        <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Nome da Categoria</label><NeumorphicInput name="name" value={category.name} onChange={handleChange} placeholder="Ex: Salário, Supermercado" /></div>
                        <div><label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Tipo Padrão Sugerido</label>
                            <NeumorphicSelect name="type" value={category.type} onChange={handleChange}>
                                <option value="despesa">Despesa</option>
                                <option value="receita">Receita</option>
                                <option value="nenhum">Nenhum (para ambos)</option>
                            </NeumorphicSelect>
                        </div>
                    </div>
                    <div className="flex gap-4 pt-8">
                        <NeumorphicButton type="button" onClick={onClose} className="!bg-gray-400/20 !shadow-none hover:!bg-gray-400/50 dark:hover:!bg-gray-600/50">Cancelar</NeumorphicButton>
                        <NeumorphicButton type="submit"><Save className="w-5 h-5 mr-2" />Salvar</NeumorphicButton>
                    </div>
                </form>
            </NeumorphicCard>
        </div>
    );
};


// --- Página de Categorias ---
const CategoriesPage = ({ categories, onSaveCategory, onDeleteCategory, transactions }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const handleOpenModalForEdit = (category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleOpenModalForAdd = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    return (
        <>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Gerir Categorias</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Adicione, edite ou remova as suas categorias de transações.</p>
            <div className={`${neumorphicElementBg} ${neumorphicShadowOut} rounded-lg p-3 mb-6`}><NeumorphicButton onClick={handleOpenModalForAdd}><Plus className="w-5 h-5 mr-2" />Nova Categoria</NeumorphicButton></div>
            <NeumorphicCard>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Categorias Existentes ({categories.length})</h3>
                <div className="space-y-4">{categories.map((cat) => (
                    <div key={cat.id} className={`${neumorphicElementBg} ${neumorphicShadowIn} p-4 rounded-xl flex items-center`}>
                        <GripVertical className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-4 cursor-grab" />
                        <div className="flex-grow">
                            <p className="font-bold text-gray-800 dark:text-white">{cat.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">Tipo Padrão: {cat.type}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                            <button onClick={() => handleOpenModalForEdit(cat)} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-2.5 rounded-lg`}>
                                <Edit className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                            </button>
                            <button onClick={() => onDeleteCategory(cat.id, cat.name)} className={`${neumorphicElementBg} ${neumorphicShadowOut} ${neumorphicShadowHover} ${neumorphicShadowActive} p-2.5 rounded-lg`}>
                                <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                            </button>
                        </div>
                    </div>
                ))}</div>
            </NeumorphicCard>
            <CategoryModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={onSaveCategory} categoryToEdit={editingCategory} />
        </>
    );
};

// --- Página de Usuários (Ainda estática) ---
const UsuariosPage = () => (
    <NeumorphicCard>
        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Usuários Registados ({usersData.length})</h3>
        <div className="space-y-4">
            {usersData.map((user) => (
                <div key={user.id} className={`${neumorphicElementBg} ${neumorphicShadowIn} p-4 rounded-xl flex items-center`}>
                    <div className="pr-4">{user.role === 'Admin' ? <ShieldCheck className="w-6 h-6" /> : <User className="w-6 h-6" />}</div>
                    <div className="flex-grow">
                        <p className="font-bold text-gray-800 dark:text-white">{user.name} {user.isYou && <span className="text-sm">(Você)</span>}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            ))}
        </div>
    </NeumorphicCard>
);


// --- Componente da Barra Lateral ---
const Sidebar = ({ isDarkMode, toggleDarkMode, activePage, setActivePage, isSidebarOpen, setIsSidebarOpen }) => {
    const navigationItems = [
        { name: 'Painel', icon: Home, page: 'Painel' }, { name: 'Transações', icon: CreditCard, page: 'Transacoes' },
        { name: 'Metas', icon: Target, page: 'Metas' }, { name: 'Relatórios', icon: BarChart2, page: 'Relatorios' },
        { name: 'Categorias', icon: Settings, page: 'Categorias' }, { name: 'Usuários', icon: Users, page: 'Usuarios' },
    ];
    
    return (
        <aside className={`${neumorphicElementBg} ${neumorphicShadowOut} m-2 rounded-2xl w-64 flex flex-col p-4 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative fixed h-[calc(100vh-1rem)] z-20`}>
            <div className="flex items-center gap-3 mb-10">
                <div className={`${neumorphicElementBg} ${neumorphicShadowOut} p-3 rounded-xl flex items-center justify-center`}>
                    <Heart className="w-7 h-7 text-pink-500" />
                </div>
                <div>
                    <h2 className="font-bold text-lg text-gray-800 dark:text-white">Finanças do Casal</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Gestão financeira conjunta</p>
                </div>
                <button className="md:hidden p-1 rounded-full text-gray-700 dark:text-gray-300 absolute top-2 right-2" onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <nav>
                <ul>{navigationItems.map((item) => (
                    <li key={item.name} className="mb-2">
                        <a href="#" onClick={(e) => {e.preventDefault(); setActivePage(item.page); setIsSidebarOpen(false);}} className={`flex items-center p-3 rounded-lg transition-all font-extrabold ${activePage === item.page ? `${neumorphicShadowIn} text-black dark:text-white` : `text-gray-900 dark:text-gray-100 ${neumorphicShadowHover}`}`}>
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </a>
                    </li>
                ))}</ul>
            </nav>
            <div className="mt-8">
                 <button onClick={toggleDarkMode} className={`w-full flex items-center justify-center p-3 rounded-lg font-extrabold text-gray-900 dark:text-gray-100 ${neumorphicShadowHover} ${neumorphicShadowOut}`}>
                    {isDarkMode ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                    {isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
                </button>
            </div>
        </aside>
    );
};
// --- Componente Principal da App ---
export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activePage, setActivePage] = useState('Painel');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alert, setAlert] = useState({ isOpen: false, message: '' });
    
    // ===== ESTADO CENTRALIZADO COM LOCALSTORAGE =====
    // Carrega os dados do localStorage ou usa os dados iniciais como fallback.
    const [transactions, setTransactions] = useState(() => {
        try {
            const localData = localStorage.getItem('transactions');
            return localData ? JSON.parse(localData) : initialTransactions;
        } catch (error) {
            console.error("Could not parse transactions from localStorage", error);
            return initialTransactions;
        }
    });

    const [categories, setCategories] = useState(() => {
        try {
            const localData = localStorage.getItem('categories');
            return localData ? JSON.parse(localData) : initialCategories;
        } catch (error) {
            console.error("Could not parse categories from localStorage", error);
            return initialCategories;
        }
    });

    const [goals, setGoals] = useState(() => {
        try {
            const localData = localStorage.getItem('goals');
            return localData ? JSON.parse(localData) : initialGoals;
        } catch (error) {
            console.error("Could not parse goals from localStorage", error);
            return initialGoals;
        }
    });

    // Salva os dados no localStorage sempre que houver uma alteração.
    useEffect(() => {
        try {
            localStorage.setItem('transactions', JSON.stringify(transactions));
        } catch (error) {
            console.error("Could not save transactions to localStorage", error);
        }
    }, [transactions]);

    useEffect(() => {
        try {
            localStorage.setItem('categories', JSON.stringify(categories));
        } catch (error) {
            console.error("Could not save categories to localStorage", error);
        }
    }, [categories]);

    useEffect(() => {
        try {
            localStorage.setItem('goals', JSON.stringify(goals));
        } catch (error) {
            console.error("Could not save goals to localStorage", error);
        }
    }, [goals]);
    // ===============================================

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    
    // ===== FUNÇÕES DE MANIPULAÇÃO DE DADOS =====
    const handleSaveTransaction = (transactionData, isEditing) => {
        const parsedAmount = parseFloat(transactionData.amount) || 0;

        if (!isEditing) {
            // --- LÓGICA PARA CRIAR NOVAS TRANSAÇÕES ---
            const parsedInstallments = parseInt(transactionData.installments, 10) || 1;
            if (transactionData.recurrence === 'Parcelado' && parsedInstallments > 1) {
                const newInstallments = [];
                const installmentValue = parsedAmount / parsedInstallments;
                const originalDate = new Date(transactionData.date + 'T00:00:00');
                const groupId = Date.now(); 

                for (let i = 0; i < parsedInstallments; i++) {
                    const installmentDate = new Date(originalDate);
                    installmentDate.setMonth(originalDate.getMonth() + i);
                    newInstallments.push({
                        ...transactionData,
                        id: groupId + i,
                        groupId: groupId,
                        amount: installmentValue,
                        date: installmentDate.toISOString().split('T')[0],
                        totalInstallments: parsedInstallments,
                        currentInstallment: i + 1,
                    });
                }
                setTransactions(prev => [...prev, ...newInstallments].sort((a, b) => new Date(b.date) - new Date(a.date)));
            } else {
                setTransactions(prev => [{ ...transactionData, id: Date.now(), amount: parsedAmount, groupId: null }, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
            }
        } else {
            // --- LÓGICA PARA EDITAR TRANSAÇÕES EXISTENTES ---
            const originalTransaction = transactions.find(t => t.id === transactionData.id);
            if (!originalTransaction) return;

            const wasParcelado = originalTransaction.groupId !== null;
            const isNowParcelado = transactionData.recurrence === 'Parcelado';

            setTransactions(prev => {
                let newTransactions = [...prev];

                if (isNowParcelado) {
                    if (wasParcelado) {
                        newTransactions = newTransactions.filter(t => t.groupId !== originalTransaction.groupId);
                    } else {
                        newTransactions = newTransactions.filter(t => t.id !== originalTransaction.id);
                    }

                    const parsedInstallments = parseInt(transactionData.installments, 10) || 1;
                    const installmentValue = parsedAmount / parsedInstallments;
                    const originalDate = new Date(transactionData.date + 'T00:00:00');
                    const newGroupId = Date.now();

                    for (let i = 0; i < parsedInstallments; i++) {
                        const installmentDate = new Date(originalDate);
                        installmentDate.setMonth(originalDate.getMonth() + i);
                        newTransactions.push({
                            ...transactionData,
                            id: newGroupId + i,
                            groupId: newGroupId,
                            amount: installmentValue,
                            date: installmentDate.toISOString().split('T')[0],
                            totalInstallments: parsedInstallments,
                            currentInstallment: i + 1,
                        });
                    }
                } else if (wasParcelado && !isNowParcelado) {
                    newTransactions = newTransactions.filter(t => t.groupId !== originalTransaction.groupId);
                    newTransactions.push({
                        ...transactionData,
                        amount: parsedAmount,
                        groupId: null,
                        installments: null,
                        totalInstallments: null,
                        currentInstallment: null,
                    });
                } else { // !wasParcelado && !isNowParcelado
                    newTransactions = newTransactions.map(t =>
                        t.id === transactionData.id
                            ? { ...transactionData, amount: parsedAmount, groupId: null }
                            : t
                    );
                }

                return newTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            });
        }
    };

    const handleDeleteTransaction = (id) => {
        const transactionToDelete = transactions.find(t => t.id === id);
        if (!transactionToDelete) return;

        if (transactionToDelete.groupId) {
            setTransactions(prev => prev.filter(t => t.groupId !== transactionToDelete.groupId));
        } else {
            setTransactions(prev => prev.filter(t => t.id !== id));
        }
    };
    
    const handleSaveCategory = (savedCategory) => {
        const exists = categories.some(c => c.id === savedCategory.id);
        if (exists) setCategories(prev => prev.map(c => c.id === savedCategory.id ? savedCategory : c));
        else setCategories(prev => [...prev, savedCategory]);
    };

    const handleDeleteCategory = (categoryId, categoryName) => {
        const isCategoryInUse = transactions.some(transaction => transaction.category === categoryName);

        if (isCategoryInUse) {
            setAlert({ isOpen: true, message: 'Não foi possível excluir, pois existem registros vinculados a esta categoria.' });
        } else {
            setCategories(prev => prev.filter(c => c.id !== categoryId));
        }
    };
    
    const handleSaveGoal = (savedGoal) => {
        const exists = goals.some(g => g.id === savedGoal.id);
        if (exists) setGoals(prev => prev.map(g => g.id === savedGoal.id ? savedGoal : g));
        else setGoals(prev => [...prev, savedGoal]);
    };

    const handleDeleteGoal = (id) => {
        setGoals(prev => prev.filter(g => g.id !== id));
    };
    
    const handleAddProgressToGoal = (goalId, amountToAdd) => {
        setGoals(prevGoals => prevGoals.map(goal => {
            if (goal.id === goalId) {
                const newCurrentAmount = goal.currentAmount + amountToAdd;
                return {
                    ...goal,
                    currentAmount: newCurrentAmount > goal.targetAmount ? goal.targetAmount : newCurrentAmount,
                };
            }
            return goal;
        }));
    };
    // ========================================

    const pageTitles = {
        Painel: "Painel Financeiro", Transacoes: "Transações", Metas: "Metas Financeiras",
        Relatorios: "Relatórios Financeiros", Categorias: "Gerir Categorias", Usuarios: "Gerir Usuários"
    };

    const renderPage = () => {
        switch(activePage) {
            case 'Painel': return <DashboardPage transactions={transactions} categories={categories} goals={goals} isDarkMode={isDarkMode} />;
            case 'Transacoes': return <TransactionsPage transactions={transactions} categories={categories} onSaveTransaction={handleSaveTransaction} onDeleteTransaction={handleDeleteTransaction} />;
            case 'Metas': return <GoalsPage goals={goals} onSaveGoal={handleSaveGoal} onDeleteGoal={handleDeleteGoal} onAddProgress={handleAddProgressToGoal} />;
            case 'Relatorios': return <ReportsPage transactions={transactions} isDarkMode={isDarkMode}/>;
            case 'Categorias': return <CategoriesPage transactions={transactions} categories={categories} onSaveCategory={handleSaveCategory} onDeleteCategory={handleDeleteCategory} />;
            case 'Usuarios': return <UsuariosPage />;
            default: return <DashboardPage transactions={transactions} categories={categories} goals={goals} isDarkMode={isDarkMode} />;
        }
    }

    return (
        <div className={`flex h-screen font-sans ${isDarkMode ? 'dark' : ''} ${neumorphicBaseBg} relative`}>
            <GlobalStyles />
            <AlertModal isOpen={alert.isOpen} onClose={() => setAlert({ isOpen: false, message: '' })} message={alert.message} />
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" onClick={() => setIsSidebarOpen(false)} />}
            
            <Sidebar 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode} 
                activePage={activePage} 
                setActivePage={setActivePage}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-colors flex flex-col">
                 <header className="md:hidden flex items-center justify-between mb-6">
                    <button onClick={() => setIsSidebarOpen(true)} className={`${neumorphicElementBg} ${neumorphicShadowHover} ${neumorphicShadowActive} p-3 rounded-lg`}>
                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">{pageTitles[activePage]}</h1>
                    <div className="w-12"></div>
                </header>
                {renderPage()}
            </main>
        </div>
    );
}
