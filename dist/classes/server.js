"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../environments/environment");
class Server {
    constructor() {
        // public port: number = 3000;
        this.host = environment_1.environment.HOST || '0.0.0.0';
        this.port = environment_1.environment.PORT || 3000;
        this.app = (0, express_1.default)();
    }
    start(callback) {
        this.app.listen(this.port, callback());
    }
}
exports.default = Server;
