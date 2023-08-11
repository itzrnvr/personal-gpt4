import {Express} from "express";
const baseRoutePath = '/api/v1';
import Route from "../types/Route";
import ChatRoute from "./chat";

const routes: Route[] = [
    new ChatRoute()
]

function setUpRoutesV1(app: Express) {
  routes.forEach(route => {
    app.use(`${baseRoutePath}/${route.route}`, route.router);
  })
}

export default setUpRoutesV1;
