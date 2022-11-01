import { Router, Request,  Response, response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
// import { Apartment } from '../models/apartment';
import {getApartments, getApartment, createApartment,getApartmentsBuilding, ModifApartment, deleteApartment } from '../controllers/apartment'


const apartmentRoutes = Router();

apartmentRoutes.get('/',[verificaToken], getApartments);
apartmentRoutes.get('/:id',[verificaToken], getApartment);
apartmentRoutes.get('/building/:id',[verificaToken], getApartmentsBuilding);
apartmentRoutes.post('/create', createApartment);
apartmentRoutes.put('/:id',[verificaToken], ModifApartment);
apartmentRoutes.delete('/:id',[verificaToken], deleteApartment);

export default apartmentRoutes;