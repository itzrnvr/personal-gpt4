import Route from "../types/Route";
import async from 'async';
import express, {Router} from "express";
import route from "../types/Route";
import {getChatResponse} from "../controllers/chatController";

// Create a queue that can process up to 5 requests concurrently
const queue = async.queue((task, callback) => {
    const {req, res, next} = task;

    getChatResponse(req, res, next)
        .then(() => callback())
        .catch(err => callback(err));
}, 5);

class ChatRoute implements Route{
    route: string = "chat/completions";
    router: Router = express.Router();

    constructor() {
        // this.router.post('/', (req, res, next) => {
        //     getChatResponse(req, res, next)
        // })
        this.router.post('/', (req, res, next) => {
            queue.push({req, res, next});
        })

        this.router.get('/', (req, res) => {
            res.send("OK CHAT COMPLETIONS")
        })
    }
}

export default ChatRoute
