import { Router, Request, Response, response } from 'express';
import {pool} from '../database';
import {QueryResult} from 'pg';
import { handleHttp } from '../utils/error.handle';


const getBuildings = async (req: Request, res: Response) => {
            
    try {
                    
        const building: QueryResult = await pool.query('SELECT * FROM public.tmccs_apartments');
    
        if (building.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'Empty result ***' 
            });
        }
        else {
            res.json({
                ok: true,
                building
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_APARTMENTS, ' + e);
    }
};

const getBuilding = async (req: Request, res: Response) => {
            
    try {
        const Id = req.params.id;
        let pagina = Number(req.query.pagina) || 1;
        if ( pagina === 0) pagina = 1;
        let skip = pagina - 1;
        skip = skip * 10;
            
        const building: QueryResult = await pool.query('SELECT * FROM public.tmccs_building where building_id=$1',[Id]);

        if (building.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'Building does not exist ***' 
            });
        }
        else {
    
            res.json({
                ok: true,
                pagina,
                building
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_APARTMENTS_BUILDING, ' + e);
    }
};


const deleteBuilding = async (req: Request, res: Response) => {
            
    try {
        const Id = req.params.id;
                 
        const user: QueryResult = await pool.query('DELETE FROM public.tmccs_building  where id=$1',[Id]);
    
        res.json({
            ok: true,
            mensaje: 'Deleted Apartment***'
        });
    } catch (e) {
        handleHttp(res,'ERROR_DELETE_USER, ' + e);
    }
};

const ModifBuilding = async (req: Request, res: Response) => {
    try {

        const Id = req.params.id;
        const body= req.body;
               
        const building: QueryResult = await pool.query('UPDATE public.tmccs_building  SET name=$1,country_code=$2,state_code=$3,municipality_code=$4, parish_code=$5, city_code=$6,location=$7,status=$8 WHERE id=$9',
        [body.name,body.country_code,body.state_code,body.municipality_code,body.parish_code,body.city_code,body.location,body.status,Id]);

        if (building.rowCount == 1) {
           
                res.json({
                    ok: true,
                    mensaje: 'Modified Building***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_MODIFY_BUILDING ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_MODIFY_BUILDING, ' + e);
        
    }
}

// Crear user
const createBuilding = async (req: Request, res: Response) => {    

    try {
        
        const body= req.body;
               
        const apartment: QueryResult = await pool.query('INSERT INTO public.tmccs_building (name,country_code,state_code,municipality_code, parish_code, city_code,location,status) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        [body.name,body.country_code,body.state_code,body.municipality_code,body.parish_code,body.city_code,body.location,body.status]);

        if (apartment.rowCount == 1) {
            
                res.json({
                    ok: true,
                    mensaje: 'Created building ***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_CREATE_BUILDING ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_CREATE_BUILDING, ' + e);
        
    }
}
        
export {getBuildings,getBuilding, createBuilding,ModifBuilding, deleteBuilding};

