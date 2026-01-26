import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    const scrollRef = useRef();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        // Conecta ao servidor (ajuste a URL se necessário)
        socketRef.current = io('http://localhost:3000');

        socketRef.current.on('chat_message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const msgData = {
            id: Date.now(),
            usuario_id: user.id,
            usuario_nome: user.nome,
            mensagem: message,
            criado_em: new Date()
        };

        socketRef.current.emit('chat_message', msgData);
        setMessage('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-dark-light border border-gray-800 w-80 h-[450px] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gray-800/50 border-b border-gray-700 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-white font-bold text-sm">Global Chat</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.usuario_id === user.id ? 'items-end' : 'items-start'}`}>
                                    <span className="text-[10px] text-gray-500 mb-1 ml-1">{msg.usuario_nome}</span>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.usuario_id === user.id
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                                        }`}>
                                        {msg.mensagem}
                                    </div>
                                </div>
                            ))}
                            {messages.length === 0 && (
                                <div className="h-full flex items-center justify-center text-gray-600 text-xs text-center px-6">
                                    Welcome to the global school chat! Be respectful.
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={sendMessage} className="p-4 border-t border-gray-800 flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-dark-lighter border-none rounded-xl px-3 py-2 text-xs text-white focus:ring-1 focus:ring-primary placeholder-gray-600"
                            />
                            <button type="submit" className="bg-primary hover:bg-primary-dark text-white p-2 rounded-xl transition-colors">
                                <Send size={14} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 text-white"
            >
                {isOpen ? <X /> : <MessageCircle />}
            </motion.button>
        </div>
    );
};

export default Chat;
