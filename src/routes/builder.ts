import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
// import { Builder } from '../models/builder';
import FileSystem from '../classes/file-system';
import {pool} from '../database';
import {QueryResult} from 'pg';

const builderRoutes = Router();
const fileSystem = new FileSystem();

//obtener builder paginados
builderRoutes.get('/', async (req: any, res: Response) =>{


    let pagina = Number(req.query.pagina) || 1;
    if ( pagina === 0) pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const building: QueryResult = await pool.query('SELECT * FROM public.tmccs_building');
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

export default builderRoutes;