import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
// import { BillingNoticeDetail } from '../models/billingNoticeDetail';
import {getBillsDetail, createBillDetail, ModifBillDetail, deleteBillDetail } from '../controllers/billdetail';

const billDetailRoutes = Router();
billDetailRoutes.get('/:bill_id',[verificaToken], getBillsDetail);
billDetailRoutes.post('/create', createBillDetail);
billDetailRoutes.put('/:id',[verificaToken], ModifBillDetail);
billDetailRoutes.delete('/:id',[verificaToken], deleteBillDetail);

export default billDetailRoutes;