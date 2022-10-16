import { Router,Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import { now } from 'mongoose';

const userRoutes =  Router() ;

//login
userRoutes.post('/login', (req: Request, res: Response) => {
        const body= req.body;
        console.log(req);
        User.findOne({email: body.email}, (err: any, userDB: { compararPassword: (arg0: any) => any; _id: any; name: any; email: any; avatar: any; }) =>{
            if ( err ) throw err;

            if ( !userDB ) {
                    return res.json( {
                        ok: false,
                        mensaje: 'Invalid user or password'
                    })
            }
            if (userDB.compararPassword(body.password)) {
                const tokenUSer = Token.getJwtToken({
                    _id: userDB._id,
                    name: userDB.name,
                    email: userDB.email,
                    avatar: userDB.avatar
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
        });
});

//Crear user
userRoutes.post('/create', ( req: Request, res: Response) => {

        
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
        role:req.body.role,
        created: new Date(),
        
    }
    
    User.create( user ).then( userDB => {

        const tokenUSer = Token.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
            
        });
        res.json({
            ok: true,
            token: tokenUSer
        });
       
    }).catch (err => {
        res.json({
            ok: false,
            err
        });
    });
    
});

//Update user

userRoutes.post('/update', verificaToken, (req: any, res: Response) => {

    const user = {
        name: req.body.name || req.name.name,
        email: req.body.email || req.user.email,
        avatar: req.body.avatar || req.user.avatar,
        role: req.body.role || req.user.role
    };

    User.findByIdAndUpdate( req.user._id, user, { new: true}, (err, userDB)=> {
        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'There is no user with that ID***'
            });
        }

        const tokenUSer = Token.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUSer
        });

    });
});

userRoutes.get('/', [verificaToken], (req: any, res: Response) =>{
    const user = req.user;

    res.json({
        ok: true,
        user
    })
})

export default userRoutes;
