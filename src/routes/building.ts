import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
// import { Builder } from '../models/builder';
import {getApartments, getApartment, createApartment,getApartmentsBuilding, ModifApartment, deleteApartment } from '../controllers/apartment'

const buildingRoutes = Router();


buildingRoutes.get('/',[verificaToken], getApartments);
buildingRoutes.get('/:id',[verificaToken], getApartment);
buildingRoutes.get('/building/:id',[verificaToken], getApartmentsBuilding);
buildingRoutes.post('/create', createApartment);
buildingRoutes.put('/:id',[verificaToken], ModifApartment);
buildingRoutes.delete('/:id',[verificaToken], deleteApartment);

export default buildingRoutes;