'use client';

import { useState } from 'react';
import { Plus, Search, Tag, Check, Trash2 } from 'lucide-react';
import { plansData } from '@/data/planos';
import { Plan } from '@/types/planos';
import { CreatePlanModal } from './cadastroPlanos';

export function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>(plansData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredPlans = plans.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddPlan = (newPlanData: Omit<Plan, 'id' | 'active'>) => {
        const newPlan = { 
            id: Date.now(), 
            active: true,
            ...newPlanData 
        };
        setPlans([...plans, newPlan]);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Planos e Pacotes</h1>
                    <p className="text-gray-500 text-sm">Gerencie os preços e recorrências</p>
                </div>
                
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-primary hover:brightness-110 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm flex items-center gap-2 transition-all active:scale-95"
                >
                    <Plus size={20} />
                    Novo Plano
                </button>
            </div>

            {/* Lista de Planos (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlans.map((plan) => (
                    <div 
                        key={plan.id} 
                        className={`relative bg-white rounded-2xl p-6 border transition-all hover:shadow-lg group flex flex-col justify-between h-full
                            ${plan.active ? 'border-gray-200' : 'border-gray-100 opacity-60 grayscale'}`}
                    >
                        {/* Ação de Excluir (Hover) */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div>
                            {/* Nome e Ícone */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-primary-10 rounded-lg text-primary">
                                    <Tag size={18} />
                                </div>
                                <h3 className="font-bold text-gray-700">{plan.name}</h3>
                            </div>

                            {/* Preço Grande */}
                            <div className="mb-4">
                                <span className="text-3xl font-bold text-gray-800">
                                    {formatCurrency(plan.price)}
                                </span>
                                <span className="text-sm text-gray-500 font-medium"> / {plan.period.toLowerCase()}</span>
                            </div>

                            {/* Detalhes */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check size={16} className="text-accent" />
                                    <span>{plan.classesPerWeek}x por semana</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check size={16} className="text-accent" />
                                    <span>Acesso à agenda online</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check size={16} className="text-accent" />
                                    <span>Fidelidade: {plan.period}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Status (Rodapé do Card) */}
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded 
                                ${plan.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                {plan.active ? 'Ativo' : 'Inativo'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <CreatePlanModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleAddPlan}
            />
        </div>
    );
}