import { fileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
// import uniqid from 'uniqid';


export default class  FileSystem {


    constructor() {}

    guardarImagenTemporal( file: fileUpload, userId: string) {

        return new Promise<void>( (resolve, reject) => {

            //crear carpeta
            const path = this.crearCarpetaUsuario(userId);
    
            //nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            
            //mover el archivo del Temp a nuestra carpete
    
            file.mv(`${path}/${nombreArchivo}`, (err: any) =>{
    
                if ( err ) {
                    reject(err);
                } else {
                    resolve();
                }
    
            });
        });
        
        
    }

    private generarNombreUnico( nombreOriginal: string) {

        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length - 1 ];
        const idUnico   = uniqid();
        return `${idUnico}.${extension}`;


    }

    private crearCarpetaUsuario( userId: string) {
        const pathUser = path.resolve( __dirname, '../uploads/', userId );
        const pathUserTemp = pathUser + '/Temp';
        const existe = fs.existsSync(pathUser);

        if ( !existe ) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;

        // console.log(pathUser);

    }

    public imagenesDeTempHaciaPost( userId: string) {
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp' );
        const pathPost = path.resolve( __dirname, '../uploads/', userId, 'post' );
    
        if (!fs.existsSync( pathTemp )) {
            return [];
        } 

        if (!fs.existsSync( pathPost )) {
            fs.mkdirSync(pathPost);
        }

        const imagenesTemp = this.obterneImagenesEnTemp(userId);

        imagenesTemp.forEach( imagen => {
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        })

        return imagenesTemp;

    }

    private obterneImagenesEnTemp(userId: string) {
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp' );
        return fs.readdirSync(pathTemp) || [];
    }

    getFotoUrl( userId: string, img: string) {
        //path Post
        const pathFoto = path.resolve( __dirname, '../uploads/', userId, 'post', img );

        //validar si la imagen existe
        const existe = fs.existsSync(pathFoto);
        if ( !existe ) {
            return path.resolve( __dirname, '../assets/400x250.jpg');
        }
        
        return pathFoto;
    } 
}

function uniqid() {
    throw new Error('Function not implemented.');
}
