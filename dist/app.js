"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const socketIo = require('socket.io');
const routes_1 = __importDefault(require("./api/v1/routes"));
const cors_1 = __importDefault(require("cors"));
const chatController_1 = require("./api/v1/controllers/chatController");
const PORT = process.env.PORT || "8080";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack trace to the console
    res.status(500).send({ error: err.toString() }); // Send error response
});
(0, routes_1.default)(app);
app.get('/', (req, res) => {
    res.send("OK");
});
// Create an HTTP server
const server = http_1.default.createServer(app);
// Create a WebSocket server
const io = socketIo(server, {
    cors: {
        origin: "*",
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
        (0, chatController_1.getChatResponseSocket)(message, socket);
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
server.listen(PORT, () => {
    console.log(`RUNNINNG ON PORT: ${PORT}`);
});
//# sourceMappingURL=app.js.map