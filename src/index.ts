import Server from './classes/server';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/user';
import positionRoutes from './routes/position';
import apartmentRoutes from './routes/apartment';
import paysRoutes from './routes/pays';
import buildingRoutes from './routes/building';
import billRoutes from './routes/bill';
import billDetailRoutes from './routes/billDetail';
import countryRoutes from './routes/country';
import { environment } from './environments/environment';


import cors from 'cors';
import { application } from 'express';
import express from 'express';

const server =  new Server();

//middlewares
application.use(express.json());
application.use(express.urlencoded({extended:false}));



const baseUrl = environment.baseUrl;
const MONGODB_URI = environment.MONGODB_URI;
const prod= environment.PROD;

//bodyParser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//fileupload
server.app.use(fileUpload());

//configurar Cors
server.app.use( cors({ origin: true, credentials: true}) );

//Rutas de mi aplicacion
server.app.use('/user', userRoutes)
server.app.use('/user/create', userRoutes)
server.app.use('/country', countryRoutes)
server.app.use('/position', positionRoutes)
server.app.use('/builder', buildingRoutes)
server.app.use('/apartment', apartmentRoutes)
server.app.use('/pays', paysRoutes)
server.app.use('/bill', billRoutes)
server.app.use('/billDetail', billDetailRoutes)


//levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto:${server.port}`);
});