"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingNoticeDetail = void 0;
const mongoose_1 = require("mongoose");
const billingNoticeDetailSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    billingNotice: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'BillingNotice',
        required: [true, 'Debe existir una referencia a un recibo']
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
    total: {
        type: Number
    },
    aliquot: {
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
billingNoticeDetailSchema.pre('save', function (next) {
    this.created = new Date();
    next(null);
});
exports.BillingNoticeDetail = (0, mongoose_1.model)('BillingNoticeDetail', billingNoticeDetailSchema);
