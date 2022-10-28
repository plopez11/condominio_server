import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
// import { BillingNoticeDetail } from '../models/billingNoticeDetail';
import FileSystem from '../classes/file-system';
import {pool} from '../database';
import {QueryResult} from 'pg';

const billingNoticeDetailRoutes = Router();
const fileSystem = new FileSystem();



//obtener position paginados


billingNoticeDetailRoutes.get('/', async (req: any, res: Response) =>{

    console.log("paso by page");
    let pagina = Number(req.query.pagina) || 1;
    if ( pagina === 0) pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const billingNoticeDetail: QueryResult = await pool.query('SELECT * FROM public.tmccs_bill_detail');


    // const billingNoticeDetail = await BillingNoticeDetail.find()
    //                         .sort({ _id: -1 })
    //                         .skip(skip)
    //                         .limit(10)
    //                         .populate('billingNotice')
    //                         .populate('builder')
    //                         .populate('apartment')
    //                         .populate('user', '-password')                          
    //                         .exec(); 
    
    res.json({
        ok: true,
        pagina,
        billingNoticeDetail
    });

});

//crear billingNotice
// billingNoticeDetailRoutes.post('/', [verificaToken], (req: any, res: Response) =>{

//     const body = req.body;
//     body.user = req.user._id;
//     // const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
//     // body.imgs = imagenes;    

//     BillingNoticeDetail.create(body).then( async BillingNoticeDetailDB => {

//         res.json({
//             ok: true,
//             Post: BillingNoticeDetailDB
//         });
//     }).catch( err => {
//         res.json(err);
//     });

// });

// billingNoticeDetailRoutes.get('/notice/:billId',async(req:any, res:Response) =>{

//     const NoticeDetailId = req.params.billId;
//     console.log("paso by billId",NoticeDetailId);
//     const billingNoticeDetail = await BillingNoticeDetail
//     .find({billingNotice : NoticeDetailId});
//     if (billingNoticeDetail) {
//         res.json({
//             ok: true,
//             billingNoticeDetail
//         });


//     } else {
//         res.status(400).json({
//             msg: `No existe el usuario con el id ${NoticeDetailId}`
//         });
//     }
// });



export default billingNoticeDetailRoutes;