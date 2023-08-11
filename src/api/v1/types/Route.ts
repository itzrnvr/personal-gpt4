import express, {Request, Response, Router} from 'express';
const router = express.Router();

interface Route {
    route: string
    router: Router
}


export default Route
