'use client'

import { usePathname, useRouter } from 'next/navigation';
import { menuItems } from "@/utils/sidebar"; 
import { useEffect } from 'react';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const isLoginPage = pathname === "/";

    useEffect(() => {
        if (isLoginPage) {
            return;
        }
    }, [isLoginPage, router]);

    if (isLoginPage) {
        return null; 
    }

    const isSelected = (path: string) => pathname === path;

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    return (

        <div data-theme="light" className="hidden lg:flex flex-col w-64 min-h-screen bg-base-100 gap-4 text-base-content shadow-lg">
            
            {/* Logo */}
            <div className="flex items-center justify-center p-1 h-[100px] m-4">

                <img src="/logo.png" alt="Logo Saúde em Foco" className="w-48" /> 
            </div>

 
            <ul className="menu p-4 gap-2 ">
                {menuItems.map((item) => {

                    if (item.id < 7) {
                        return (
                            <li key={item.id} onClick={() => handleNavigate(item.path)}>

                                <a className={isSelected(item.path) ? "active" : ""}>
                                    {item.icon} 
                                    <span>{item.text}</span>
                                </a>
                            </li>
                        );
                    }
                    return null; 
                })}
            </ul>


            <ul className="menu p-4">
                <li className="menu-title">
                    <span>Suporte & Config.</span>
                </li>
                
                {menuItems.map((item) => {
                    if (item.id > 6) {
                        return (
                            <li key={item.id} onClick={() => handleNavigate(item.path)}>
                                <a className={isSelected(item.path) ? "active" : ""}>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </a>
                            </li>
                        );
                    }
                    return null; 
                })}
            </ul>
        </div>
    );
}