import { User, Clock } from "lucide-react";
import { nextClientsData } from "@/data/dashboard"; 

export function NextClient() {
    return (
        <div className="w-full">
            <h3 className="font-bold text-gray-600 text-lg mb-4 flex items-center gap-2">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <User size={20} />
                </div>
                Próximos Alunos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {nextClientsData.map((client) => (
                    <div key={client.id} className="bg-base-200 p-4 rounded-box shadow-sm border border-base-300 hover:shadow-md transition-all duration-300 flex items-center gap-4">
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${client.avatarColor}`}>
                            {client.name.charAt(0)}
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-700 text-sm">{client.name}</span>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                <Clock size={12} />
                                <span>{client.time}</span>
                            </div>
                            
                            {/* Status */}
                            <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 
                                ${client.status === 'confirmado' ? 'text-green-400' : 
                                  client.status === 'cancelado' ? 'text-red-300' : 'text-yellow-400'}`}>
                                {client.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}