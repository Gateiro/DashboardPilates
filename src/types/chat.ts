export interface ChatContact {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    status: 'online' | 'offline';
    avatarColor: string; 
}

export interface ChatMessage {
    id: number;
    text: string;
    sender: 'me' | 'them'; 
    timestamp: string;
}