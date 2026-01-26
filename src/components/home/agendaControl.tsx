'use client';

// ------- CALENDÁRIO NÃO FINALIZADO ----------

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { theme } from '@/theme';

export function AgendaControl() {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    //Armazena os dias ativos (vamos guardar como strings no formato "YYYY-MM-DD")
    const [activeDays, setActiveDays] = useState<string[]>([]);

    // Função para ir para o mês anterior
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // Função para ir ao mês seguinte
    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Formata o nome do mês e ano para exibição
    const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
    const year = currentDate.getFullYear();
    const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    // --- LÓGICA DO CALENDÁRIO ---
    const generateCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Domingo) - 6 (Sábado)
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total de dias no mês

        const grid = [];
        const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

        // 1. Preenche os dias de "preenchimento" do mês anterior
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        for (let i = 0; i < firstDayOfMonth; i++) {
            const day = daysInPrevMonth - firstDayOfMonth + i + 1;
            grid.push({ date: new Date(year, month - 1, day), isCurrentMonth: false });
        }

        // 2. Preenche os dias do mês atual
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }

        // 3. Preenche os dias de "preenchimento" do próximo mês (para completar 6 semanas)
        const totalCells = 42; 
        let nextMonthDay = 1;
        while (grid.length < totalCells) {
            grid.push({ date: new Date(year, month + 1, nextMonthDay), isCurrentMonth: false });
            nextMonthDay++;
        }

        return { grid, daysOfWeek };
    };
    
    const { grid, daysOfWeek } = generateCalendarGrid();
    
    // --- FUNÇÃO DE CLIQUE ---
    const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
        // Só permite clicar em dias do mês atual
        if (!isCurrentMonth) return; 

        // Converte a data para uma string padronizada (ex: "2025-10-20")
        const isoDate = date.toISOString().split('T')[0];

        // Lógica para "ativar/desativar"
        setActiveDays(prevActiveDays => {
            if (prevActiveDays.includes(isoDate)) {
                // Se já está ativo, remove (desativa)
                return prevActiveDays.filter(day => day !== isoDate);
            } else {
                // Se não está ativo, adiciona (ativa)
                return [...prevActiveDays, isoDate];
            }
        });
    };

    return (
        // Card verde-claro
        <div className={`${theme.colors.card[2]} p-4 rounded-lg flex flex-col`}>
            <p className='font-bold mb-2'>Controle de Agenda</p>
            
            {/* Navegação do Mês */}
            <div className='flex justify-between items-center mb-4'>
                <button onClick={handlePrevMonth} className='p-1 rounded-full hover:bg-black/10 transition-colors'>
                    <ChevronLeft size={24} />
                </button>
                <h3 className="font-bold text-lg">{`${formattedMonth} de ${year}`}</h3>
                <button onClick={handleNextMonth} className='p-1 rounded-full hover:bg-black/10 transition-colors'>
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* --- CALENDÁRIO --- */}
            <div className={`flex-grow bg-white/50 rounded-md p-2`}>
                {/* Cabeçalho dos Dias da Semana */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="font-bold text-xs text-gray-700">{day}</div>
                    ))}
                </div>

                {/* Grid dos Dias */}
                <div className="grid grid-cols-7 gap-1">
                    {grid.map(({ date, isCurrentMonth }, index) => {
                        const day = date.getDate();
                        const isoDate = date.toISOString().split('T')[0];
                        const isActive = activeDays.includes(isoDate);

                        // Define as classes dinamicamente
                        const isToday = new Date().toISOString().split('T')[0] === isoDate;
                        
                        let dayClasses = "h-8 w-8 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors ";

                        if (!isCurrentMonth) {
                            dayClasses += "text-gray-400 cursor-not-allowed"; // Dias de preenchimento
                        } else if (isActive) {
                            dayClasses += `${theme.colors.bg[4]} text-white hover:bg-opacity-80`; // Dia ATIVO
                        } else {
                            dayClasses += "text-gray-800 hover:bg-black/10"; // Dia normal
                        }
                        
                        if (isToday && !isActive) {
                            dayClasses += " border-2 border-blue-500"; // Marca o dia de hoje
                        }

                        return (
                            <button
                                key={index}
                                className={dayClasses}
                                onClick={() => handleDayClick(date, isCurrentMonth)}
                                disabled={!isCurrentMonth} // Desativa o clique em dias de preenchimento
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>
            {/*Legenda --- VER KIT DO CATALYST PARA ESTILIZAR LEGENDA*/}
            <div>
                
            </div>
        </div>
    );
}