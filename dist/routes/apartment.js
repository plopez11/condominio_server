"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { Apartment } from '../models/apartment';
const file_system_1 = __importDefault(require("../classes/file-system"));
const database_1 = require("../database");
const apartmentRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//obtener position paginados
apartmentRoutes.get('/', async (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    if (pagina === 0)
        pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const apartment = await database_1.pool.query('SELECT * FROM public.tmccs_apartments');
    // const apartment = await Apartment.find()
    //                         .sort({ _id: -1 })
    //                         .skip(skip)
    //                         .limit(10)
    //                         .populate('builder')
    //                         .populate('user', '-password')                          
    //                         .exec(); 
    console.log(apartment.rows);
    res.json({
        ok: true,
        pagina,
        apartment
    });
});
//crear apartment
// apartmentRoutes.post('/', [verificaToken], (req: any, res: Response) =>{
//     const body = req.body;
//     body.user = req.user._id;
//     // const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
//     // body.imgs = imagenes;    
//     Apartment.create(body).then( async ApartmentDB => {
//         res.json({
//             ok: true,
//             Post: ApartmentDB
//         });
//     }).catch( err => {
//         res.json(err);
//     });
// });
exports.default = apartmentRoutes;
