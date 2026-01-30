import { Plan } from "@/types/planos";

export const plansData: Plan[] = [
    {
        id: 1,
        name: "Mensal Básico",
        price: 280.00,
        period: "Mensal",
        classesPerWeek: 1,
        active: true
    },
    {
        id: 2,
        name: "Mensal Padrão",
        price: 450.00,
        period: "Mensal",
        classesPerWeek: 2,
        active: true
    },
    {
        id: 3,
        name: "Trimestral Foco",
        price: 1200.00,
        period: "Trimestral",
        classesPerWeek: 2,
        active: true
    },
    {
        id: 4,
        name: "Semestral Livre",
        price: 2100.00,
        period: "Semestral",
        classesPerWeek: 3,
        active: false 
    }
];