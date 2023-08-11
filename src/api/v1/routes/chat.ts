import Route from "../types/Route";
import express, {Router} from "express";
import route from "../types/Route";
import {getChatResponse} from "../controllers/chatController";

class ChatRoute implements Route{
    route: string = "chat/completions";
    router: Router = express.Router();

    constructor() {
        this.router.post('/', (req, res, next) => {
            getChatResponse(req, res, next)
        })
        this.router.get('/', (req, res) => {
            res.send("OK CHAT COMPLETIONS")
        })
    }
}

export default ChatRoute
