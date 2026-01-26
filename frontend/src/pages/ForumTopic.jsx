import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft as ArrowLeftIcon, Send as SendIcon, User } from 'lucide-react';
import api from '../api/axios';
import Layout from '../components/Layout';
import Button from '../components/Button';

const ForumTopic = () => {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopic();
    }, [id]);

    const fetchTopic = async () => {
        try {
            const res = await api.get(`/forum/${id}`);
            setTopic(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!reply.trim()) return;

        try {
            await api.post(`/forum/${id}/reply`, { conteudo: reply });
            setReply('');
            fetchTopic(); // Refresh to show new reply
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return (
        <Layout>
            <div className="animate-pulse">Loading discussion...</div>
        </Layout>
    );

    if (!topic) return <Layout>Topic not found.</Layout>;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <Link to="/forum" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                    <ArrowLeftIcon size={20} /> Back to Forum
                </Link>

                {/* Main Topic */}
                <div className="bg-dark-lighter/20 border border-gray-800 rounded-2xl p-8 mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4">{topic.titulo}</h1>
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-800">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
                            {topic.autor_nome ? topic.autor_nome.charAt(0) : '?'}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">{topic.autor_nome || 'Unknown User'}</div>
                            <div className="text-xs text-gray-500">{new Date(topic.criado_em).toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
                        {topic.conteudo}
                    </div>
                </div>

                {/* Replies */}
                <h3 className="text-xl font-bold text-white mb-6 pl-2 border-l-4 border-primary">
                    Replies ({topic.replies ? topic.replies.length : 0})
                </h3>

                <div className="space-y-6 mb-10">
                    {topic.replies && topic.replies.map((r) => (
                        <div key={r.id} className="bg-dark-lighter/10 p-6 rounded-xl border border-gray-800/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300">
                                    <User size={14} />
                                </div>
                                <span className="text-sm font-bold text-gray-300">{r.autor_nome}</span>
                                <span className="text-xs text-gray-600">•</span>
                                <span className="text-xs text-gray-500">{new Date(r.criado_em).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-300 pl-11">{r.conteudo}</p>
                        </div>
                    ))}
                </div>

                {/* Reply Form */}
                <div className="bg-dark-lighter/30 border border-t border-gray-800 p-6 rounded-xl backdrop-blur sticky bottom-6 shadow-2xl">
                    <form onSubmit={handleReply} className="flex gap-4">
                        <input
                            type="text"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 bg-dark-lighter border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-white placeholder-gray-500"
                        />
                        <Button type="submit">
                            <SendIcon size={18} />
                        </Button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ForumTopic;
