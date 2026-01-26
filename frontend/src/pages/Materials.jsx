import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Plus, FileText, Video, Link as LinkIcon, BookOpen, HelpCircle } from 'lucide-react';

const Materials = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await api.get('/materials');
            setMaterials(response.data);
        } catch (error) {
            console.error("Error fetching materials", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/materials/${id}`);
            setMaterials(materials.filter(m => m.id !== id));
        } catch (error) {
            console.error("Error deleting material", error);
            alert("Failed to delete");
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'VIDEO': return <Video size={24} />;
            case 'PDF': return <FileText size={24} />;
            case 'LINK': return <LinkIcon size={24} />;
            case 'LICAO': return <BookOpen size={24} />;
            case 'QUIZ': return <HelpCircle size={24} />;
            default: return <LinkIcon size={24} />;
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2">Materials</h2>
                    <p className="text-gray-400">Study resources, lessons, and quizzes.</p>
                </div>
                <Link to="/materials/new">
                    <Button>
                        <div className="flex items-center gap-2">
                            <Plus size={18} strokeWidth={2.5} />
                            Add Material
                        </div>
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 rounded-xl bg-dark-lighter/30 animate-pulse border border-gray-800" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {materials.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                whileHover={{ y: -5 }}
                                className="group relative bg-dark-lighter/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:shadow-primary/5 flex flex-col"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-gradient-to-br from-gray-800 to-black w-12 h-12 rounded-xl flex items-center justify-center border border-gray-700 text-primary font-bold">
                                            {getIcon(item.tipo)}
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700 uppercase tracking-wider">
                                            {item.tipo}
                                        </span>
                                        {item.categoria && (
                                            <span className="ml-2 text-xs font-semibold px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700 uppercase tracking-wider">
                                                {item.categoria}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{item.titulo}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{item.descricao}</p>

                                    {item.link_arquivo && (
                                        <a href={item.link_arquivo} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light text-sm underline break-all">
                                            {item.link_arquivo}
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {materials.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 border-2 border-dashed border-gray-800 rounded-3xl bg-dark-lighter/10">
                            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4 text-gray-600">
                                <BookOpen size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-400 mb-1">No materials yet</h3>
                            <p className="text-sm">Create lessons, quizzes, or upload resources.</p>
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
};

export default Materials;
