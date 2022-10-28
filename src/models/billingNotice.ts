
// import { Schema, model, Document, Decimal128 } from 'mongoose';
// import { IbillingNotice } from '../interfaces/interfaces';

// const billingNoticeSchema = new Schema({

    
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
//     month:{
//         type: Number
//     },        
//     amountMonth:{
//         type: Number
//     },
//     totalPay:{
//         type: Number
//     },
//     rate:{
//         type: Number
//     },
    
//     description:{
//         type: String
//     },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: [true, 'Debe existir una referencia a un usuario']
//     }
    
// });

// billingNoticeSchema.pre<IbillingNotice>('save', function( next ) {
//     this.created = new Date();
//     next(null);
    
// });


// export const BillingNotice = model<IbillingNotice>('BillingNotice', billingNoticeSchema);
