// // import { Schema, model, Document, Decimal128 } from 'mongoose';

export interface IUser extends Document {
    id: Number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role_id: string,
    status: string,
}
//     compararPassword(password:string): boolean;
// }

// export interface IPosition extends Document {
//     created: Date;
//     builder: String;
//     balance: Number;
//     message: string;
//     lastPayDate: Date;
//     lastPay: Number;
//     amountLastMonth: Number;
//     dateLastMonth: Date;
//     apartment: string;
//     image: string;
//     user: string;
    
// }

// export interface IBuilder extends Document {
//     name: string;
//     address: string;
//     image: string;
//     location: string;
//     created: Date;
// }

// export interface IApartment extends Document {
//     builder: string;
//     number: string;
//     user: string;
//     floor: number;
//     created: Date;
// }

// export interface Ipays extends Document {
//     created: Date;
//     apartment: string;
//     user: string;
//     builder: string;
//     amount: Number;
//     bank: string;
//     reference: string;
//     description: string;
//     previousBalance: Number;
//     BalanceAfterPay:Number;
// }

// export interface IbillingNotice extends Document {
//     created: Date;
//     builder: string;
//     apartment: string;
//     user: string;
//     month: string;
//     amountMonth: Number;
//     totalpay: Number;
//     rate: Number;
//     description: string;
// }

// export interface IbillingNoticeDetail extends Document {
//     created: Date;
//     billingNotice: string;
//     builder: string;
//     apartment: string;
//     user: string;
//     description: String;
//     total: Number;
//     aliquot: Number;
// }
