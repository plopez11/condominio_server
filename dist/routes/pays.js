"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { Pays } from '../models/pays';
const file_system_1 = __importDefault(require("../classes/file-system"));
const database_1 = require("../database");
const paysRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//obtener position paginados
paysRoutes.get('/', async (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    if (pagina === 0)
        pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const payments = await database_1.pool.query('SELECT * FROM public.tmccs_payments');
    // const pays = await Pays.find()
    //                         .sort({ _id: -1 })
    //                         .skip(skip)
    //                         .limit(10)
    //                         .populate('builder')
    //                         .populate('apartment')
    //                         .populate('user', '-password')                          
    //                         .exec(); 
    res.json({
        ok: true,
        pagina,
        payments
    });
});
//crear pays
// paysRoutes.post('/', [verificaToken], (req: any, res: Response) =>{
//     const body = req.body;
//     body.user = req.user._id;
//     // const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
//     // body.imgs = imagenes;    
//     Pays.create(body).then( async PaysDB => {
//         res.json({
//             ok: true,
//             Post: PaysDB
//         });
//     }).catch( err => {
//         res.json(err);
//     });
// });
exports.default = paysRoutes;
