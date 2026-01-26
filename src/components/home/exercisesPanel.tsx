import { Dumbbell, BarChart3 } from "lucide-react";
import { topExercisesData, frequencyData } from "@/data/dashboard";

export function ExercisesPanel() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-border h-full flex flex-col justify-between">
            
            {/* Top Exercícios */}
            <div className="mb-8">
                <h3 className="font-bold text-lg text-gray-700 mb-6 flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                        <Dumbbell size={20} />
                    </div>
                    Exercícios Populares
                </h3>
                
                <ul className="space-y-6">
                    {topExercisesData.map((exercise) => (
                        <li key={exercise.id}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-gray-600">{exercise.name}</span>
                                <span className="text-gray-400 text-xs">{exercise.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${exercise.color}`} 
                                    style={{ width: `${exercise.progress}%` }}
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="h-px bg-gray-100 w-full my-4"></div>

            {/* Frequência */}
            <div>
                <h3 className="font-bold text-lg text-gray-700 mb-6 flex items-center gap-2">
                    <div className="p-2 bg-primary-10 rounded-lg text-primary">
                        <BarChart3 size={20} />
                    </div>
                    Horários de Pico
                </h3>
                
                <div className="flex justify-between items-end h-40 px-2">
                  {frequencyData.map((bar, index) => (
                    <div key={index} className="flex flex-col items-center w-1/6 group">
                      <div className={`w-full max-w-[40px] bg-primary/40 group-hover:bg-primary rounded-t-md ${bar.height} transition-all duration-300 relative`}>
                          {/* Hover */}
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              {bar.count} alunos
                          </span>
                      </div>
                      <p className="text-xs mt-3 text-gray-400 font-medium">{bar.label}</p>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    );
}