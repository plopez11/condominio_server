"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
// import { User } from '../models/user.model';
const verificaToken = (req, resp, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.comprobarToke(userToken)
        .then((decode) => {
        req.user = decode.User;
        next();
    })
        .catch(err => {
        resp.json({
            ok: false,
            mensaje: 'invalid Token'
        });
    });
};
exports.verificaToken = verificaToken;
