const express = require('express');
const cors = require('cors');
require('dotenv').config();

const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Em produção, restrinja isso
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(cors());

// Tornar io acessível nas rotas via req.io
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/students', require('./src/routes/studentRoutes'));
app.use('/api/forum', require('./src/routes/forumRoutes'));
app.use('/api/materials', require('./src/routes/materialRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('Novo usuário conectado:', socket.id);

    socket.on('chat_message', (msg) => {
        // Broadcast para todos na sala (exceto remetente se quiser, ou broadcast geral)
        io.emit('chat_message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectou:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));