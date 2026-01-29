export interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    plan: string;
    status: 'ativo' | 'pendente' | 'inativo';
    startDate: string;
    lastPresence: string;
}