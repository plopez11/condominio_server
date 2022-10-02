import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Apartment } from '../models/apartment';
import FileSystem from '../classes/file-system';

const apartmentRoutes = Router();
const fileSystem = new FileSystem();

//obtener position paginados
apartmentRoutes.get('/', async (req: any, res: Response) =>{


    let pagina = Number(req.query.pagina) || 1;
    if ( pagina === 0) pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const apartment = await Apartment.find()
                            .sort({ _id: -1 })
                            .skip(skip)
                            .limit(10)
                            .populate('builder')
                            .populate('user', '-password')                          
                            .exec(); 
    
    res.json({
        ok: true,
        pagina,
        apartment
    });

});

//crear apartment
apartmentRoutes.post('/', [verificaToken], (req: any, res: Response) =>{

    const body = req.body;
    body.user = req.user._id;
    // const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    // body.imgs = imagenes;    

    Apartment.create(body).then( async ApartmentDB => {

        res.json({
            ok: true,
            Post: ApartmentDB
        });
    }).catch( err => {
        res.json(err);
    });

});

export default apartmentRoutes;