"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatResponseSocket = exports.getChatResponse = void 0;
const generateUser_1 = __importDefault(require("../services/generateUser"));
const constants_1 = require("../helpers/constants");
const getResponseForPrompt_1 = __importDefault(require("../services/getResponseForPrompt"));
const streamData_1 = __importDefault(require("../helpers/streamData"));
const streamDataSocket_1 = __importDefault(require("../helpers/streamDataSocket"));
let chatHeaders = null;
let chatBody = null;
const getChatResponse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messages } = req.body;
        const modifiedMessages = [...constants_1.breakArray, ...messages];
        if (messages.length == 1 || chatHeaders == null) {
            const { headers, body } = yield (0, generateUser_1.default)();
            chatHeaders = headers;
            chatBody = body;
        }
        const response = yield (0, getResponseForPrompt_1.default)(modifiedMessages, chatHeaders, chatBody);
        if (!response) {
            throw new Error('Failed to get response for prompt');
        }
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        const stream = response.data;
        (0, streamData_1.default)(stream, res);
        req.on('close', () => {
            stream.destroy();
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getChatResponse = getChatResponse;
const getChatResponseSocket = (messages, socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        messages = JSON.parse(messages);
        console.log(messages);
        const modifiedMessages = [...constants_1.breakArray, ...messages];
        if (messages.length == 1 || chatHeaders == null) {
            const { headers, body } = yield (0, generateUser_1.default)();
            chatHeaders = headers;
            chatBody = body;
        }
        const response = yield (0, getResponseForPrompt_1.default)(modifiedMessages, chatHeaders, chatBody);
        if (!response) {
            throw new Error('Failed to get response for prompt');
        }
        const stream = response.data;
        (0, streamDataSocket_1.default)(stream, socket);
    }
    catch (err) {
        console.error(err);
    }
});
exports.getChatResponseSocket = getChatResponseSocket;
//# sourceMappingURL=chatController.js.map