import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Position } from '../models/position.model';
import FileSystem from '../classes/file-system';

const positionRoutes = Router();
const fileSystem = new FileSystem();

//obtener position paginados
positionRoutes.get('/', async (req: any, res: Response) =>{


    let pagina = Number(req.query.pagina) || 1;
    if ( pagina === 0) pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const position = await Position.find()
                            .sort({ _id: -1 })
                            .skip(skip)
                            .limit(10)
                            .populate('user', '-password')
                            .exec(); 
    
    res.json({
        ok: true,
        pagina,
        position
    });

});

//crear position
positionRoutes.post('/', [verificaToken], (req: any, res: Response) =>{

    const body = req.body;
    body.user = req.user._id;
    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.user._id);
    body.imgs = imagenes;    

    Position.create(body).then( async PositionDB => {

        // await PositionDB.populate('usuario').execPopulate();

        res.json({
            ok: true,
            Post: PositionDB
        });
    }).catch( err => {
        res.json(err);
    });

});

export default positionRoutes;