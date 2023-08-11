"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoutePath = '/api/v1';
const chat_1 = __importDefault(require("./chat"));
const routes = [
    new chat_1.default()
];
function setUpRoutesV1(app) {
    routes.forEach(route => {
        app.use(`${baseRoutePath}/${route.route}`, route.router);
    });
}
exports.default = setUpRoutesV1;
//# sourceMappingURL=index.js.map