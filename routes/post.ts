import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { fileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';


const postRoutes = Router();
const fileSystem = new FileSystem();



//obtener post paginados
postRoutes.get('/', async (req: any, res: Response) =>{


    let pagina = Number(req.query.pagina) || 1;
    if ( pagina === 0) pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const posts = await Post.find()
                            .sort({ _id: -1 })
                            .skip(skip)
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec(); 
    
    res.json({
        ok: true,
        pagina,
        posts
    });

});

//crear post
postRoutes.post('/', [verificaToken], (req: any, res: Response) =>{

    const body = req.body;
    body.usuario = req.usuario._id;
    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    body.imgs = imagenes;    

    Post.create(body).then( async PostDB => {

        // await PostDB.populate('usuario').execPopulate();

        res.json({
            ok: true,
            Post: PostDB
        });
    }).catch( err => {
        res.json(err);
    });

});


//Servicio para subir archivos
postRoutes.post('/upload', [verificaToken], async (req: any, res: Response) => {
    if ( !req.files ) {
        return res.status(400).json ({
            ok: false,
            mensaje: 'No se subio el archivo'
        });
    }

    const file: fileUpload = req.files.image

    if ( !file ) {
        return res.status(400).json ({
            ok: false,
            mensaje: 'No se subio el archivo - image'
        });
    }

    if ( !file.mimetype.includes('image')) {
        return res.status(400).json ({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        });
    }

    await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json ({
        ok: true,
        file: file.mimetype
    });
});

postRoutes.get('/imagen/:userid/:img',(req:any, res:Response) =>{
    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl(userId, img);

    res.sendFile(pathFoto);

});


export default postRoutes;