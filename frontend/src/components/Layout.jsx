import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Button from './Button';
import Chat from './Chat';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
            </div>

            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-dark/70 backdrop-blur-xl supports-[backdrop-filter]:bg-dark/40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight mr-8">
                        Student<span className="text-primary">System</span>
                    </h1>

                    <div className="hidden md:flex items-center gap-6 mr-auto">
                        <Link to="/dashboard" className="text-gray-400 hover:text-white font-medium transition-colors">Students</Link>
                        <Link to="/materials" className="text-gray-400 hover:text-white font-medium transition-colors">Materials</Link>
                        <Link to="/forum" className="text-gray-400 hover:text-white font-medium transition-colors">Forum</Link>
                        {user?.cargo === 'admin' && (
                            <Link to="/admin/users" className="text-gray-400 hover:text-white font-medium transition-colors">Admin</Link>
                        )}
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="hidden md:inline text-gray-400 text-sm font-medium">
                            Welcome, <span className="text-gray-200">{user?.nome}</span>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </nav>
            <main className="relative z-10 pt-24 px-6 max-w-7xl mx-auto">
                {children}
            </main>
            <Chat />
        </div>
    );
};

export default Layout;
