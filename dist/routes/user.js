"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = (0, express_1.Router)();
//login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    console.log(req);
    user_model_1.User.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid user or password'
            });
        }
        if (userDB.compararPassword(body.password)) {
            const tokenUSer = token_1.default.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUSer
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Invalid user or password ***'
            });
        }
    });
});
//Crear user
userRoutes.post('/create', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
        role: req.body.role,
        created: new Date(),
    };
    user_model_1.User.create(user).then(userDB => {
        const tokenUSer = token_1.default.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUSer
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Update user
userRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const user = {
        name: req.body.name || req.name.name,
        email: req.body.email || req.user.email,
        avatar: req.body.avatar || req.user.avatar,
        role: req.body.role || req.user.role
    };
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'There is no user with that ID***'
            });
        }
        const tokenUSer = token_1.default.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUSer
        });
    });
});
userRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => {
    const user = req.user;
    res.json({
        ok: true,
        user
    });
});
exports.default = userRoutes;
