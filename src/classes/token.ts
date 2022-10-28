import jwt from 'jsonwebtoken';
// import { User } from '../models/user.model';

export default class Token {
    private static seed: string = 'estes-es-el-seed-app';
    private static caducidad: string = '30d';

    constructor() {}

    static getJwtToken( payload: any): string {
        return jwt.sign({
            User: payload},
            this.seed, { expiresIn: this.caducidad});
    }

    static comprobarToke( userToken: string) {

        return new Promise( (result, reject) =>{

            jwt.verify( userToken, this.seed, (err, decode) =>{
                if ( err ) {
                    reject();
                } else {
                    result(decode);
                }
            } );
        });
    }
}