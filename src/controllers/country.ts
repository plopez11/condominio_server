import { Router, Request,  Response } from 'express';
import FileSystem from '../classes/file-system';
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
    
        res.json({
            ok: true,
            pagina,
            country
        });
    } catch (e) {
        handleHttp(res,'ERROR_GET_COUNTRY, ' + e);
    }
};


const getCountry = async (req: Request, res: Response) => {

}

const ModifCountry = async (req: Request, res: Response) => {

}

const createCountry = async (req: Request, res: Response) => {

}

const DeleteCountry = async (req: Request, res: Response) => {

}

export {getCountry, createCountry,getCountrys, ModifCountry, DeleteCountry };
   

// const apartment = await Apartment.find()
//                         .sort({ _id: -1 })
//                         .skip(skip)
//                         .limit(10)
//                         .populate('builder')
//                         .populate('user', '-password')                          
//                         .exec(); 
// res.json({
//     ok: true,
//     pagina,
//     country
// });
