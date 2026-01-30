'use client';

import { useState } from 'react';
import { X, CheckCircle, DollarSign, Tag, Calendar, CreditCard } from 'lucide-react';
import { Transaction } from '@/types/transacao';

interface CreateTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: Omit<Transaction, 'id'>) => void;
}

export function CreateTransactionModal({ isOpen, onClose, onSave }: CreateTransactionModalProps) {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        
        type: 'income' as 'income' | 'expense',
        category: 'Mensalidade',
        date: new Date().toISOString().split('T')[0],
        
        status: 'pago' as 'pago' | 'pendente',
        paymentMethod: 'Pix'
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            amount: Number(formData.amount),
        });
        onClose();
        setFormData({
            description: '',
            amount: '',
            type: 'income',
            category: 'Mensalidade',
            date: new Date().toISOString().split('T')[0],
            status: 'pago',
            paymentMethod: 'Pix'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">

                <div className={`p-6 text-white flex justify-between items-center transition-colors
                    ${formData.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}>
                    <div>
                        <h3 className="font-bold text-xl">Nova Movimentação</h3>
                        <p className="text-white/80 text-sm mt-1">
                            {formData.type === 'income' ? 'Registrar Entrada' : 'Registrar Saída'}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* Tipo de Transação */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'income' })}
                            className={`p-3 rounded-xl font-bold border-2 transition-all
                                ${formData.type === 'income'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
                        >
                            Entrada
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'expense' })}
                            className={`p-3 rounded-xl font-bold border-2 transition-all
                                ${formData.type === 'expense'
                                    ? 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
                        >
                            Saída
                        </button>
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
                        <input
                            type="text" required
                            placeholder={formData.type === 'income' ? "Ex: Mensalidade Maria" : "Ex: Conta de Luz"}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Valor */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Valor (R$)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="number" step="0.01" required
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Data */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Data</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="date" required
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Categoria */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Categoria</label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
                                <select
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm appearance-none"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {formData.type === 'income' ? (
                                        <>
                                            <option>Mensalidade</option>
                                            <option>Taxa de Matrícula</option>
                                            <option>Venda de Produto</option>
                                        </>
                                    ) : (
                                        <>
                                            <option>Contas Fixas</option>
                                            <option>Manutenção</option>
                                            <option>Equipamentos</option>
                                            <option>Salários</option>
                                            <option>Marketing</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Método Pagamento */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Pagamento</label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-3 text-gray-400" size={18} />
                                <select
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm appearance-none"
                                    value={formData.paymentMethod}
                                    onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                                >
                                    <option>Pix</option>
                                    <option>Cartão Crédito</option>
                                    <option>Cartão Débito</option>
                                    <option>Dinheiro</option>
                                    <option>Boleto</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 py-3 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2
                            ${formData.type === 'income' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                        >
                            <CheckCircle size={20} />
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}