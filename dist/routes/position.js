"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const position_model_1 = require("../models/position.model");
const file_system_1 = __importDefault(require("../classes/file-system"));
const positionRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//obtener position paginados
positionRoutes.get('/', async (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    if (pagina === 0)
        pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const position = await position_model_1.Position.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('user', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        position
    });
});
//crear position
positionRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.user = req.user._id;
    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.user._id);
    body.imgs = imagenes;
    position_model_1.Position.create(body).then(async (PositionDB) => {
        // await PositionDB.populate('usuario').execPopulate();
        res.json({
            ok: true,
            Post: PositionDB
        });
    }).catch(err => {
        res.json(err);
    });
});
exports.default = positionRoutes;
