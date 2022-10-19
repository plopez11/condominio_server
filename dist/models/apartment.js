"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apartment = void 0;
const mongoose_1 = require("mongoose");
// builder: string;
//     number: string;
//     owner: string;
//     floor: number
const apartmentSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    builder: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Builder',
        required: [true, 'Debe existir una referencia a un builder']
    },
    number: {
        type: String
    },
    floor: {
        type: Number
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});
apartmentSchema.pre('save', function (next) {
    this.created = new Date();
    next(null);
});
exports.Apartment = (0, mongoose_1.model)('Apartment', apartmentSchema);
