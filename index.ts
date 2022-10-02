import Server from './classes/server';
import userRoutes from './routes/user';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import postRoutes from './routes/post';
import positionRoutes from './routes/position';
import apartmentRoutes from './routes/apartment';
import paysRoutes from './routes/pays';
import builderRoutes from './routes/builder';
import billingNoticeRoutes from './routes/billingNotice';
import billingNoticeDetailRoutes from './routes/billingNoticeDetail';
import cors from 'cors';

const server =  new Server();

//bodyParser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//fileupload
server.app.use(fileUpload());

//configurar Cors
server.app.use( cors({ origin: true, credentials: true}) );

//Rutas de mi aplicacion
server.app.use('/user', userRoutes)
server.app.use('/posts', postRoutes)
server.app.use('/position', positionRoutes)
server.app.use('/builder', builderRoutes)
server.app.use('/apartment', apartmentRoutes)
server.app.use('/pays', paysRoutes)
server.app.use('/billingNotice', billingNoticeRoutes)
server.app.use('/billingNoticeDetail', billingNoticeDetailRoutes)

//conectar bd
// mongoose.connect('mongodb://localhost:27017/condominios', 
//                 { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {
//     if ( err ) throw err;
//     console.log('Base de datos ONLINE');
// });

//conectar bd
mongoose.connect('mongodb://localhost:27017/condominios', ( err ) => {
    if ( err ) throw err;
    console.log('Base de datos ONLINE');
});


//levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto:${server.port}`);
});
