"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const builder_1 = require("../models/builder");
const file_system_1 = __importDefault(require("../classes/file-system"));
const builderRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//obtener builder paginados
builderRoutes.get('/', async (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    if (pagina === 0)
        pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const builder = await builder_1.Builder.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .exec();
    res.json({
        ok: true,
        pagina,
        builder
    });
});
//crear buider
builderRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    builder_1.Builder.create(body).then(async (BuilderDB) => {
        res.json({
            ok: true,
            Post: BuilderDB
        });
    }).catch(err => {
        res.json(err);
    });
});
exports.default = builderRoutes;
