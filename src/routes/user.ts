import { Router } from 'express';
// import { User } from '../models/user.model';
// import bcrypt from 'bcrypt';

import { verificaToken } from '../middlewares/autenticacion';
import {getUser, loginUser, createUser,getUsers, ModifUser, deleteUser } from '../controllers/user'
// import { now } from 'mongoose';

const userRoutes =  Router() ;

userRoutes.get('/',[verificaToken], getUsers);
userRoutes.get('/:id', getUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/', createUser);
userRoutes.put('/:id',[verificaToken], ModifUser);
userRoutes.delete('/:id',[verificaToken], deleteUser);


export default userRoutes;
