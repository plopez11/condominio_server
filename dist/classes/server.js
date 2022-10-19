"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import {dotenv} from '../'
class Server {
    // public port: number = 3000;
    // public host=environment.HOST || '0.0.0.0';
    // public port=environment.PORT || 3000;
    constructor() {
        this.port = process.env.PORT || 3000;
        this.host = process.env.HOST || '0.0.0.0';
        this.app = (0, express_1.default)();
    }
    start(callback) {
        this.app.listen(this.port, callback());
    }
}
exports.default = Server;
