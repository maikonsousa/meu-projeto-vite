import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { Home, BarChart2, Repeat, Target, Settings, Users, Sun, Moon, DollarSign, ArrowUp, ArrowDown, Calendar, User, Briefcase, Plus, Search, Edit, Trash2, ChevronDown, Download, GripVertical, X, Save, ArrowUpRight, ArrowDownRight, Heart, CreditCard, ShieldCheck, Menu, AlertTriangle } from 'lucide-react';

// --- Estilos Neumórficos e Globais ---
const neumorphicBaseBg = "bg-gray-200 dark:bg-gray-900";
const neumorphicElementBg = "bg-[#e0e0e0] dark:bg-[#374151]";
const neumorphicShadowOut = "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#2d3748,-8px_-8px_16px_#4a5568]";
const neumorphicShadowIn = "shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#2d3748,inset_-4px_-4px_8px_#4a5568]";
const neumorphicShadowHover = "hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] dark:hover:shadow-[4px_4px_8px_#2d3748,-4px_-4px_8px_#4a5568]"; 
const neumorphicShadowActive = "active:shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#2d3748,inset_-2px_-2px_4px_#4a5568]";

const GlobalStyles = () => (
    <style>{`
        select option {
            background-color: #e0e0e0;
            color: #1f2937;
            font-weight: bold;
        }
        .dark select option {
             background-color: #374151;
             color: #e5e7eb;
        }
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
];

const usersData = [
    { id: 1, name: 'Maikon89', email: 'maikonsousa89@gmail.com', role: 'Admin', isYou: true },
    { id: 2, name: 'Beatriz Marques', email: 'biamarques95@gmail.com', role: 'Usuário', isYou: false },
];

export default function App() {
  return (
    <div>
      <GlobalStyles />
      <h1 style={{color: 'white'}}>Mock funcionando!</h1>
      <ul>
        {initialTransactions.map(t => (
          <li key={t.id} style={{color: 'white'}}>{t.name} - {t.amount}</li>
        ))}
      </ul>
    </div>
  );
}