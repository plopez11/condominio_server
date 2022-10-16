"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const user_1 = __importDefault(require("./routes/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const post_1 = __importDefault(require("./routes/post"));
const position_1 = __importDefault(require("./routes/position"));
const apartment_1 = __importDefault(require("./routes/apartment"));
const pays_1 = __importDefault(require("./routes/pays"));
const builder_1 = __importDefault(require("./routes/builder"));
const billingNotice_1 = __importDefault(require("./routes/billingNotice"));
const billingNoticeDetail_1 = __importDefault(require("./routes/billingNoticeDetail"));
const environment_1 = require("./environments/environment");
const cors_1 = __importDefault(require("cors"));
const server = new server_1.default();
let baseUrl = environment_1.environment.baseUrl;
let MONGODB_URI = environment_1.environment.MONGODB_URI;
let prod = environment_1.environment.production;
//bodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//fileupload
server.app.use((0, express_fileupload_1.default)());
//configurar Cors
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//Rutas de mi aplicacion
server.app.use('/user', user_1.default);
server.app.use('/posts', post_1.default);
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
//conectar bd
if (!prod) {
    mongoose_1.default.connect(baseUrl, (err) => {
        if (err)
            throw err;
        console.log('Base de datos Local ONLINE');
    });
}
else {
    console.log('tratando de conectar..');
    console.log(MONGODB_URI);
    mongoose_1.default.connect(MONGODB_URI, (err) => {
        if (err)
            throw err;
        console.log('Base de datos MongoAtlas ONLINE');
    });
}
//levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto:${server.port}`);
});
