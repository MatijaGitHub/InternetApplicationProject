"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let userToReturn = user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err || !user)
                    res.json({ 'message': 'User does not exist!' });
                else {
                    if (user.password != password) {
                        res.json({ 'message': 'Wrong password!' });
                    }
                    else {
                        res.json(user);
                    }
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map