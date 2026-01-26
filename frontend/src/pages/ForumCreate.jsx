import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import { ArrowLeft, Save } from 'lucide-react';

const ForumCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: '',
        conteudo: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/forum', formData);
            navigate('/forum');
        } catch (error) {
            console.error("Error creating topic", error);
            alert("Error creating topic");
        }
    };

    const inputStyle = "w-full bg-dark-lighter/50 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-2.5 transition-all duration-300 placeholder-gray-500 hover:border-gray-600 backdrop-blur-sm";
    const labelStyle = "block text-gray-300 text-sm font-bold mb-2";

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/forum')}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-3xl font-bold text-white">Create New Topic</h2>
                        <p className="text-gray-400">Start a new discussion with the community.</p>
                    </div>
                </div>

                <div className="bg-dark-lighter/30 border border-gray-800 rounded-2xl p-8 backdrop-blur-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Title"
                            name="titulo"
                            value={formData.titulo}
                            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                            required
                            placeholder="What's on your mind?"
                        />

                        <div>
                            <label className={labelStyle}>Content</label>
                            <textarea
                                name="conteudo"
                                value={formData.conteudo}
                                onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                                required
                                className={`${inputStyle} h-48 resize-none`}
                                placeholder="Describe your topic in detail..."
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit">
                                <div className="flex items-center gap-2">
                                    <Save size={18} />
                                    Post Topic
                                </div>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ForumCreate;
