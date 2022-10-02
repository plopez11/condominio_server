"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const pays_1 = require("../models/pays");
const file_system_1 = __importDefault(require("../classes/file-system"));
const paysRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//obtener position paginados
paysRoutes.get('/', async (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    if (pagina === 0)
        pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const pays = await pays_1.Pays.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('builder')
        .populate('apartment')
        .populate('user', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        pays
    });
});
//crear pays
paysRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.user = req.user._id;
    // const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    // body.imgs = imagenes;    
    pays_1.Pays.create(body).then(async (PaysDB) => {
        res.json({
            ok: true,
            Post: PaysDB
        });
    }).catch(err => {
        res.json(err);
    });
});
exports.default = paysRoutes;
