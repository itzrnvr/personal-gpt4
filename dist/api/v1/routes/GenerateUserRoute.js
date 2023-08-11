"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GenerateUserController_1 = __importDefault(require("../controllers/GenerateUserController"));
class GenerateUserRoute {
    constructor() {
        this.generateUsersController = new GenerateUserController_1.default();
        this.router = express_1.default.Router();
        this.router.get('/', (req, res) => {
            this.generateUsersController.generate(req, res);
        });
    }
    getRouteName() {
        return "generate-user";
    }
    getRouter() {
        return this.router;
    }
}
exports.default = GenerateUserRoute;
//# sourceMappingURL=GenerateUserRoute.js.map