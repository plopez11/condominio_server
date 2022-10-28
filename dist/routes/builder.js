"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { Builder } from '../models/builder';
const file_system_1 = __importDefault(require("../classes/file-system"));
const database_1 = require("../database");
const builderRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//obtener builder paginados
builderRoutes.get('/', async (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    if (pagina === 0)
        pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const building = await database_1.pool.query('SELECT * FROM public.tmccs_building');
    // const builder = await Builder.find()
    //                         .sort({ _id: -1 })
    //                         .skip(skip)
    //                         .limit(10)
    //                         .exec(); 
    res.json({
        ok: true,
        pagina,
        building
    });
});
//crear buider
// builderRoutes.post('/',[verificaToken],(req: any, res: Response) =>{
//     const body = req.body;
//     Builder.create(body).then( async BuilderDB => {
//         res.json({
//             ok: true,
//             Post: BuilderDB
//         });
//     }).catch( err => {
//         res.json(err);
//     });
// });
exports.default = builderRoutes;
