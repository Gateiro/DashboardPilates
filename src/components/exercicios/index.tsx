'use client';

import { useState } from 'react';
import { Search, Play, Filter, Plus } from 'lucide-react';
import { exercisesData } from '@/data/exercicios';
import { Exercise } from '@/types/exercicios';
import { VideoModal } from './exercicios';

export function ExercisesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    
    const [currentVideo, setCurrentVideo] = useState<Exercise | null>(null);

    const categories = ['Todos', ...Array.from(new Set(exercisesData.map(e => e.category)))];

    const filteredExercises = exercisesData.filter(ex => {
        const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || ex.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Biblioteca de Exercícios</h1>
                    <p className="text-gray-500 text-sm">Vídeos demonstrativos e tutoriais</p>
                </div>
                
                <button className="bg-primary hover:brightness-110 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm flex items-center gap-2 transition-all active:scale-95">
                    <Plus size={20} />
                    Adicionar Vídeo
                </button>
            </div>

            {/* Barra de Filtros */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Busca */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Buscar exercício..." 
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                {/* Filtro de Categoria (Tags) */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-all border
                                ${selectedCategory === cat 
                                    ? 'bg-primary text-white border-primary shadow-md' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Vídeos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredExercises.map((exercise) => (
                    <div 
                        key={exercise.id} 
                        className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                        onClick={() => setCurrentVideo(exercise)}
                    >
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                            {/* Fundo decorativo */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-20 to-gray-200 opacity-50"></div>
                            
                            {/* Botão Play Central */}
                            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-primary shadow-lg scale-100 group-hover:scale-110 transition-transform z-10">
                                <Play size={24} className="ml-1 fill-primary" />
                            </div>

                            {/* Duração no Canto */}
                            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium backdrop-blur-sm">
                                {exercise.duration}
                            </span>
                        </div>

                        {/* Informações */}
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary-10 px-2 py-0.5 rounded">
                                    {exercise.category}
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                {exercise.name}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2 h-10">
                                {exercise.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* O Modal de Player */}
            <VideoModal 
                isOpen={!!currentVideo} 
                onClose={() => setCurrentVideo(null)} 
                exercise={currentVideo}
            />
        </div>
    );
}