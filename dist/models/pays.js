"use strict";
// import { Schema, model, Document, Decimal128 } from 'mongoose';
// import { Ipays } from '../interfaces/interfaces';
// const paysSchema = new Schema({
//     created: {
//         type: Date
//     },  
//     builder: {
//         type: Schema.Types.ObjectId,
//         ref: 'Builder',
//         required: [true, 'Debe existir una referencia a un builder']
//     },
//     apartment: {
//         type: Schema.Types.ObjectId,
//         ref: 'Apartment',
//         required: [true, 'Debe existir una referencia a un apartamento']
//     },
//     amount:{
//         type: Number
//     },
//     bank:{
//         type: String
//     },
//     reference:{
//         type: String
//     },
//     description:{
//         type: String
//     },
//     previousBalance:{
//         type: Number
//     },
//     BalanceAfterPay:{
//         type: Number
//     },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: [true, 'Debe existir una referencia a un usuario']
//     }
// });
// paysSchema.pre<Ipays>('save', function( next ) {
//     this.created = new Date();
//     next(null);
// });
// export const Pays = model<Ipays>('Pays', paysSchema);
