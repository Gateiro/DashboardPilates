'use client';

import { useState } from 'react';
import { X, User, Mail, Calendar, CheckCircle, Phone } from 'lucide-react';
import { Student } from '@/types/alunos';

interface CreateStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (student: Omit<Student, 'id' | 'lastPresence'>) => void;
}

export function CreateStudentModal({ isOpen, onClose, onSave }: CreateStudentModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '', 
        plan: 'Mensal 2x',
        status: 'ativo' as const,
        startDate: new Date().toISOString().split('T')[0]
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
        setFormData({
            name: '',
            email: '',
            phone: '', 
            plan: 'Mensal 2x',
            status: 'ativo',
            startDate: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                
                <div className="bg-primary p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-xl">Novo Aluno</h3>
                        <p className="text-primary-10 text-sm mt-1">Preencha os dados da matrícula</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    
                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input 
                                type="text" required
                                placeholder="Ex: Maria Silva"
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Email e Telefone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input 
                                    type="email" required
                                    placeholder="email@ex.com"
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* --- Telefone --- */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Celular</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input 
                                    type="tel" required
                                    placeholder="(00) 00000-0000"
                                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                                    value={formData.phone}
                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Plano */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Plano</label>
                            <select 
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                value={formData.plan}
                                onChange={e => setFormData({...formData, plan: e.target.value})}
                            >
                                <option>Mensal 1x</option>
                                <option>Mensal 2x</option>
                                <option>Mensal 3x</option>
                                <option>Trimestral</option>
                                <option>Semestral</option>
                                <option>Pilates Solo</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Status Inicial</label>
                            <select 
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value as any})}
                            >
                                <option value="ativo">Ativo</option>
                                <option value="pendente">Pendente</option>
                            </select>
                        </div>
                    </div>

                    {/* Data Início */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Data de Início</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input 
                                type="date" required
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                value={formData.startDate}
                                onChange={e => setFormData({...formData, startDate: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 py-3 bg-primary hover:brightness-110 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            <CheckCircle size={20} />
                            Matricular
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}