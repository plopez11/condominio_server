import express from 'express'
import { environment } from '../environments/environment';
// import {dotenv} from '../'

 

export default class Server {

    public port = process.env.PORT || 3000;
    public host = process.env.HOST || '0.0.0.0';

    public app : express.Application;
    // public port: number = 3000;
    // public host=environment.HOST || '0.0.0.0';
    // public port=environment.PORT || 3000;
    

    constructor() {
        this.app = express();
    }

    start( callback: Function ) {
       this.app.listen( this.port, callback());

    }

}