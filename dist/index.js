"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
// import mongoose from 'mongoose';
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const user_1 = __importDefault(require("./routes/user"));
const position_1 = __importDefault(require("./routes/position"));
const apartment_1 = __importDefault(require("./routes/apartment"));
const pays_1 = __importDefault(require("./routes/pays"));
const builder_1 = __importDefault(require("./routes/builder"));
const billingNotice_1 = __importDefault(require("./routes/billingNotice"));
const billingNoticeDetail_1 = __importDefault(require("./routes/billingNoticeDetail"));
const country_1 = __importDefault(require("./routes/country"));
const environment_1 = require("./environments/environment");
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const server = new server_1.default();
//middlewares
express_1.application.use(express_2.default.json());
express_1.application.use(express_2.default.urlencoded({ extended: false }));
const baseUrl = environment_1.environment.baseUrl;
const MONGODB_URI = environment_1.environment.MONGODB_URI;
const prod = environment_1.environment.PROD;
//bodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//fileupload
server.app.use((0, express_fileupload_1.default)());
//configurar Cors
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//Rutas de mi aplicacion
server.app.use('/user', user_1.default);
server.app.use('/user/create', user_1.default);
server.app.use('/country', country_1.default);
server.app.use('/position', position_1.default);
server.app.use('/builder', builder_1.default);
server.app.use('/apartment', apartment_1.default);
server.app.use('/pays', pays_1.default);
server.app.use('/billingNotice', billingNotice_1.default);
server.app.use('/billingNoticeDetail', billingNoticeDetail_1.default);
//conectar bd
// mongoose.connect('mongodb://localhost:27017/condominios', 
//                 { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {
//     if ( err ) throw err;
//     console.log('Base de datos ONLINE');
// });
//conectar bd mongoDB
// if (!prod)
// {
//     mongoose.connect(baseUrl, ( err ) => {
//         if ( err ) throw err;
//         console.log('Base de datos Local ONLINE');
//     });
// }
// else {
//     console.log('tratando de conectar..');
//     console.log(MONGODB_URI);
//     mongoose.connect(MONGODB_URI, ( err ) => {
//         if ( err ) throw err;
//         console.log('Base de datos MongoAtlas ONLINE');
//     });
// }
//levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto:${server.port}`);
});
