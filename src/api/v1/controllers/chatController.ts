import async from 'async';
import {NextFunction, Request, Response} from "express";
import generateUser, {GenUserData} from "../services/generateUser";
import {breakArray, breakPrompt} from "../helpers/constants";
import getResponseForPrompt from "../services/getResponseForPrompt";
import GenerateUser from "../services/generateUser";
import streamData from "../helpers/streamData";
import chat from "../routes/chat";
import streamDataSocket from "../helpers/streamDataSocket";

let chatHeaders = null
let chatBody = null



export const getChatResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {messages} = req.body;
        const modifiedMessages = [...breakArray, ...messages];

        if(messages.length == 1 || chatHeaders == null ) {
            const {headers, body}: GenUserData = await generateUser();
            chatHeaders = headers
            chatBody = body
        }

        const response = await getResponseForPrompt(modifiedMessages, chatHeaders, chatBody);

        if (!response) {
            throw new Error('Failed to get response for prompt');
        }

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const stream = response.data;

        streamData(stream, res);

        req.on('close', () => {
            stream.destroy();
        });
    } catch (err) {
        next(err);
    }
}


export const getChatResponseSocket = async (messages: string, socket) => {
    try {
        messages = JSON.parse(messages)
        console.log(messages)
        const modifiedMessages = [...breakArray, ...messages];

        if(messages.length == 1 || chatHeaders == null ) {
            const {headers, body}: GenUserData = await generateUser();
            chatHeaders = headers
            chatBody = body
        }

        const response = await getResponseForPrompt(modifiedMessages, chatHeaders, chatBody);

        if (!response) {
            throw new Error('Failed to get response for prompt');
        }

        const stream = response.data;

        streamDataSocket(stream, socket);

    } catch (err) {
        console.error(err);
    }
};





