import { Dumbbell, BarChart3 } from "lucide-react";
import { topExercisesData, frequencyData } from "@/data/dashboard";

export function ExercisesPanel() {
    return (
        <div className="bg-base-200 p-6 rounded-box shadow-sm border border-base-300 h-full flex flex-col justify-between">
            
            {/* Top Exercícios */}
            <div className="mb-8">
                <h3 className="font-bold text-lg text-gray-600 mb-6 flex items-center gap-2">
                    <div className="p-2 bg-secondary/20 rounded-lg text-secondary-content">
                        <Dumbbell size={20} />
                    </div>
                    Exercícios Populares
                </h3>
                
                <ul className="space-y-6">
                    {topExercisesData.map((exercise) => (
                        <li key={exercise.id}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-gray-600">{exercise.name}</span>
                            </div>
                            <div className="w-full bg-base-100 rounded-full h-3 overflow-hidden">
                                <div className={`h-full rounded-full ${exercise.color} ${exercise.progress} transition-all duration-1000`}></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="divider opacity-50"></div>

            {/* Frequência */}
            <div>
                <h3 className="font-bold text-lg text-gray-600 mb-6 flex items-center gap-2">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                        <BarChart3 size={20} />
                    </div>
                    Horários de Pico
                </h3>
                
                <div className="flex justify-between items-end h-40 px-2">
                  {frequencyData.map((bar, index) => (
                    <div key={index} className="flex flex-col items-center w-1/6 group">
                      <div className={`w-12 bg-primary/40 group-hover:bg-primary/60 rounded-t-2xl ${bar.height} transition-all duration-500 relative`}>
                          {/* Hover */}
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {bar.count}
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