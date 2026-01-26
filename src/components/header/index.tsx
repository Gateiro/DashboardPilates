'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";
import { useState } from "react";
import { UserModal } from "./modal/user";
import { NotificacoesModal } from "./modal/notificacoes";

export function Header() {

    const [notifications, setNotifications] = useState(3)

    const HandleNotification = () => {
        setNotifications(0)
    }

    const pathname = usePathname();
    const isLoginPage = pathname === "/";

    const [userModal, setUserModal] = useState(false);
    const [notificationModal, setNotificationsModal] = useState(false);


    const HandleModal = (user: boolean, notification: boolean) => {
            setUserModal(user);
            setNotificationsModal(notification)
    }

    return (
        <>
            {!isLoginPage &&
                <header className="fixed top-0 right-0 h-16 z-40 flex items-center justify-end px-8 
                                   w-full lg:w-[calc(100%-16rem)] 
                                   bg-base-100/80 backdrop-blur-md border-b border-base-300">
                    
                    <div className="flex items-center gap-4">
                        {/* Botão Notificação */}
                        <div className="relative">
                            <button 
                                className="btn btn-ghost btn-circle text-secondary"
                                onClick={() => {HandleNotification(); HandleModal(false, true)}}
                            >
                                <Bell size={24} />
                                {notifications > 0 &&
                                    <span className="absolute top-0 right-0 badge badge-xs badge-error animate-pulse">
                                        {notifications}
                                    </span>
                                }
                            </button>
                        </div>

                        {/* Avatar Usuário */}
                        <button 
                            className="btn btn-circle avatar border border-base-300"
                            onClick={() => HandleModal(true, false)}
                        >
                            <div className="w-10 rounded-full bg-base-200 p-1">
                                <User size={24} className="text-secondary w-full h-full" />
                            </div>
                        </button>
                    </div>
                </header>
            }
            {userModal && <UserModal closeModal={() => HandleModal(false, false)} />}
            {notificationModal && !userModal && <NotificacoesModal closeModal={() => HandleModal(false, false)} />}
        </>
    )
}