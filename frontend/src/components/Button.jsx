import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
    const baseStyle = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300";
    const variants = {
        primary: "bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 text-sm tracking-wide",
        danger: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
        secondary: "bg-dark-lighter border border-gray-700 hover:bg-gray-800 text-gray-300 hover:text-white"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyle} ${variants[variant]}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

export default Button;
