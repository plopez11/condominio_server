import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
// import { Pays } from '../models/pays';
import FileSystem from '../classes/file-system';
import {pool} from '../database';
import {QueryResult} from 'pg';

const paysRoutes = Router();
const fileSystem = new FileSystem();

//obtener position paginados
paysRoutes.get('/', async (req: any, res: Response) =>{


    let pagina = Number(req.query.pagina) || 1;
    if ( pagina === 0) pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const payments: QueryResult = await pool.query('SELECT * FROM public.tmccs_payments');

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

export default paysRoutes;