import { Response, Request, NextFunction} from 'express';
import Token from '../classes/token';
import { User } from '../models/user.model';


export const verificaToken = ( req: any, resp:Response , next: NextFunction) => {
    const userToken = req.get('x-token') || '';

    Token.comprobarToke( userToken)
        .then( (decode: any) => {
            req.user = decode.User;
            next();
        })
        .catch( err => {
            resp.json( {
                ok: false,
                mensaje: 'invalid Token'
            });

        })
};