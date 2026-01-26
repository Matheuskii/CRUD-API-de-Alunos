import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ForumList = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            const res = await api.get('/forum');
            setTopics(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2">Forum</h2>
                    <p className="text-gray-400">Discuss with teachers and classmates.</p>
                </div>
                <Link to="/forum/new">
                    <Button>
                        <div className="flex items-center gap-2">
                            <Plus size={18} strokeWidth={2.5} />
                            New Topic
                        </div>
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                <AnimatePresence>
                    {topics.map((topic) => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-dark-lighter/40 border border-gray-800 p-6 rounded-2xl hover:border-gray-600 transition-all cursor-pointer group"
                        >
                            <Link to={`/forum/${topic.id}`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                            {topic.titulo}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                            {topic.conteudo}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                                            <div className="flex items-center gap-1.5">
                                                <User size={12} />
                                                <span className="text-gray-400">{topic.autor_nome || 'Unknown'}</span>
                                            </div>
                                            <span>•</span>
                                            <span>{new Date(topic.criado_em).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-500">
                                        <MessageSquare size={18} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {topics.length === 0 && (
                    <div className="py-20 text-center text-gray-500 border-2 border-dashed border-gray-800 rounded-3xl">
                        No topics yet. Be the first to start a discussion!
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ForumList;
