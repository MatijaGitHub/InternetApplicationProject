"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let user = new mongoose_1.default.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phonenumber: {
        type: String
    },
    email: {
        type: String
    },
    name_of_organization: {
        type: String
    },
    adress_of_organization: {
        country: String,
        city: String,
        street: String,
        zipcode: String
    },
    organization_identification_number: {
        type: String
    },
    type_of_user: {
        type: Number
    },
    image_path: {
        type: String
    },
    approved: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("UserModel", user, 'users');
//# sourceMappingURL=user.js.map