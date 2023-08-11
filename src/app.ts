import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { Server } from 'ws';
import http from 'http';
const socketIo = require('socket.io');

import setUpRoutesV1 from './api/v1/routes';
import cors from 'cors'
import {getChatResponseSocket} from "./api/v1/controllers/chatController";

const PORT = process.env.PORT || "8080"

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack trace to the console
    res.status(500).send({ error: err.toString() }); // Send error response
});

setUpRoutesV1(app)

app.get('/', (req, res) => {
    res.send("OK")
})

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const io = socketIo(server,  {
    cors: {
        origin: "*", // replace with your client's address
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
});

const chat = io.of('api/v1/chat/completions');

chat.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        // console.log(message);
        getChatResponseSocket(message, socket)
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`RUNNINNG ON PORT: ${PORT}`)
})
