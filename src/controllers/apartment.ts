import { Router, Request, Response, response } from 'express';
import {pool} from '../database';
import {QueryResult} from 'pg';
import { handleHttp } from '../utils/error.handle';


const getApartments = async (req: Request, res: Response) => {
            
    try {
        
        let pagina = Number(req.query.pagina) || 1;
        if ( pagina === 0) pagina = 1;
        let skip = pagina - 1;
        skip = skip * 10;
            
        const apartment: QueryResult = await pool.query('SELECT * FROM public.tmccs_apartments');
    
        if (apartment.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'Empty result ***'  
            });
        }
        else {

            res.json({
                ok: true,
                pagina,
                apartment
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_APARTMENTS, ' + e);
    }
};

const getApartmentsBuilding = async (req: Request, res: Response) => {
            
    try {
        const buildingId = req.params.building_id;
        let pagina = Number(req.query.pagina) || 1;
        if ( pagina === 0) pagina = 1;
        let skip = pagina - 1;
        skip = skip * 10;
            
        const apartment: QueryResult = await pool.query('SELECT * FROM public.tmccs_apartments where building_id=$1',[buildingId]);
    
        if (apartment.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'Apartment does not exist ***' 
            });
        }
        else {

            res.json({
                ok: true,
                pagina,
                apartment
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_APARTMENTS_BUILDING, ' + e);
    }
};



const getApartment = async (req: Request, res: Response) => {
            
    try {
        const Id = req.params.id;
                 
        const apartment: QueryResult = await pool.query('SELECT * FROM public.tmccs_apartments where id=$1',[Id]);

        if (apartment.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'Apartment does not exist ***' 
            });
        }
        else {
    
            res.json({
                ok: true,
                apartment
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_APARTMENT, ' + e);
    }
};

const deleteApartment = async (req: Request, res: Response) => {
            
    try {
        const Id = req.params.id;
                 
        const user: QueryResult = await pool.query('DELETE FROM public.tmccs_apartments where id=$1',[Id]);
    
        res.json({
            ok: true,
            mensaje: 'Deleted Apartment***'
        });
    } catch (e) {
        handleHttp(res,'ERROR_DELETE_USER, ' + e);
    }
};

const ModifApartment = async (req: Request, res: Response) => {
    try {

        const Id = req.params.id;
        const body= req.body;
               
        const apartment: QueryResult = await pool.query('UPDATE public.tmccs_apartments SET building_id=$1,apartment_number=$2,floor=$3,status=$4 WHERE id=$5',
        [body.building_id,body.apartment_number,body.floor,body.status,Id]);

        if (apartment.rowCount == 1) {
           
                res.json({
                    ok: true,
                    mensaje: 'Modified Apartment***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_MODIFY_USER ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_MODIFY_USER, ' + e);
        
    }
}

// Crear user
const createApartment = async (req: Request, res: Response) => {    

    try {
        
        const body= req.body;
               
        const apartment: QueryResult = await pool.query('INSERT INTO public.tmccs_apartments (building_id,apartment_number,floor,status) VALUES($1, $2, $3, $4)',
        [body.building_id,body.apartmentNumber,body.floor,body.status]);

        if (apartment.rowCount == 1) {
            
                res.json({
                    ok: true,
                    mensaje: 'Created apartment ***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_CREATE_APARTMENT ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_CREATE_APARTMENT, ' + e);
        
    }
}
        
export {getApartment, createApartment,getApartments, getApartmentsBuilding,ModifApartment, deleteApartment};

