"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let workshop = new mongoose_1.default.Schema({
    workshopName: {
        type: String
    },
    workshopDate: {
        type: Date,
        default: Date
    },
    workshopImage: {
        type: String
    },
    workshopPlace: {
        type: String
    },
    workshopDesc: {
        type: String
    },
    workshopDescLong: {
        type: String
    },
    numOfLikes: {
        type: Number
    },
    freeSpaces: {
        type: Number
    },
    status: {
        type: Number
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    organizatorUsername: {
        type: String
    },
    waitList: [{
            type: String
        }]
});
exports.default = mongoose_1.default.model("WorkshopModel", workshop, 'workshops');
//# sourceMappingURL=workshop.js.map