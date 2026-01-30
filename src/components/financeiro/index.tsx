'use client';

import { useState } from 'react';
import { Plus, Search, TrendingUp, TrendingDown, DollarSign, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { financialData } from '@/data/financeiro';
import { Transaction } from '@/types/transacao';
import { CreateTransactionModal } from './cadastroFinanceiro';

export function FinancialPage() {
    const [transactions, setTransactions] = useState<Transaction[]>(financialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // --- CÁLCULOS DINÂMICOS ---
    const totalIncome = transactions
        .filter(t => t.type === 'income' && t.status === 'pago')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense' && t.status === 'pago')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpense;

    // --- filtro ---
    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || t.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
        const newTx = { id: Date.now(), ...newTxData };
        setTransactions([newTx, ...transactions]);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Financeiro</h1>
                    <p className="text-gray-500 text-sm">Controle de caixa e mensalidades</p>
                </div>
                
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-primary hover:brightness-110 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm flex items-center gap-2 transition-all active:scale-95"
                >
                    <Plus size={20} />
                    Nova Transação
                </button>
            </div>

            {/* --- CARDS DE RESUMO --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Entradas */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Entradas (Mês)</p>
                        <h3 className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                        <TrendingUp size={24} />
                    </div>
                </div>

                {/* Saídas */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Saídas (Mês)</p>
                        <h3 className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</h3>
                    </div>
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                        <TrendingDown size={24} />
                    </div>
                </div>

                {/* Saldo */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Saldo Líquido</p>
                        <h3 className={`text-2xl font-bold ${balance >= 0 ? 'text-primary' : 'text-red-500'}`}>
                            {formatCurrency(balance)}
                        </h3>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${balance >= 0 ? 'bg-primary-10 text-primary' : 'bg-red-50 text-red-500'}`}>
                        <DollarSign size={24} />
                    </div>
                </div>
            </div>

            {/* --- LISTA DE TRANSAÇÕES --- */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Barra de Ferramentas */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Buscar lançamentos..." 
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <button 
                            onClick={() => setTypeFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${typeFilter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            Todos
                        </button>
                        <button 
                            onClick={() => setTypeFilter('income')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${typeFilter === 'income' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
                        >
                            Entradas
                        </button>
                        <button 
                            onClick={() => setTypeFilter('expense')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${typeFilter === 'expense' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                        >
                            Saídas
                        </button>
                    </div>
                </div>

                {/* Tabela */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <th className="p-4">Descrição</th>
                                <th className="p-4">Categoria</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {tx.type === 'income' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                                            </div>
                                            <span className="font-bold text-gray-700">{tx.description}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{tx.category}</td>
                                    <td className="p-4 text-sm text-gray-500 font-mono">
                                        {new Date(tx.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded 
                                            ${tx.status === 'pago' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-right font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                                        {tx.type === 'expense' && '- '}{formatCurrency(tx.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredTransactions.length === 0 && (
                        <div className="p-12 text-center text-gray-400">
                            Nenhuma transação encontrada.
                        </div>
                    )}
                </div>
            </div>

            <CreateTransactionModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleAddTransaction}
            />
        </div>
    );
}