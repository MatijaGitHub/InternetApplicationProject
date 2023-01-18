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
        type: Date
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
    numOfLikes: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("WorkshopModel", workshop, 'workshops');
//# sourceMappingURL=workshop.js.map