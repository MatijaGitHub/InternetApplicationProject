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
        this.register = (req, res) => {
            let is_user = req.body.is_user;
            let username = req.body.username;
            let userFromDB = user_1.default.findOne({ 'username': username }, (err, userDB) => {
                if (err || userDB)
                    res.json({ 'message': 'Username already exists' });
                else {
                    let user = new user_1.default({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        password: req.body.password,
                        phonenumber: req.body.number,
                        email: req.body.email,
                        type_of_user: is_user ? 0 : 1
                    });
                    if (!is_user) {
                        user.name_of_organization = req.body.name_of_org;
                        user.organization_identification_number = req.body.id_num;
                        user.adress_of_organization.country = req.body.country;
                        user.adress_of_organization.city = req.body.city;
                        user.adress_of_organization.zipcode = req.body.zipcode;
                        user.adress_of_organization.street = req.body.street;
                    }
                    user.save();
                    res.json({ 'message': 'Successfull registration!' });
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map