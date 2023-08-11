"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
class ChatRoute {
    constructor() {
        this.route = "chat/completions";
        this.router = express_1.default.Router();
        this.router.post('/', (req, res, next) => {
            (0, chatController_1.getChatResponse)(req, res, next);
        });
        this.router.get('/', (req, res) => {
            res.send("OK CHAT COMPLETIONS");
        });
    }
}
exports.default = ChatRoute;
//# sourceMappingURL=chat.js.map