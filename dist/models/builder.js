"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const mongoose_1 = require("mongoose");
const builderSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    image: {
        type: String
    },
    location: {
        type: String
    },
});
builderSchema.pre('save', function (next) {
    this.created = new Date();
    next(null);
});
exports.Builder = (0, mongoose_1.model)('Builder', builderSchema);
