import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        cep: '',
        uf: '',
        rua: '',
        numero: '',
        complemento: ''
    });

    useEffect(() => {
        if (isEditing) {
            fetchStudent();
        }
    }, [id]);

    const fetchStudent = async () => {
        try {
            const response = await api.get(`/students/${id}`);
            const data = response.data;
            // Clean null values
            Object.keys(data).forEach(key => {
                if (data[key] === null) data[key] = '';
            });
            setFormData(data);
        } catch (error) {
            console.error("Error fetching student", error);
            navigate('/dashboard');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); // Fixed: using name attribute is standard but Input component uses direct props. Wait, Input comp uses `onChange` passing the event? No, wait. 
        // My Input component passes the event to onChange.
        // But my Input component usage in Login used specific set functions.
        // Here I need to handle it properly.
        // Let's check Input implementation: <input onChange={onChange} ... />
        // So `e` is the event.
    };

    // Helper because my Input component expects specific props, not just {...register}
    const updateField = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/students/${id}`, formData);
            } else {
                await api.post('/students', formData);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error("Error saving student", error);
            alert("Error saving student");
        }
    };

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <div className="bg-dark-lighter/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <div className="w-32 h-32 bg-primary/20 rounded-full blur-2xl font-bold" />
                    </div>

                    <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        {isEditing ? 'Edit Student' : 'New Student'}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="md:col-span-2">
                            <Input label="Name" value={formData.nome || ''} onChange={handleChange} placeholder="Full Name" name="nome" required />
                        </div>
                        <Input label="CPF" value={formData.cpf || ''} onChange={handleChange} placeholder="000.000.000-00" name="cpf" required />
                        <Input label="CEP" value={formData.cep || ''} onChange={handleChange} placeholder="00000-000" name="cep" />
                        <Input label="UF" value={formData.uf || ''} onChange={handleChange} placeholder="SP" name="uf" />
                        <div className="md:col-span-2">
                            <Input label="Street" value={formData.rua || ''} onChange={handleChange} placeholder="Street Address" name="rua" />
                        </div>
                        <Input label="Number" value={formData.numero || ''} onChange={handleChange} placeholder="123" name="numero" />
                        <Input label="Complement" value={formData.complemento || ''} onChange={handleChange} placeholder="Apt, Suite, etc." name="complemento" />

                        <div className="md:col-span-2 flex justify-end gap-4 mt-6 pt-6 border-t border-gray-800">
                            <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isEditing ? 'Save Changes' : 'Create Student'}
                            </Button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </Layout>
    );
};

export default StudentForm;
