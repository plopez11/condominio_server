import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import {getBill, getBills, createBill,getBillsBuilding, ModifBill, deleteBill } from '../controllers/bill'

const billRoutes = Router();

billRoutes.get('/',[verificaToken], getBills);
billRoutes.get('/:id',[verificaToken], getBill);
billRoutes.get('/building/:id',[verificaToken], getBillsBuilding);
billRoutes.post('/create', createBill);
billRoutes.put('/:id',[verificaToken], ModifBill);
billRoutes.delete('/:id',[verificaToken], deleteBill);

export default billRoutes;