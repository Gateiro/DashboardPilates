'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { theme } from '@/theme';
import { agendaData } from '@/data/dashboard'; // Importamos os novos dados

export function AgendaControl() {
    const [currentDate, setCurrentDate] = useState(new Date());
    // Estado para o dia selecionado (Inicia com o dia de hoje)
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
    const year = currentDate.getFullYear();
    const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    // --- LÓGICA DO CALENDÁRIO ---
    const generateCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const grid = [];
        const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

        const daysInPrevMonth = new Date(year, month, 0).getDate();
        for (let i = 0; i < firstDayOfMonth; i++) {
            const day = daysInPrevMonth - firstDayOfMonth + i + 1;
            grid.push({ date: new Date(year, month - 1, day), isCurrentMonth: false });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            grid.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }

        const totalCells = 42; 
        let nextMonthDay = 1;
        while (grid.length < totalCells) {
            grid.push({ date: new Date(year, month + 1, nextMonthDay), isCurrentMonth: false });
            nextMonthDay++;
        }

        return { grid, daysOfWeek };
    };
    
    const { grid, daysOfWeek } = generateCalendarGrid();
    
    const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
        if (!isCurrentMonth) return; 
        const isoDate = date.toISOString().split('T')[0];
        setSelectedDate(isoDate); // Define o dia clicado como selecionado
    };

    // Filtra os agendamentos para o dia selecionado
    const selectedDayAppointments = agendaData.filter(item => item.date === selectedDate);

    // Formata a data selecionada para exibir no título da lista
    const selectedDateDisplay = new Date(selectedDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

    return (
        <div className={`${theme.colors.card[2]} p-4 rounded-lg flex flex-col h-full`}>
            <p className='font-bold mb-4 flex items-center gap-2'>
                <CalendarIcon size={18} />
                Controle de Agenda
            </p>
            
            {/* --- NAVEGAÇÃO --- */}
            <div className='flex justify-between items-center mb-4 bg-white/40 p-2 rounded-lg'>
                <button onClick={handlePrevMonth} className='p-1 rounded-full hover:bg-white transition-colors'>
                    <ChevronLeft size={20} />
                </button>
                <h3 className="font-bold text-sm text-gray-700">{`${formattedMonth} ${year}`}</h3>
                <button onClick={handleNextMonth} className='p-1 rounded-full hover:bg-white transition-colors'>
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* --- GRID DO CALENDÁRIO --- */}
            <div className="mb-6">
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="font-bold text-[10px] text-gray-500">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {grid.map(({ date, isCurrentMonth }, index) => {
                        const day = date.getDate();
                        const isoDate = date.toISOString().split('T')[0];
                        const isSelected = selectedDate === isoDate;
                        const isToday = new Date().toISOString().split('T')[0] === isoDate;
                        
                        let dayClasses = "h-7 w-7 flex items-center justify-center rounded-full text-xs cursor-pointer transition-all duration-200 ";

                        if (!isCurrentMonth) {
                            dayClasses += "text-gray-300 cursor-not-allowed";
                        } else if (isSelected) {
                            dayClasses += `${theme.colors.bg[4]} text-white shadow-md transform scale-110`; // Destaque Selecionado
                        } else {
                            dayClasses += "text-gray-700 hover:bg-white/60";
                        }
                        
                        if (isToday && !isSelected) {
                            dayClasses += " border border-blue-400 font-bold text-blue-600";
                        }

                        return (
                            <button
                                key={index}
                                className={dayClasses}
                                onClick={() => handleDayClick(date, isCurrentMonth)}
                                disabled={!isCurrentMonth}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* --- LISTA DE AGENDAMENTOS DO DIA --- */}
            <div className="flex-grow bg-white/60 rounded-lg p-3 overflow-y-auto">
                <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider border-b border-gray-200 pb-1">
                    Agenda: {selectedDateDisplay}
                </h4>
                
                {selectedDayAppointments.length > 0 ? (
                    <div className="space-y-2">
                        {selectedDayAppointments.map((apt, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white p-2 rounded shadow-sm border-l-4 border-blue-400">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">{apt.student}</p>
                                    <p className="text-[10px] text-gray-500">{apt.type}</p>
                                </div>
                                <span className="text-xs font-mono bg-gray-100 px-1 rounded text-gray-600">
                                    {apt.time}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-xs py-4">
                        <p>Nenhum agendamento.</p>
                    </div>
                )}
            </div>
        </div>
    );
}