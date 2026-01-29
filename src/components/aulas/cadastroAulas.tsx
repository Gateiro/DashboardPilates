'use client';

import { useState } from 'react';
import { X, CheckCircle, Clock, Users, BarChart, FileText } from 'lucide-react';
import { ClassType } from '@/types/aulas';

interface CreateClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newClass: Omit<ClassType, 'id'>) => void;
}

export function CreateClassModal({ isOpen, onClose, onSave }: CreateClassModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        duration: '50 min',
        level: 'Todos' as const,
        capacity: 1
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
        setFormData({ name: '', description: '', duration: '50 min', level: 'Todos', capacity: 1 });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                
                <div className="bg-primary p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-xl">Nova Modalidade</h3>
                        <p className="text-primary-10 text-sm mt-1">Cadastre um novo tipo de aula</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    
                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nome da Aula</label>
                        <input 
                            type="text" required
                            placeholder="Ex: Pilates Kids"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Descrição Curta</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input 
                                type="text"
                                placeholder="Ex: Focado em crianças de 5 a 10 anos"
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Duração */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Duração</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input 
                                    type="text" required
                                    placeholder="Ex: 50 min"
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                                    value={formData.duration}
                                    onChange={e => setFormData({...formData, duration: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Capacidade */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Capacidade (Alunos)</label>
                            <div className="relative">
                                <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input 
                                    type="number" min="1" required
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                                    value={formData.capacity}
                                    onChange={e => setFormData({...formData, capacity: Number(e.target.value)})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nível */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nível Recomendado</label>
                        <div className="relative">
                            <BarChart className="absolute left-3 top-3 text-gray-400" size={18} />
                            <select 
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm appearance-none"
                                value={formData.level}
                                onChange={e => setFormData({...formData, level: e.target.value as any})}
                            >
                                <option>Todos</option>
                                <option>Iniciante</option>
                                <option>Intermediário</option>
                                <option>Avançado</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 py-3 bg-primary hover:brightness-110 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            <CheckCircle size={20} />
                            Salvar Aula
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}