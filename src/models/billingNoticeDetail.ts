
// import { Schema, model, Document, Decimal128 } from 'mongoose';
// import { IbillingNoticeDetail } from '../interfaces/interfaces';

// const billingNoticeDetailSchema = new Schema({

    
//     created: {
//         type: Date
//     },  
//     billingNotice: {
//         type: Schema.Types.ObjectId,
//         ref: 'BillingNotice',
//         required: [true, 'Debe existir una referencia a un recibo']
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
//     total:{
//         type: Number
//     },        
//     aliquot:{
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

// billingNoticeDetailSchema.pre<IbillingNoticeDetail>('save', function( next ) {
//     this.created = new Date();
//     next(null);
    
// });


// export const BillingNoticeDetail = model<IbillingNoticeDetail>('BillingNoticeDetail', billingNoticeDetailSchema);

