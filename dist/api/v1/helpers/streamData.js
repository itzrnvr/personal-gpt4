"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const streamData = (stream, res) => {
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
        res.write(`${JSON.stringify(responseData)}\n\n`);
    });
    stream.on('end', () => {
        res.write('event: end\n');
        res.write('data: [DONE]\n');
        res.write('\n');
        res.end();
    });
};
exports.default = streamData;
//# sourceMappingURL=streamData.js.map