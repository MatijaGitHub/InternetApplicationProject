"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const file_extension_1 = __importDefault(require("file-extension"));
var RandExp = require('randexp');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'nullpointerexceptionpsi@outlook.com',
        pass: 'bobancoban123'
    }
});
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
            let fields = req.body;
            let is_user = fields.is_user;
            let username = fields.username;
            let userFromDB = user_1.default.findOne({ 'username': username }, (err, userDB) => {
                if (err || userDB)
                    res.json({ 'message': 'Username already exists' });
                else {
                    let user = new user_1.default({
                        firstname: fields.firstname,
                        lastname: fields.lastname,
                        username: fields.username,
                        password: fields.password,
                        phonenumber: fields.number,
                        email: fields.email,
                        type_of_user: is_user == '1' ? 0 : 1
                    });
                    if (fields.hasImage == '2') {
                        user.image_path = 'images/' + req.file.originalname.slice(0, -4) + '_' + req.body.username + '.' + (0, file_extension_1.default)(req.file.originalname);
                    }
                    if (!(is_user == '1')) {
                        user.name_of_organization = fields.name_of_org;
                        user.organization_identification_number = fields.id_num;
                        user.adress_of_organization.country = fields.country;
                        user.adress_of_organization.city = fields.city;
                        user.adress_of_organization.zipcode = fields.zipcode;
                        user.adress_of_organization.street = fields.street;
                    }
                    user.save();
                    res.json({ 'message': 'Successfull registration!' });
                }
            });
        };
        this.sendRecoveryMail = (req, res) => {
            let email = req.body.email;
            let userFromDB = user_1.default.findOne({ 'email': email }, (err, response) => {
                if (err || !response) {
                    res.json({ 'message': 'Dati email nije registrovan u bazi!' });
                }
                else {
                    let oldPassword = response.password;
                    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z][A-Za-z\d@$!%*?&]{7,15}$/;
                    let newPassword = this.generateRandomPassword(passwordRegex);
                    response.password = newPassword;
                    response.save();
                    var mailOptions = {
                        from: 'nullpointerexceptionpsi@outlook.com',
                        to: email,
                        subject: 'New password',
                        text: newPassword
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log("Email sent");
                        }
                    });
                    setTimeout((newPassword, oldPassword, username) => {
                        let userFromDB2 = user_1.default.findOne({ 'username': username }, (err, resp) => {
                            if (resp.password == newPassword) {
                                resp.password = oldPassword;
                                resp.save();
                            }
                        });
                    }, 1800000, newPassword, oldPassword, response.username);
                    res.json({ 'message': 'Email sent!' });
                }
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let newPassword = req.body.newPassword;
            let userFromDB = user_1.default.findOne({ 'username': username }, (err, resp) => {
                if (err || resp == null) {
                    res.json({ 'message': 'User not found!' });
                }
                else {
                    resp.password = newPassword;
                    resp.save();
                    res.json({ 'message': 'Password changed!' });
                }
            });
        };
    }
    generateRandomPassword(regEx) {
        return new RandExp(regEx).gen();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map