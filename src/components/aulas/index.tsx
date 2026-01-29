'use client';

import { useState } from 'react';
import { Plus, Search, Dumbbell, Clock, Users, MoreVertical, Trash2, Edit } from 'lucide-react';
import { classesData } from '@/data/aulas';
import { ClassType } from '@/types/aulas';
import { CreateClassModal } from './cadastroAulas';

export function ClassesPage() {
    const [classes, setClasses] = useState<ClassType[]>(classesData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredClasses = classes.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClass = (newClassData: Omit<ClassType, 'id'>) => {
        const newClass = { id: Date.now(), ...newClassData };
        setClasses([...classes, newClass]);
    };

    // Função cor do level
    const getLevelColor = (level: string) => {
        switch(level) {
            case 'Iniciante': return 'bg-green-100 text-green-700 border-green-200';
            case 'Intermediário': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Avançado': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-primary-10 text-primary border-primary-20';
        }
    };

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Tipos de Aula</h1>
                    <p className="text-gray-500 text-sm">Catálogo de serviços oferecidos</p>
                </div>
                
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-primary hover:brightness-110 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm flex items-center gap-2 transition-all active:scale-95"
                >
                    <Plus size={20} />
                    Nova Aula
                </button>
            </div>

            {/* Busca */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Buscar modalidade..." 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all group relative">
                        
                        {/* Ações (Hover) */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button className="p-2 bg-gray-100 hover:bg-primary-10 hover:text-primary rounded-lg transition-colors">
                                <Edit size={16} />
                            </button>
                            <button className="p-2 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        {/* Ícone e Título */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-10 text-primary flex items-center justify-center">
                                <Dumbbell size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 leading-tight">{item.name}</h3>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border mt-1 inline-block ${getLevelColor(item.level)}`}>
                                    {item.level}
                                </span>
                            </div>
                        </div>

                        {/* Descrição */}
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">
                            {item.description}
                        </p>

                        {/* Rodapé do Card */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <Clock size={16} className="text-gray-400" />
                                <span className="font-semibold">{item.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <Users size={16} className="text-gray-400" />
                                <span className="font-semibold">{item.capacity} alunos</span>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Card Vazio pra add */}
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-primary hover:text-primary hover:bg-primary-10/10 transition-all min-h-[200px]"
                >
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary-10 transition-colors">
                        <Plus size={24} />
                    </div>
                    <span className="font-semibold">Adicionar Nova Aula</span>
                </button>
            </div>

            <CreateClassModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleAddClass}
            />
        </div>
    );
}