import { Bell, Search, Settings, User } from "lucide-react";

export function Header() {
    return (
        // sticky: cola no topo
        // top-0: encosta no topo
        // z-40: fica acima do conteúdo do calendário
        // w-full: ocupa toda a largura disponível da div pai
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            
            {/* Título ou Breadcrumbs (Lado Esquerdo) */}
            <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-sm text-gray-500">Bem-vindo ao painel</p>
            </div>

            {/* Ações (Lado Direito) */}
            <div className="flex items-center gap-4">
                {/* Barra de Busca (Oculta em mobile) */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                    <Search size={18} className="mr-2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="bg-transparent outline-none w-48"
                    />
                </div>

                {/* Botões de Ícone */}
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 relative">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                    <Settings size={20} />
                </button>

                {/* Perfil */}
                <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-700">Admin User</p>
                        <p className="text-xs text-gray-500">Instrutor</p>
                    </div>
                    <div className="w-10 h-10 bg-primary-10 rounded-full flex items-center justify-center text-primary border border-primary-20">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}