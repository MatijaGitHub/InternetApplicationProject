"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const file_extension_1 = __importDefault(require("file-extension"));
const multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, file.originalname.slice(0, -4) + '_' + req.body.username + '.' + (0, file_extension_1.default)(file.originalname));
    }
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload JPG and PNG images only!'));
        }
        cb(undefined, true);
    }
});
let userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => {
    return new user_controller_1.UserController().login(req, res);
});
userRouter.route('/register').post(exports.upload.single('image'), (req, res) => {
    return new user_controller_1.UserController().register(req, res);
});
userRouter.route('/sendRecoveryMail').post((req, res) => {
    return new user_controller_1.UserController().sendRecoveryMail(req, res);
});
userRouter.route('/changePassword').post((req, res) => {
    return new user_controller_1.UserController().changePassword(req, res);
});
userRouter.route('/changeUsername').post((req, res) => {
    return new user_controller_1.UserController().changeUsername(req, res);
});
userRouter.route('/changeFirstname').post((req, res) => {
    return new user_controller_1.UserController().changeFirstname(req, res);
});
userRouter.route('/changeLastname').post((req, res) => {
    return new user_controller_1.UserController().changeLastname(req, res);
});
userRouter.route('/changeEmail').post((req, res) => {
    return new user_controller_1.UserController().changeEmail(req, res);
});
userRouter.route('/changePhonenumber').post((req, res) => {
    return new user_controller_1.UserController().changePhonenumber(req, res);
});
userRouter.route('/changePicture').post(exports.upload.single('image'), (req, res) => {
    return new user_controller_1.UserController().changeProfilePic(req, res);
});
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map