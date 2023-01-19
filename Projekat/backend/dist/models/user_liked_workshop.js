"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let user_liked_workshop = new mongoose_1.default.Schema({
    username: {
        type: String
    },
    workshopId: {
        type: String
    }
});
exports.default = mongoose_1.default.model("UserLikedWorkshopModel", user_liked_workshop, 'user_like_workshop');
//# sourceMappingURL=user_liked_workshop.js.map