"use strict";
// import { Schema, model, Document, Decimal128 } from 'mongoose';
// import { IApartment } from '../interfaces/interfaces';
// builder: string;
//     number: string;
//     owner: string;
//     floor: number
// const apartmentSchema = new Schema({
//     created: {
//         type: Date
//     },  
//     builder: {
//         type: Schema.Types.ObjectId,
//         ref: 'Builder',
//         required: [true, 'Debe existir una referencia a un builder']
//     },
//     number:{
//         type: String
//     },
//     floor:{
//         type: Number
//     },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: [true, 'Debe existir una referencia a un usuario']
//     }
// });
// apartmentSchema.pre<IApartment>('save', function( next ) {
//     this.created = new Date();
//     next(null);
// });
// export const Apartment = model<IApartment>('Apartment', apartmentSchema);
