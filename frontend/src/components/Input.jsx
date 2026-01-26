import React from 'react';

const Input = ({ label, type = "text", value, onChange, placeholder, required = false }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
                {label}
            </label>
            <input
                className="w-full bg-dark-lighter/50 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-2.5 transition-all duration-300 placeholder-gray-500 hover:border-gray-600 backdrop-blur-sm"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default Input;
