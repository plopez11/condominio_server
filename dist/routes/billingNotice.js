"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { BillingNotice } from '../models/billingNotice';
const file_system_1 = __importDefault(require("../classes/file-system"));
const database_1 = require("../database");
const billingNoticeRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//obtener position paginados
billingNoticeRoutes.get('/', async (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    if (pagina === 0)
        pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const billingNotice = await database_1.pool.query('SELECT * FROM public.tmccs_bill');
    // const billingNotice = await BillingNotice.find()
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
        billingNotice
    });
});
//crear billingNotice
// billingNoticeRoutes.post('/', [verificaToken], (req: any, res: Response) =>{
//     const body = req.body;
//     body.user = req.user._id;
//     // const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
//     // body.imgs = imagenes;    
//     BillingNotice.create(body).then( async BillingNoticeDB => {
//         res.json({
//             ok: true,
//             Post: BillingNoticeDB
//         });
//     }).catch( err => {
//         res.json(err);
//     });
// });
exports.default = billingNoticeRoutes;
