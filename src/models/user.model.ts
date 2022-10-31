// // import { Schema, model, Document } from 'mongoose';
// import bcrypt from 'bcrypt';
// import { IUser } from '../interfaces/interfaces';

// export const User = <IUser>('User');

// const User: IUser ={
//     firstname: String,
//     lastname: String,
//     email: String,
//     password: String,
//     role_id: String,
//     status: String,
// }

// // const userSchema = new Schema({

// //     name: {
// //         type: String,
// //         required : [true, 'name field is mandatory']
// //     },
// //     avatar: {
// //         type: String,
// //         default: 'av-1.png'
// //     },
// //     email: {
// //         type: String,
// //         unique: true,
// //         required : [true, 'El correo es obligatorio']
// //     },
// //     password: {
// //         type: String,
// //         unique: true,
// //         required : [true, 'La contraseña es obligatoria']
// //     },
// //     role: {
// //         type: String,
// //         required: [true, 'Debe existir una referencia a un role']
// //     },
// //     created: {
// //         type: Date
// //     },
// // });

// // userSchema.method('compararPassword', function(password: string = ''): boolean {
// //     if ( bcrypt.compareSync(password, this.password)) {
// //         return true;
// //     } else {
// //         return false;
// //     }
    
// // });


// // export const User = model<IUser>('User',userSchema);
