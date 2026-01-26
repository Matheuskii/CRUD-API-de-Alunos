import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Plus } from 'lucide-react';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get('/students');
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/students/${id}`);
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error("Error deleting student", error);
            alert("Failed to delete");
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2">My Students</h2>
                    <p className="text-gray-400">Manage your students and their information.</p>
                </div>
                <Link to="/student/new">
                    <Button>
                        <div className="flex items-center gap-2">
                            <Plus size={18} strokeWidth={2.5} />
                            Add Student
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
                        {students.map((student) => (
                            <motion.div
                                key={student.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                whileHover={{ y: -5 }}
                                className="group relative bg-dark-lighter/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-gradient-to-br from-gray-800 to-black w-12 h-12 rounded-xl flex items-center justify-center border border-gray-700 text-gray-300 font-bold text-lg">
                                            {student.nome.charAt(0)}
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Link to={`/student/edit/${student.id}`} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                                <Edit2 size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(student.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1">{student.nome}</h3>
                                    <p className="text-gray-500 text-xs font-mono mb-1 tracking-wide">{student.cpf}</p>
                                    <p className="text-primary/70 text-xs mb-4 truncate">{student.email}</p>

                                    <div className="space-y-2 text-sm text-gray-400 border-t border-gray-800 pt-4 mt-2">
                                        <div className="flex items-start gap-2">
                                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-0.5">Addr</span>
                                            <span className="truncate">{student.rua}, {student.numero}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-0.5">Loc</span>
                                            <span>{student.uf}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {students.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 border-2 border-dashed border-gray-800 rounded-3xl bg-dark-lighter/10">
                            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4 text-gray-600">
                                <Plus size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-400 mb-1">No students yet</h3>
                            <p className="text-sm">Get started by adding your first student.</p>
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
