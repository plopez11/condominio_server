import { Router, Request, Response, response } from 'express';
import {pool} from '../database';
import {QueryResult} from 'pg';
import { handleHttp } from '../utils/error.handle';


const getBillsDetail = async (req: Request, res: Response) => {
            
    try {
        const billId = req.params.bill_id;
        let pagina = Number(req.query.pagina) || 1;
        if ( pagina === 0) pagina = 1;
        let skip = pagina - 1;
        skip = skip * 10;
            
        const bills: QueryResult = await pool.query('SELECT * FROM public.tmccs_bill_detail where bill_id=$1',[billId]);
    
        if (bills.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'Empty result ***'  
            });
        }
        else {

            res.json({
                ok: true,
                pagina,
                bills
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_BILLSDETAIL, ' + e);
    }
};


const deleteBillDetail = async (req: Request, res: Response) => {
            
    try {
        const Id = req.params.id;
                 
        const bill: QueryResult = await pool.query('DELETE FROM public.tmccs_bill_detail where id=$1',[Id]);
    
        res.json({
            ok: true,
            mensaje: 'Deleted BILLDETAIL***'
        });
    } catch (e) {
        handleHttp(res,'ERROR_DELETE_BILLDETAIL, ' + e);
    }
};

const ModifBillDetail = async (req: Request, res: Response) => {
    try {

        const Id = req.params.id;
        const body= req.body;    
    
        const bill: QueryResult = await pool.query('UPDATE public.tmccs_bill_detail SET bill_id=$1,concept_id=$2,description=$3,amount=$4,unit_amount=$5,status=$6 WHERE id=$6',
        [body.bill_id,body.concept_id,body.description,body.amount,body.unit_amount,body.status,Id]);

        if (bill.rowCount == 1) {
           
                res.json({
                    ok: true,
                    mensaje: 'Modified Bill***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_MODIFY_BILLDETAIL ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_MODIFY_BILLDETAIL, ' + e);
        
    }
}

// Crear user
const createBillDetail = async (req: Request, res: Response) => {    

    try {
        
        const body= req.body;
               
        const apartment: QueryResult = await pool.query('INSERT INTO public.tmccs_bill_detail (bill_id, concept_id, description, amount, unit_amount, status) VALUES($1, $2,$3,$4,$5,$6)',
        [body.bill_id,body.concept_id,body.description,body.amount,body.unit_amount,body.status]);

        if (apartment.rowCount == 1) {
            
                res.json({
                    ok: true,
                    mensaje: 'Created BillDetail ***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_CREATE_BILLDETAIL ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_CREATE_BILLDETAIL, ' + e);
        
    }
}
        
export {getBillsDetail, createBillDetail, ModifBillDetail, deleteBillDetail};

