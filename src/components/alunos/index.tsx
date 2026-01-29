'use client';

import { useState } from 'react';
import { Search, Plus, Filter, User, Trash2, Edit, ChevronDown, X } from 'lucide-react';
import { studentsData } from '@/data/students';
import { Student } from '@/types/alunos';
import { CreateStudentModal } from './cadastroAluno';

export function StudentsPage() {
    // --- Estados ---
    const [students, setStudents] = useState<Student[]>(studentsData as Student[]);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('todos');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // --- Lógica filtro ---
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'todos' || student.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // --- Lógica add aluno ---
    const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'lastPresence'>) => {
        const newStudent: Student = {
            id: Date.now(),
            ...newStudentData,
            lastPresence: '-'
        };

        // Adiciona ao topo da lista
        setStudents([newStudent, ...students]);
    };

    const handleSelectFilter = (status: string) => {
        setStatusFilter(status);
        setIsFilterOpen(false);
    };

    return (
        <div className="space-y-6" onClick={() => isFilterOpen && setIsFilterOpen(false)}>
            
            {/* CABEÇALHO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 m-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Alunos</h1>
                    <p className="text-gray-500 text-sm">Gerencie matrículas e perfis</p>
                </div>
                
                {/* Botão abre o modal */}
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-primary hover:brightness-110 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm flex items-center gap-2 transition-all active:scale-95"
                >
                    <Plus size={20} />
                    Novo Aluno
                </button>
            </div>

            {/* Barra filtros */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center relative z-20">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Buscar por nome..." 
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="relative w-full sm:w-auto">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFilterOpen(!isFilterOpen);
                        }}
                        className={`w-full sm:w-48 px-4 py-2.5 border rounded-xl font-medium flex items-center justify-between gap-2 transition-colors
                            ${isFilterOpen || statusFilter !== 'todos' ? 'border-primary text-primary bg-primary-10' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        <div className="flex items-center gap-2">
                            <Filter size={18} />
                            <span>
                                {statusFilter === 'todos' ? 'Todos os Status' : 
                                 statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                            </span>
                        </div>
                        {statusFilter !== 'todos' ? (
                            <div onClick={(e) => { e.stopPropagation(); handleSelectFilter('todos'); }} className="hover:bg-primary-20 rounded-full p-0.5">
                                <X size={14} />
                            </div>
                        ) : (
                            <ChevronDown size={16} />
                        )}
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-0 top-full mt-2 w-full sm:w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                            <div className="p-1">
                                {['todos', 'ativo', 'pendente', 'inativo'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleSelectFilter(status)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between
                                            ${statusFilter === status ? 'bg-primary-10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <span className="capitalize">{status === 'todos' ? 'Mostrar Todos' : status}</span>
                                        {status !== 'todos' && (
                                            <span className={`w-2 h-2 rounded-full ${status === 'ativo' ? 'bg-accent' : status === 'pendente' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabela alunos */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <th className="p-6">Aluno</th>
                                <th className="p-6">Plano</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Última Presença</th>
                                <th className="p-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-primary-10 text-primary flex items-center justify-center font-bold text-sm uppercase">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{student.name}</p>
                                                    <p className="text-xs text-gray-400">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="font-medium text-gray-600 text-sm">{student.plan}</span>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border
                                                ${student.status === 'ativo' ? 'bg-accent/10 text-accent border-accent/20' : 
                                                  student.status === 'pendente' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                                                  'bg-red-50 text-red-500 border-red-100'}`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-sm text-gray-500 font-mono">{student.lastPresence}</span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-primary-10 text-gray-400 hover:text-primary rounded-lg transition-colors">
                                                    <Edit size={18} />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-400">
                                        <User size={48} className="mx-auto mb-3 opacity-20" />
                                        <p>Nenhum aluno encontrado.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Inserção de aluno --- */}
            <CreateStudentModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onSave={handleAddStudent} 
            />
        </div>
    );
}