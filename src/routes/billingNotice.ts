import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
// import { BillingNotice } from '../models/billingNotice';
import FileSystem from '../classes/file-system';
import {pool} from '../database';
import {QueryResult} from 'pg';

const billingNoticeRoutes = Router();
const fileSystem = new FileSystem();

//obtener position paginados
billingNoticeRoutes.get('/', async (req: any, res: Response) =>{


    let pagina = Number(req.query.pagina) || 1;
    if ( pagina === 0) pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const billingNotice: QueryResult = await pool.query('SELECT * FROM public.tmccs_bill');

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

export default billingNoticeRoutes;