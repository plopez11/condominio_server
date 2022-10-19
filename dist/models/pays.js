"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pays = void 0;
const mongoose_1 = require("mongoose");
const paysSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    builder: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Builder',
        required: [true, 'Debe existir una referencia a un builder']
    },
    apartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Apartment',
        required: [true, 'Debe existir una referencia a un apartamento']
    },
    amount: {
        type: Number
    },
    bank: {
        type: String
    },
    reference: {
        type: String
    },
    description: {
        type: String
    },
    previousBalance: {
        type: Number
    },
    BalanceAfterPay: {
        type: Number
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});
paysSchema.pre('save', function (next) {
    this.created = new Date();
    next(null);
});
exports.Pays = (0, mongoose_1.model)('Pays', paysSchema);
