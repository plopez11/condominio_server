import { Schema, model, Document, Decimal128 } from 'mongoose';

export interface IUser extends Document {
    name: string,
    avatar: string,
    email: string,
    password: string,
    role: string,
    created: Date,
    status: string,

    compararPassword(password:string): boolean;
}

export interface IPosition extends Document {
    created: Date;
    builder: String;
    saldo: Decimal128;
    message: string;
    lastPayDate: Date;
    lastPay: Decimal128;
    amountLastMonth: Decimal128;
    dateLastMonth: Date;
    apartment: string;
    image: string;
    usuario: string;
    
}

export interface IBuilder extends Document {
    name: string;
    address: string;
    image: string;
    location: string;
    created: Date;
}

export interface IApartment extends Document {
    builder: string;
    number: string;
    user: string;
    floor: number;
    created: Date;
}

export interface Ipays extends Document {
    created: Date;
    apartment: string;
    user: string;
    builder: string;
    amount: Decimal128;
    bank: string;
    reference: string;
    description: string;
    previousBalance: Decimal128;
    BalanceAfterPay:Decimal128;
}

export interface IbillingNotice extends Document {
    created: Date;
    builder: string;
    apartment: string;
    user: string;
    month: string;
    amountMonth: Decimal128;
    totalpay: Decimal128;
    rate: Decimal128;
    description: string;
}

export interface IbillingNoticeDetail extends Document {
    created: Date;
    billingNotice: string;
    builder: string;
    apartment: string;
    user: string;
    description: String;
    total: Decimal128;
    aliquot: Decimal128;
}
