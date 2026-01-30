'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Smile } from 'lucide-react';
import { contactsData, initialMessages } from '@/data/chat';
import { ChatContact, ChatMessage } from '@/types/chat';

export function SupportPage() {
    // --- ESTADOS ---
    const [contacts, setContacts] = useState<ChatContact[]>(contactsData);
    const [selectedContact, setSelectedContact] = useState<ChatContact | null>(contacts[0]); // Começa com o primeiro selecionado
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (selectedContact) {
            // Pega o primeiro nome do aluno selecionado
            const firstName = selectedContact.name.split(' ')[0];

            // Recria as mensagens simulando que são para este aluno
            const personalizedMessages = initialMessages.map(msg => ({
                ...msg,
                text: msg.text.replace('Maria', firstName),
                id: Math.random()
            }));

            setMessages(personalizedMessages);
        }
    }, [selectedContact]);

    // Referência para o scroll automático
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll para baixo sempre que chega mensagem nova
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Filtrar contatos
    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Enviar mensagem
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedContact) return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // 1. Cria a mensagem do Professor (Eu)
        const myMessage: ChatMessage = {
            id: Date.now(),
            text: newMessage,
            sender: 'me',
            timestamp: currentTime
        };

        // Adiciona ao chat
        setMessages(prev => [...prev, myMessage]);

        // Atualiza a última mensagem na lista lateral
        setContacts(prev => prev.map(c =>
            c.id === selectedContact.id
                ? { ...c, lastMessage: newMessage, time: currentTime }
                : c
        ));

        setNewMessage('');

        // 2. Simula resposta automática
        setTimeout(() => {
            const replyText = "Obrigado! Vou verificar.";
            const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const reply: ChatMessage = {
                id: Date.now() + 1,
                text: replyText,
                sender: 'them',
                timestamp: replyTime
            };

            // Adiciona resposta ao chat
            setMessages(prev => [...prev, reply]);

            setContacts(prev => prev.map(c =>
                c.id === selectedContact.id
                    ? { ...c, lastMessage: replyText, time: replyTime, unreadCount: c.unreadCount + 1 }
                    : c
            ));
        }, 2000);
    };

    return (
        <div className="flex h-[calc(100vh-140px)] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* --- COLUNA ESQUERDA: LISTA DE CONTATOS --- */}
            <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col bg-gray-50/50">
                {/* Header da Lista */}
                <div className="p-4 border-b border-gray-200 bg-white">
                    <h2 className="font-bold text-lg text-gray-800 mb-4">Atendimento</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar aluno..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Lista de Contatos */}
                <div className="flex-1 overflow-y-auto">
                    {filteredContacts.map(contact => (
                        <button
                            key={contact.id}
                            onClick={() => setSelectedContact(contact)}
                            className={`w-full flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors border-b border-gray-100 text-left
                                ${selectedContact?.id === contact.id ? 'bg-primary-10/50 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                        >
                            {/* Avatar */}
                            <div className="relative">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${contact.avatarColor}`}>
                                    {contact.name.charAt(0)}
                                </div>
                                {contact.status === 'online' && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-800 truncate">{contact.name}</h3>
                                    <span className="text-xs text-gray-400">{contact.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                            </div>

                            {/* Contador de Não Lidas */}
                            {contact.unreadCount > 0 && (
                                <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {contact.unreadCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- COLUNA DIREITA: CHAT ATIVO --- */}
            {selectedContact ? (
                <div className="flex-1 flex flex-col bg-[#F0F2F5]"> {/* Fundo cinza estilo WhatsApp */}

                    {/* Header do Chat */}
                    <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedContact.avatarColor}`}>
                                {selectedContact.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{selectedContact.name}</h3>
                                <p className="text-xs text-green-600 font-medium">
                                    {selectedContact.status === 'online' ? 'Online agora' : 'Offline'}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 text-gray-400">
                            <button className="hover:text-primary transition-colors"><Phone size={20} /></button>
                            <button className="hover:text-primary transition-colors"><Video size={20} /></button>
                            <button className="hover:text-gray-600 transition-colors"><MoreVertical size={20} /></button>
                        </div>
                    </div>

                    {/* Área de Mensagens (Scroll) */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundImage: 'url("/chat-bg-pattern.png")', backgroundBlendMode: 'overlay' }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm relative text-sm
                                    ${msg.sender === 'me'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-tl-none'}`}
                                >
                                    <p>{msg.text}</p>
                                    <p className={`text-[10px] mt-1 text-right
                                        ${msg.sender === 'me' ? 'text-primary-10' : 'text-gray-400'}`}>
                                        {msg.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Área de Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Smile size={24} />
                            </button>
                            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Paperclip size={22} />
                            </button>

                            <input
                                type="text"
                                placeholder="Digite uma mensagem..."
                                className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />

                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="p-3 bg-primary hover:brightness-110 text-white rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </div>

                </div>
            ) : (
                /* Estado Vazio (Nenhum chat selecionado) */
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <Send size={40} className="ml-1" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-600">Suporte ao Aluno</h3>
                    <p className="max-w-md text-center mt-2">Selecione um aluno na lista ao lado para iniciar o atendimento.</p>
                </div>
            )}
        </div>
    );
}