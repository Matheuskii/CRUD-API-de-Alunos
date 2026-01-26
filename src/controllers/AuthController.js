const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {
    register: async (req, res) => {
        try {
            const { nome, email, senha } = req.body;
            if (!nome || !email || !senha) {
                return res.status(400).json({ msg: "Please provide all fields" });
            }

            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ msg: "User already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(senha, salt);

            await User.create(nome, email, hashedPassword);

            res.status(201).json({ msg: "User registered successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server error" });
        }
    },

    login: async (req, res) => {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ msg: "Please provide all fields" });
            }

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(senha, user.senha);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ token, user: { id: user.id, nome: user.nome, email: user.email, cargo: user.cargo } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server error" });
        }
    }
};

module.exports = AuthController;
