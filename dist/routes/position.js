"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { Position } from '../models/position.model';
const file_system_1 = __importDefault(require("../classes/file-system"));
const database_1 = require("../database");
const positionRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//obtener position paginados
positionRoutes.get('/', async (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    if (pagina === 0)
        pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const position = await database_1.pool.query('SELECT * FROM public.tmccs_position');
    // const position = await Position.find()
    //                         .sort({ _id: -1 })
    //                         .skip(skip)
    //                         .limit(10)
    //                         .populate('user', '-password')
    //                         .exec(); 
    res.json({
        ok: true,
        pagina,
        position
    });
});
//crear position
// positionRoutes.post('/', [verificaToken], (req: any, res: Response) =>{
//     const body = req.body;
//     body.user = req.user._id;
//     const imagenes = fileSystem.imagenesDeTempHaciaPost(req.user._id);
//     body.imgs = imagenes;    
//     Position.create(body).then( async PositionDB => {
//         // await PositionDB.populate('usuario').execPopulate();
//         res.json({
//             ok: true,
//             Post: PositionDB
//         });
//     }).catch( err => {
//         res.json(err);
//     });
// });
exports.default = positionRoutes;
