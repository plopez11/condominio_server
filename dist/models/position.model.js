"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
const mongoose_1 = require("mongoose");
const positionSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    builder: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Builder',
        required: [true, 'Debe existir una referencia a un builder']
    },
    balance: {
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});
positionSchema.pre('save', function (next) {
    this.created = new Date();
    next(null);
});
exports.Position = (0, mongoose_1.model)('Position', positionSchema);
