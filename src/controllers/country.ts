import { Router, Request,  Response } from 'express';
import {pool} from '../database';
import {QueryResult} from 'pg';
import { handleHttp } from '../utils/error.handle';


const getCountrys = async (req: Request, res: Response) => {
            
    try {
        
        let pagina = Number(req.query.pagina) || 1;
        if ( pagina === 0) pagina = 1;
        let skip = pagina - 1;
        skip = skip * 10;
            
        const country: QueryResult = await pool.query('SELECT * FROM public.tmccs_tcountry');
    
        if (country.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'Empty result ***'
            });
        }
        else {

            res.json({
                ok: true,
                pagina,
                country
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_COUNTRYS, ' + e);
    }
};


const getCountry = async (req: Request, res: Response) => {
            
    try {
        const country_code = req.params.country_code;
                 
        const country: QueryResult = await pool.query('SELECT * FROM public.tmccs_tcountry where country_code=$1',[country_code]);
        
        if (country.rowCount == 0) {
            res.json( {
                ok: false,
                mensaje: 'country does not exist ***'
            });
        }
        else {
        
            res.json({
                ok: true,
                country
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_GET_COUNTRY, ' + e);
    }
};

const DeleteCountry = async (req: Request, res: Response) => {
            
    try {
        const country_code = req.params.country_code;
                 
        const user: QueryResult = await pool.query('DELETE FROM public.tmccs_tcountry where id=$1',[country_code]);
    
        res.json({
            ok: true,
            mensaje: 'Deleted Country***'
        });
    } catch (e) {
        handleHttp(res,'ERROR_DELETE_USER, ' + e);
    }
};

const ModifCountry = async (req: Request, res: Response) => {
    try {

        const country_code = req.params.country_code;
        const body= req.body;
               
        const country: QueryResult = await pool.query('UPDATE public.tmccs_tcountry SET name=$1,full_name=$2,flag_file_name=$3, capital=$4, continent=$5, telephone_prefix=$6,currency_iso=$7, currency_symbol=$8, currency_description=$9, currency_bill_iso=$10, currency_pay_iso=$11,capital_location=$12, location_map_file_name=$13, status=$14 where tmccs_tcountry=$15', [body.name,body.full_name,body.flag_file_name,body.capital,body.continent, body.telephone_prefix,body.currency_iso,body.currency_symbol,body.currency_description,body.currency_bill_iso,body.currency_pay_iso,,body.capital_location,body.location_map_file_name,body.status,country_code]);

        if (country.rowCount == 1) {
           
                res.json({
                    ok: true,
                    mensaje: 'Modified Country***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_MODIFY_COUNTRY ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_MODIFY_COUNTRY, ' + e);
        
    }
}


const createCountry = async (req: Request, res: Response) => {
    try {

        const body= req.body;
               
        const country: QueryResult = await pool.query('INSERT INTO public.tmccs_tcountry (name,full_name,flag_file_name, capital, continent, telephone_prefix,currency_iso, currency_symbol, currency_description, currency_bill_iso, currency_pay_iso,capital_location, location_map_file_name, status=$14) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)', [body.name,body.full_name,body.flag_file_name,body.capital,body.continent, body.telephone_prefix,body.currency_iso,body.currency_symbol,body.currency_description,body.currency_bill_iso,body.currency_pay_iso,,body.capital_location,body.location_map_file_name,body.status]);

        if (country.rowCount == 1) {
           
                res.json({
                    ok: true,
                    mensaje: 'Created Country***'
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_CREATED_COUNTRY ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_CREATED_COUNTRY, ' + e);
        
    }
}


export {getCountry, createCountry,getCountrys, ModifCountry, DeleteCountry };
   

