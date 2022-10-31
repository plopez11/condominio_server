import { Router, Request,  Response } from 'express';
import {getCountry, createCountry,getCountrys, ModifCountry, DeleteCountry } from '../controllers/country'
import { verificaToken } from '../middlewares/autenticacion';

const countryRoutes = Router();
// const fileSystem = new FileSystem();


countryRoutes.get('/', getCountrys);
countryRoutes.get('/:id', getCountry);
countryRoutes.post('/',[verificaToken], createCountry);
countryRoutes.put('/:id',[verificaToken], ModifCountry);
countryRoutes.delete('/:id',[verificaToken], DeleteCountry);


export default countryRoutes;

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