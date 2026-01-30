import { ChatContact, ChatMessage } from "@/types/chat";

export const contactsData: ChatContact[] = [
    { id: 1, name: "Maria Silva", lastMessage: "Prof, posso remarcar a aula?", time: "10:30", unreadCount: 2, status: 'online', avatarColor: "bg-blue-100 text-blue-600" },
    { id: 2, name: "João Souza", lastMessage: "Obrigado pela aula de hoje!", time: "Ontem", unreadCount: 0, status: 'offline', avatarColor: "bg-green-100 text-green-600" },
    { id: 3, name: "Ana Clara", lastMessage: "Qual o valor do plano trimestral?", time: "Ontem", unreadCount: 0, status: 'offline', avatarColor: "bg-purple-100 text-purple-600" },
];

export const initialMessages: ChatMessage[] = [
    { id: 1, text: "Bom dia, Maria! Tudo bem?", sender: 'me', timestamp: "10:00" },
    { id: 2, text: "Bom dia, Prof!", sender: 'them', timestamp: "10:05" },
    { id: 3, text: "Estou com uma dorzinha na lombar hoje.", sender: 'them', timestamp: "10:06" },
    { id: 4, text: "Entendi. Vamos pegar leve no alongamento hoje então.", sender: 'me', timestamp: "10:10" },
    { id: 5, text: "Prof, posso remarcar a aula de amanhã?", sender: 'them', timestamp: "10:30" },
];