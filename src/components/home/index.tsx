import { AgendaControl } from "./agendaControl";
import { ExercisesPanel } from "./exercisesPanel";
import { NextClient } from "@/components/home/nextClients";

export function HomePage() {
    return (
        <div className="w-full min-h-screen bg-primary p-6 lg:p-8 space-y-6">
            
            <header className="flex flex-col gap-1 mt-14 mb-4">
                <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
                <p className="text-gray-500 text-sm">Visão geral do Studio</p>
            </header>

            {/* Grid Principal*/}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Próximos Alunos */}
                <div className="col-span-1 lg:col-span-12">
                    <NextClient/>
                </div>
                
                {/* 2. Gráficos */}
                <div className="col-span-1 lg:col-span-7 flex flex-col h-full">
                   <ExercisesPanel/> 
                </div>

                {/* 3. Agenda */}
                <div className="col-span-1 lg:col-span-5 flex flex-col h-full">
                    <AgendaControl/>
                </div>
                
            </div>
        </div>
    )
}