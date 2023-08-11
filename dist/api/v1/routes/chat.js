"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = __importDefault(require("async"));
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
// Create a queue that can process up to 5 requests concurrently
const queue = async_1.default.queue((task, callback) => {
    const { req, res, next } = task;
    (0, chatController_1.getChatResponse)(req, res, next)
        .then(() => callback())
        .catch(err => callback(err));
}, 5);
class ChatRoute {
    constructor() {
        this.route = "chat/completions";
        this.router = express_1.default.Router();
        // this.router.post('/', (req, res, next) => {
        //     getChatResponse(req, res, next)
        // })
        this.router.post('/', (req, res, next) => {
            queue.push({ req, res, next });
        });
        this.router.get('/', (req, res) => {
            res.send("OK CHAT COMPLETIONS");
        });
    }
}
exports.default = ChatRoute;
//# sourceMappingURL=chat.js.map