import { Schema, model, Document, Decimal128 } from 'mongoose';
import { IPosition } from '../interfaces/interfaces';

const positionSchema = new Schema({

    created: {
        type: Date
    },  
    builder: {
        type: Schema.Types.ObjectId,
        ref: 'Builder',
        required: [true, 'Debe existir una referencia a un builder']
    },
    balance:{
        type: Number
    },
    message: {
        type: String
    },
    lastPayDate: {
        type: Date
    },
    lastPay: {
        type: Number
    },
    amountLastMonth: {
        type: Number
    },
    dateLastMonth: {
        type: Date
    },
    apartment: {
        type: String
    },
    image: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});

positionSchema.pre<IPosition>('save', function( next ) {
    this.created = new Date();
    next(null);
    
});


export const Position = model<IPosition>('Position', positionSchema);