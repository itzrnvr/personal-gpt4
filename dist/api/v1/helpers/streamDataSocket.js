"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const streamDataSocket = (stream, socket) => {
    stream.on('data', (data) => {
        const responseData = {
            id: (0, uuid_1.v4)(),
            object: 'text_completion',
            created: Math.floor(Date.now() / 1000),
            choices: [
                {
                    delta: {
                        content: data.toString()
                    },
                    index: 0,
                    logprobs: null,
                    finish_reason: null,
                },
            ],
            model: 'gpt-4',
        };
        socket.emit('message', responseData);
    });
    stream.on('end', () => {
        socket.emit('end', '[DONE]');
    });
};
exports.default = streamDataSocket;
//# sourceMappingURL=streamDataSocket.js.map