import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import { ArrowLeft, Save } from 'lucide-react';

const MaterialForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        tipo: 'LINK',
        categoria: 'Geral',
        link_arquivo: '',
        conteudo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/materials', formData);
            navigate('/materials');
        } catch (error) {
            console.error("Error saving material", error);
            alert("Error saving material");
        }
    };

    const inputStyle = "w-full bg-dark-lighter/50 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-2.5 transition-all duration-300 placeholder-gray-500 hover:border-gray-600 backdrop-blur-sm";
    const labelStyle = "block text-gray-300 text-sm font-bold mb-2";

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/materials')}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-3xl font-bold text-white">New Material</h2>
                        <p className="text-gray-400">Add a new resource, lesson, or quiz.</p>
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
                            placeholder="Ex: Introduction to Algebra"
                        />

                        <div>
                            <label className={labelStyle}>Description</label>
                            <textarea
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                className={`${inputStyle} h-32 resize-none`}
                                placeholder="Brief description of the material..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Type</label>
                                <select
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                    className={inputStyle}
                                >
                                    <option value="LINK">Link</option>
                                    <option value="PDF">PDF Document</option>
                                    <option value="VIDEO">Video</option>
                                    <option value="LICAO">Lesson (Text)</option>
                                    <option value="QUIZ">Quiz</option>
                                </select>
                            </div>

                            <Input
                                label="Category"
                                name="categoria"
                                value={formData.categoria}
                                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                placeholder="Ex: Math, Physics, History"
                            />
                        </div>

                        {(formData.tipo === 'LINK' || formData.tipo === 'PDF' || formData.tipo === 'VIDEO') && (
                            <Input
                                label="Resource URL / File Link"
                                name="link_arquivo"
                                value={formData.link_arquivo}
                                onChange={(e) => setFormData({ ...formData, link_arquivo: e.target.value })}
                                placeholder="https://..."
                            />
                        )}

                        {(formData.tipo === 'LICAO' || formData.tipo === 'QUIZ') && (
                            <div>
                                <label className={labelStyle}>Content (Markdown/Text)</label>
                                <textarea
                                    name="conteudo"
                                    value={formData.conteudo}
                                    onChange={handleChange}
                                    className={`${inputStyle} h-64 font-mono`}
                                    placeholder={formData.tipo === 'QUIZ' ? "Enter quiz questions JSON or text..." : "Enter lesson content..."}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    {formData.tipo === 'QUIZ' ? "Tip: You can structure quizzes as desired." : "Tip: Use text to explain the lesson."}
                                </p>
                            </div>
                        )}

                        <div className="flex justify-end pt-4">
                            <Button type="submit">
                                <div className="flex items-center gap-2">
                                    <Save size={18} />
                                    Save Material
                                </div>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default MaterialForm;
