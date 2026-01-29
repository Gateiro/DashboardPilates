'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import { agendaData } from '@/data/dashboard'; 

// Interface para definir o formato de um agendamento
interface Appointment {
    date: string;
    time: string;
    student: string;
    type: string;
}

export function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    
    const [appointments, setAppointments] = useState<Appointment[]>(agendaData);
    
    // Estado de Novo Agendamento
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newType, setNewType] = useState('Pilates Solo');

    // --- LÓGICA CALENDÁRIO ---
    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
    const year = currentDate.getFullYear();
    const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    // Gera a grade de dias do mês
    const generateCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const grid = [];
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Dias do mês anterior (para preencher o início)
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push({ date: new Date(year, month - 1, daysInPrevMonth - firstDayOfMonth + i + 1), isCurrentMonth: false });
        }
        // Dias do mês atual
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }
        // Dias do próximo mês (para completar 42 células)
        let nextMonthDay = 1;
        while (grid.length < 42) {
            grid.push({ date: new Date(year, month + 1, nextMonthDay), isCurrentMonth: false });
            nextMonthDay++;
        }
        return grid;
    };
    
    const grid = generateCalendarGrid();
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // --- AÇÕES ---
    const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
        if (!isCurrentMonth) return;
        setSelectedDate(date.toISOString().split('T')[0]);
    };

    const handleAddAppointment = (e: React.FormEvent) => {
        e.preventDefault();
        const newApp: Appointment = {
            date: selectedDate,
            time: newTime,
            student: newStudent,
            type: newType
        };
        
        // Adiciona o novo agendamento à lista
        setAppointments([...appointments, newApp]);
        setIsModalOpen(false);
        setNewStudent('');
        setNewTime('');
    };

    // Filtra apenas os agendamentos do dia selecionado
    const dayAppointments = appointments.filter(app => app.date === selectedDate);
    const selectedDateDisplay = new Date(selectedDate).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
            
            {/*--- BLOCO ESQUERDO --- */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
                {/* Cabeçalho do Calendário */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                        <CalendarIcon className="text-primary" />
                        Agenda Geral
                    </h2>
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-600">
                            <ChevronLeft size={20} />
                        </button>
                        <span className="font-bold text-gray-700 w-32 text-center capitalize">{formattedMonth} {year}</span>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-600">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Dias da Semana */}
                <div className="grid grid-cols-7 mb-2 text-center">
                    {daysOfWeek.map(day => (
                        <div key={day} className="text-gray-400 font-medium text-xs uppercase tracking-wide py-2">{day}</div>
                    ))}
                </div>

                {/* Grid de Dias */}
                <div className="grid grid-cols-7 flex-1 auto-rows-fr gap-2">
                    {grid.map(({ date, isCurrentMonth }, idx) => {
                        const isoDate = date.toISOString().split('T')[0];
                        const isSelected = selectedDate === isoDate;
                        const isToday = new Date().toISOString().split('T')[0] === isoDate;
                        //Indicador de quando há aula no dia
                        const hasApps = appointments.some(app => app.date === isoDate);

                        return (
                            <button
                                key={idx}
                                onClick={() => handleDayClick(date, isCurrentMonth)}
                                disabled={!isCurrentMonth}
                                className={`
                                    relative p-2 rounded-xl flex flex-col items-center justify-start transition-all border
                                    ${!isCurrentMonth ? 'opacity-30 cursor-default border-transparent' : 'hover:border-primary/50 cursor-pointer bg-gray-50/50 border-transparent'}
                                    ${isSelected ? 'ring-2 ring-primary bg-primary-10 !border-transparent' : ''}
                                    ${isToday && !isSelected ? 'bg-blue-50 text-primary font-bold border-blue-200' : ''}
                                `}
                            >
                                <span className={`text-sm ${isSelected ? 'font-bold text-primary' : 'text-gray-600'}`}>
                                    {date.getDate()}
                                </span>
                                {hasApps && isCurrentMonth && (
                                    <div className="mt-2 flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* --- BLOCO DIREITO --- */}
            <div className="w-full lg:w-96 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selecionado</p>
                        <h3 className="text-lg font-bold text-gray-700 capitalize">{selectedDateDisplay}</h3>
                    </div>
                    
                    {/* Botão de Adicionar (Abre o Modal) */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary hover:brightness-110 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
                        title="Novo Agendamento"
                    >
                        <Plus size={24} />
                    </button>
                </div>

                {/* Lista de Aulas */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                    {dayAppointments.length > 0 ? (
                        dayAppointments.sort((a,b) => a.time.localeCompare(b.time)).map((app, idx) => (
                            <div key={idx} className="group flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary-20 hover:bg-primary-10 transition-all bg-gray-50/50">
                                <div className="flex flex-col items-center min-w-[3rem]">
                                    <span className="text-sm font-bold text-gray-700">{app.time}</span>
                                    <div className="h-8 w-0.5 bg-gray-200 group-hover:bg-primary/30 mt-1 rounded-full transition-colors"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                        {app.student}
                                    </h4>
                                    <p className="text-xs font-medium text-gray-500 mt-0.5 uppercase tracking-wide bg-white px-2 py-0.5 rounded border border-gray-100 inline-block">
                                        {app.type}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Estado Vazio
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-6 border-2 border-dashed border-gray-100 rounded-xl">
                            <CalendarIcon size={48} className="text-gray-200 mb-4" />
                            <p className="font-medium text-gray-500">Dia livre!</p>
                            <p className="text-sm mt-1">Nenhuma aula agendada.</p>
                            <button onClick={() => setIsModalOpen(true)} className="mt-4 text-primary font-bold text-sm hover:underline">
                                Agendar agora
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAL DE NOVO AGENDAMENTO --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-primary p-6 text-white flex justify-between items-center">
                            <h3 className="font-bold text-lg">Novo Agendamento</h3>
                            <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddAppointment} className="p-6 space-y-4">
                            {/* Input Data (Apenas Leitura) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Data</label>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 font-medium text-sm">
                                    {selectedDateDisplay}
                                </div>
                            </div>

                            {/* Input Nome */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Aluno</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Ex: Maria Silva"
                                        className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                                        value={newStudent}
                                        onChange={(e) => setNewStudent(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Input Hora */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Horário</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input 
                                            type="time" 
                                            required
                                            className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                                            value={newTime}
                                            onChange={(e) => setNewTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Select Tipo */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Modalidade</label>
                                    <select 
                                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                                        value={newType}
                                        onChange={(e) => setNewType(e.target.value)}
                                    >
                                        <option>Pilates Solo</option>
                                        <option>Reformer</option>
                                        <option>Cadillac</option>
                                        <option>Chair</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-primary hover:brightness-110 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all mt-4 flex items-center justify-center gap-2"
                            >
                                <Plus size={20} />
                                Confirmar Agendamento
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}