import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import {getUser, loginUser, createUser,getUsers, ModifUser, deleteUser } from '../controllers/user'


const userRoutes =  Router() ;

userRoutes.get('/',[verificaToken], getUsers);
userRoutes.get('/:id',[verificaToken], getUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/create', createUser);
userRoutes.put('/:id',[verificaToken], ModifUser);
userRoutes.delete('/:id',[verificaToken], deleteUser);


export default userRoutes;
