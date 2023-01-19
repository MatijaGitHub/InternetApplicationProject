"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let user_comment_workshop = new mongoose_1.default.Schema({
    username: {
        type: String
    },
    comment: {
        type: String
    },
    workshopId: {
        type: String
    }
});
exports.default = mongoose_1.default.model("UserCommentWorkshopModel", user_comment_workshop, 'user_comment_workshop');
//# sourceMappingURL=user_comment_workshop.js.map