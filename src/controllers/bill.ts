import { Router, Request, Response, response } from 'express';
import {pool} from '../database';
import {QueryResult} from 'pg';
import { handleHttp } from '../utils/error.handle';


const getBills = async (req: Request, res: Response) => {
            
    try {
        
        let pagina = Number(req.query.pagina) || 1;
        if ( pagina === 0) pagina = 1;
        let skip = pagina - 1;
        skip = skip * 10;
            
        const bills: QueryResult = await pool.query('SELECT * FROM public.tmccs_bill');
    
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
        handleHttp(res,'ERROR_GET_BILLS, ' + e);
    }
};

const getBillsBuilding = async (req: Request, res: Response) => {
            
    try {
        const buildingId = req.params.building_id;
        let pagina = Number(req.query.pagina) || 1;
        if ( pagina === 0) pagina = 1;
        let skip = pagina - 1;
        skip = skip * 10;
            
        const buils: QueryResult = await pool.query('SELECT * FROM public.tmccs_bill where building_id=$1',[buildingId]);
    
        if (buils.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'Empty result ***'  
            });
        }
        else {

            res.json({
                ok: true,
                pagina,
                buils
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_APARTMENTS_BILL, ' + e);
    }
};



const getBill = async (req: Request, res: Response) => {
            
    try {
        const Id = req.params.id;
                 
        const bill: QueryResult = await pool.query('SELECT * FROM public.tmccs_bill where id=$1',[Id]);

        if (bill.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'Bill does not exist ***' 
            });
        }
        else {
    
            res.json({
                ok: true,
                bill
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_BILL, ' + e);
    }
};

const deleteBill = async (req: Request, res: Response) => {
            
    try {
        const Id = req.params.id;
                 
        const bill: QueryResult = await pool.query('DELETE FROM public.tmccs_bill where id=$1',[Id]);
    
        res.json({
            ok: true,
            mensaje: 'Deleted Bill***'
        });
    } catch (e) {
        handleHttp(res,'ERROR_DELETE_BILL, ' + e);
    }
};

const ModifBill = async (req: Request, res: Response) => {
    try {

        const Id = req.params.id;
        const body= req.body;    
    
        const bill: QueryResult = await pool.query('UPDATE public.tmccs_bill SET building_id=$1,unid_id=$2,administrator_id=$3,period=$4,apartment_number=$4,bill_date=$5,amount=$6,payment_date=$7,payment_user=$8,expired_date=$9,expired_user=$10,canceled_date=$11,canceled_user=$12,judicial_date=$13,judicial_user=$14,status=$15 WHERE id=$16',
        [body.building_id,body.unid_id,body.administrator_id,body.period,body.apartment_number,body.bill_date,body.amount,body.payment_date,body.body.payment_user,body.expired_date,body.expired_user,body.canceled_date,body.canceled_user,body.judicial_date,body.judicial_user,body.status,Id]);

        if (bill.rowCount == 1) {
           
                res.json({
                    ok: true,
                    mensaje: 'Modified Bill***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_MODIFY_BILL ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_MODIFY_BILL, ' + e);
        
    }
}

// Crear user
const createBill = async (req: Request, res: Response) => {    

    try {
        
        const body= req.body;
               
        const apartment: QueryResult = await pool.query('INSERT INTO public.tmccs_bill (building_id, unid_id, administrator_id, period, apartment_number, bill_date,amount, payment_date, payment_user, expired_date, expired_user, canceled_date,canceled_user, judicial_date, judicial_user, status) VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)',
        [body.building_id,body.unid_id,body.administrator_id,body.period,body.apartment_number,body.bill_date,body.amount,body.payment_date,body.body.payment_user,body.expired_date,body.expired_user,body.canceled_date,body.canceled_user,body.judicial_date,body.judicial_user,body.status]);

        if (apartment.rowCount == 1) {
            
                res.json({
                    ok: true,
                    mensaje: 'Created Bill ***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_CREATE_BILL ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_CREATE_BILL, ' + e);
        
    }
}
        
export {getBill, createBill,getBills, getBillsBuilding,ModifBill, deleteBill};

