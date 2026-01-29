export interface ClassType {
    id: number;
    name: string;
    description: string;
    duration: string; 
    level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos';
    capacity: number; 
}