import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';
import { User, Shield, GraduationCap, Briefcase, School } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.put(`/users/${userId}/role`, { cargo: newRole });
            setUsers(users.map(u => u.id === userId ? { ...u, cargo: newRole } : u));
            alert('Role updated successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to update role');
        }
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <Shield size={16} className="text-red-400" />;
            case 'secretaria': return <Briefcase size={16} className="text-blue-400" />;
            case 'professor': return <GraduationCap size={16} className="text-green-400" />;
            default: return <School size={16} className="text-gray-400" />;
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2">User Administration</h2>
                    <p className="text-gray-400">Manage system users and their roles.</p>
                </div>
            </div>

            <div className="bg-dark-lighter/40 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-gray-800/50 text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-gray-600 text-xs">
                                            {user.nome.charAt(0)}
                                        </div>
                                        {user.nome}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {getRoleIcon(user.cargo)}
                                            <select
                                                value={user.cargo}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className="bg-transparent border-none text-sm text-gray-300 focus:ring-0 cursor-pointer"
                                            >
                                                <option value="aluno">Aluno</option>
                                                <option value="professor">Professor</option>
                                                <option value="secretaria">Secretaria</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono">
                                        {new Date(user.criado_em).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {users.length === 0 && !loading && (
                    <div className="p-8 text-center text-gray-500">No users found.</div>
                )}
            </div>
        </Layout>
    );
};

export default AdminUsers;
