import { Layout, User, Calendar, Dumbbell, CalendarDays, Star, BadgeDollarSign, MessageCircleMoreIcon, Settings } from "lucide-react"

import { MenuItem } from "@/types/sydebar"

export const menuItems: MenuItem[] = [
    { id: 1, text: "Dashboard", path: "/home", icon: <Layout size={30} className="mr-3" /> },
    { id: 2, text: "Agenda", path: "/agenda", icon: <CalendarDays size={30} className="mr-3" /> },
    { id: 3, text: "Alunos", path: "/alunos", icon: <User size={30} className="mr-3" /> },
    { id: 4, text: "Aulas", path: "/aulas", icon: <Calendar size={30} className="mr-3" />, },
    { id: 5, text: "Exercícios", path: "/exercicios", icon: <Dumbbell size={30} className="mr-3" /> },
    { id: 6, text: "Planos", path: "/planos", icon: <Star size={30} className="mr-3" /> },
    { id: 7, text: "Financeiro", path: "/financeiro", icon: <BadgeDollarSign size={30} className="mr-3" /> },
    { id: 8, text: "Atendimento", path: "/atendimento", icon: <MessageCircleMoreIcon size={30} className="mr-3" /> },
    { id: 9, text: "Configurações", path: "/configuracoes", icon: <Settings size={30} className="mr-3" /> },
]