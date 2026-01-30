'use client';

import { useState } from 'react';
import { X, CheckCircle, DollarSign, Calendar, Hash } from 'lucide-react';
import { Plan } from '@/types/planos';

interface CreatePlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newPlan: Omit<Plan, 'id' | 'active'>) => void;
}

export function CreatePlanModal({ isOpen, onClose, onSave }: CreatePlanModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        period: 'Mensal',
        classesPerWeek: 1
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: Number(formData.price), 
            classesPerWeek: Number(formData.classesPerWeek)
        });
        onClose();
        setFormData({ name: '', price: '', period: 'Mensal', classesPerWeek: 1 });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
                
                <div className="bg-primary p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-xl">Novo Plano</h3>
                        <p className="text-primary-10 text-sm mt-1">Configure um novo pacote de aulas</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Plano</label>
                        <input 
                            type="text" required
                            placeholder="Ex: Anual Ilimitado"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Preço */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Preço Total (R$)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input 
                                    type="number" step="0.01" required
                                    placeholder="0.00"
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    value={formData.price}
                                    onChange={e => setFormData({...formData, price: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Aulas por Semana */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Aulas / Semana</label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input 
                                    type="number" min="1" max="7" required
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    value={formData.classesPerWeek}
                                    onChange={e => setFormData({...formData, classesPerWeek: Number(e.target.value)})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Periodicidade */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Periodicidade</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                            <select 
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                                value={formData.period}
                                onChange={e => setFormData({...formData, period: e.target.value})}
                            >
                                <option>Mensal</option>
                                <option>Bimestral</option>
                                <option>Trimestral</option>
                                <option>Semestral</option>
                                <option>Anual</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 py-3 bg-primary hover:brightness-110 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            <CheckCircle size={20} />
                            Salvar Plano
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}