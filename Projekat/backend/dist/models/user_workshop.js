"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let user_workshop = new mongoose_1.default.Schema({
    username: {
        type: String
    },
    workshopId: {
        type: String
    },
    status: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("UserWorkshopModel", user_workshop, 'user_workshop');
//# sourceMappingURL=user_workshop.js.map