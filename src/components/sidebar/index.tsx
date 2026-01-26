'use client'

import { usePathname, useRouter } from 'next/navigation';
import { menuItems } from "@/utils/sidebar"; 
import { useEffect, useState } from 'react';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    
    if (pathname === "/") {
        return null; 
    }

    const isSelected = (path: string) => pathname === path;

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    return (
        // SIDEBAR FIXA
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-50">
            
            {/* Logo */}
            <div className="flex items-center justify-center h-24 border-b border-gray-100 mb-4">
                <img src="/logo.png" alt="Logo" className="w-40 object-contain" /> 
            </div>

            {/* Menu Principal */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    if (item.id < 7) { // Itens de cima
                        const active = isSelected(item.path);
                        return (
                            <button 
                                key={item.id} 
                                onClick={() => handleNavigate(item.path)}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                                    ${active 
                                        ? 'bg-primary-10 text-primary shadow-sm' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className={`transition-colors ${active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                    {item.icon}
                                </span>
                                <span className="ml-3 font-semibold">{item.text}</span>
                            </button>
                        );
                    }
                    return null; 
                })}
            </nav>

            {/* Menu Inferior (Suporte) */}
            <div className="p-4 mt-auto border-t border-gray-100">
                <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Sistema
                </p>
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        if (item.id > 6) { 
                            const active = isSelected(item.path);
                            return (
                                <button 
                                    key={item.id} 
                                    onClick={() => handleNavigate(item.path)}
                                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                                        ${active 
                                            ? 'bg-primary-10 text-primary' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <span className={`transition-colors ${active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="ml-3 font-semibold">{item.text}</span>
                                </button>
                            );
                        }
                        return null; 
                    })}
                </div>
            </div>
        </aside>
    );
}