"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingNotice = void 0;
const mongoose_1 = require("mongoose");
const billingNoticeSchema = new mongoose_1.Schema({
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
    month: {
        type: Number
    },
    amountMonth: {
        type: Number
    },
    totalPay: {
        type: Number
    },
    rate: {
        type: Number
    },
    description: {
        type: String
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});
billingNoticeSchema.pre('save', function (next) {
    this.created = new Date();
    next(null);
});
exports.BillingNotice = (0, mongoose_1.model)('BillingNotice', billingNoticeSchema);
