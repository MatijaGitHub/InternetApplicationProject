"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let user_chat = new mongoose_1.default.Schema({
    username1: {
        type: String
    },
    username2: {
        type: String
    },
    workshopId: {
        type: String
    },
    messages: [
        {
            user: {
                type: String
            },
            message: {
                type: String
            },
            time: {
                type: Date
            }
        }
    ]
});
exports.default = mongoose_1.default.model("UserChatModel", user_chat, 'user_chat');
//# sourceMappingURL=user_chat.js.map