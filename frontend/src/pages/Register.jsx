import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import Input from '../components/Input';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { nome, email, senha });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || 'Erro ao registrar');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-dark">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm z-10 relative"
            >
                <div className="bg-dark-light/50 backdrop-blur-md shadow-2xl rounded px-8 pt-6 pb-8 mb-4 border border-gray-700">
                    <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                        Create Account
                    </h2>
                    {error && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Name"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Your Name"
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="********"
                            required
                        />
                        <div className="flex items-center justify-between mt-6">
                            <Button type="submit">
                                Register
                            </Button>
                            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-primary hover:text-secondary">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
