'use client';

import { X, Play } from 'lucide-react';
import { Exercise } from '@/types/exercicios';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    exercise: Exercise | null;
}

export function VideoModal({ isOpen, onClose, exercise }: VideoModalProps) {
    if (!isOpen || !exercise) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-black rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col relative border border-gray-800">
                
                {/* Cabeçalho do Player */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-white text-lg">{exercise.name}</h3>
                        <p className="text-gray-300 text-xs">{exercise.category} • {exercise.duration}</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 bg-black/40 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Área do Vídeo (16:9) */}
                <div className="relative pt-[56.25%] bg-black">
                    <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src={`${exercise.videoUrl}?autoplay=1`}
                        title={exercise.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Descrição em baixo */}
                <div className="p-6 bg-white">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Play size={18} className="text-primary fill-primary" />
                        Instruções
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {exercise.description}
                    </p>
                </div>
            </div>
        </div>
    );
}