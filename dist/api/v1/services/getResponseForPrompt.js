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
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const agent = new https_1.default.Agent({
    keepAlive: true
});
const getResponseForPrompt = (messages, headers, body) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getResponseForPrompt", messages);
    console.log("getResponseForPrompt", headers);
    console.log("getResponseForPrompt", body);
    console.log("getResponseForPrompt", Object.assign({}, body));
    let response = null;
    try {
        console.log(JSON.stringify(Object.assign(Object.assign({}, body), { messages: messages })));
        response = yield (0, axios_1.default)({
            method: "post",
            url: "https://talktomerlin.com/api/chat",
            data: Object.assign(Object.assign({}, body), { messages: messages }),
            headers: headers,
            responseType: "stream",
            httpsAgent: agent,
        });
    }
    catch (error) {
        console.log(error.message);
    }
    return response;
});
exports.default = getResponseForPrompt;
//# sourceMappingURL=getResponseForPrompt.js.map