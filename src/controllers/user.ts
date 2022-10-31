import { Router, Request, Response, response } from 'express';
import {pool} from '../database';
import {QueryResult} from 'pg';
import { handleHttp } from '../utils/error.handle';
import Token from '../classes/token';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/interfaces';

const getUsers = async (req: Request, res: Response) => {
            
    try {
        
        let pagina = Number(req.query.pagina) || 1;
        if ( pagina === 0) pagina = 1;
        let skip = pagina - 1;
        skip = skip * 10;
            
        const user: QueryResult = await pool.query('SELECT * FROM public.tmccs_user');
    
        res.json({
            ok: true,
            pagina,
            user
        });
    } catch (e) {
        handleHttp(res,'ERROR_GET_USER, ' + e);
    }
};


//login
const loginUser= async (req: Request, res: Response) => {
    let id  = 0;
    let uid  = '';
    let firstname  = '';
    let lastname  = '';
    let password2 = '';
    try {
        const body= req.body;
        const epassword: String = bcrypt.hashSync(req.body.password, 10);
        const user: QueryResult = await pool.query(
            'SELECT id,uid,firstname,lastname,password FROM public.tmccs_user where email=$1',[body.email]);

        for (let row of user.rows) {
                 id = row.id;
                 uid = row.uid;
                 firstname = row.firstname;
                 lastname = row.lastname;
                 password2 = row.password;
        }

        if (user.rowCount == 1) {
            if (icompararPassword(body.password,password2)) {
                const tokenUSer = Token.getJwtToken({
    
                    firstname: firstname,
                    lastname: lastname,
                    email: body.email,
                    uid: uid
                 
                });
                res.json({
                    ok: true,
                    token: tokenUSer
                });
            } else {
                return res.json( {
                    ok: false,
                    mensaje: 'Invalid user or password ***'
                });
            }
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'Invalid user or password ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_LOGIN_USER, ' + e);
    }
        
}

const  icompararPassword = (password: string = '',password2: string = '')  => {
    if ( bcrypt.compareSync(password, password2)) {
        return true;
    } else {      
        return false;
    }

}


const getUser = async (req: Request, res: Response) => {

}

const ModifUser = async (req: Request, res: Response) => {

}

// Crear user
const createUser = async (req: Request, res: Response) => {    

    try {
        
        const body= req.body;
        const epassword: String = bcrypt.hashSync(req.body.password, 10);
        console.log(epassword);
        // const user: QueryResult = await pool.query(`INSERT INTO public.tmccs_user (uid,firstname,lastname,email,password) VALUES(${body.uid},
        //     ${body.firstname},${body.lastname},${body.email},${epassword}\'`);
        
        const user: QueryResult = await pool.query('INSERT INTO public.tmccs_user (uid,firstname,lastname,email,password) VALUES($1, $2, $3, $4, $5)',
                [body.uid, body.firstname,body.lastname,body.email,epassword]);

        if (user.rowCount == 1) {
            const tokenUSer = Token.getJwtToken({
                    firstname: body.firstname,
                    lastname: body.lastname,
                    email: body.email,
                    uid: body.uid
                });
                res.json({
                    ok: true,
                    token: tokenUSer
                });
        }
        else {
            return res.json( {
                ok: false,
                mensaje: 'ERROR_CREATE_USER ***'
            });
        }
    } catch (e) {
        handleHttp(res,'ERROR_CREATE_USER, ' + e);
        
    }
}
        
//     }
    
//     User.create( user ).then( userDB => {

//         const tokenUSer = Token.getJwtToken({
//             _id: userDB._id,
//             name: userDB.name,
//             email: userDB.email,
//             avatar: userDB.avatar
            
//         });
//         res.json({
//             ok: true,
//             token: tokenUSer
//         });
       
//     }).catch (err => {
//         res.json({
//             ok: false,
//             err
//         });
//     });
    
// });



const deleteUser = async (req: Request, res: Response) => {

}

export {getUser, createUser,getUsers, ModifUser, deleteUser, loginUser };



// Login
// const loginUser= async (req: Request, res: Response) => {
//         const body= req.body;
//         console.log(req);
//         User.findOne({email: body.email}, (err: any, userDB: { compararPassword: (arg0: any) => any; _id: any; name: any; email: any; avatar: any; }) =>{
//             if ( err ) throw err;

//             if ( !userDB ) {
//                     return res.json( {
//                         ok: false,
//                         mensaje: 'Invalid user or password'
//                     })
//             }
//             if (userDB.compararPassword(body.password)) {
//                 const tokenUSer = Token.getJwtToken({
//                     _id: userDB._id,
//                     name: userDB.name,
//                     email: userDB.email,
//                     avatar: userDB.avatar
//                 });
//                 res.json({
//                     ok: true,
//                     token: tokenUSer
//                 });
//             } else {
//                 return res.json( {
//                     ok: false,
//                     mensaje: 'Invalid user or password ***'
//                 });
//             }
//         });
// });



// Update user

// userRoutes.post('/update', verificaToken, (req: any, res: Response) => {

//     const user = {
//         name: req.body.name || req.name.name,
//         email: req.body.email || req.user.email,
//         avatar: req.body.avatar || req.user.avatar,
//         role: req.body.role || req.user.role
//     };

//     User.findByIdAndUpdate( req.user._id, user, { new: true}, (err, userDB)=> {
//         if ( err ) throw err;

//         if ( !userDB ) {
//             return res.json({
//                 ok: false,
//                 mensaje: 'There is no user with that ID***'
//             });
//         }

//         const tokenUSer = Token.getJwtToken({
//             _id: userDB._id,
//             name: userDB.name,
//             email: userDB.email,
//             avatar: userDB.avatar
//         });
//         res.json({
//             ok: true,
//             token: tokenUSer
//         });

//     });
// });
