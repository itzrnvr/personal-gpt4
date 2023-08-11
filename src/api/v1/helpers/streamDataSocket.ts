import {v4 as uuidv4} from 'uuid';
import {response} from "express";
const streamDataSocket = (stream, socket) => {
    stream.on('data', (data) => {
        const responseData = {
            id: uuidv4(),
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
}

export default streamDataSocket
