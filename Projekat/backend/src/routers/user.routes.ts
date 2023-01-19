import express from 'express'
import { UserController } from '../controllers/user.controller'
import fileExtension from 'file-extension'
import multer from 'multer'
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, file.originalname.slice(0, -4)+'_'+req.body.username + '.' + fileExtension(file.originalname))
    }
})

export var upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        cb(undefined, true)
    }
})


let userRouter = express.Router();


userRouter.route('/login').post(
    (req, res)=>{
        return new UserController().login(req, res);
    }
)

userRouter.route('/register').post(
    
    upload.single('image'),
    (req, res)=>{
        return new UserController().register(req, res);
    }
)
userRouter.route('/sendRecoveryMail').post(
    (req, res)=>{
        return new UserController().sendRecoveryMail(req, res);
    }
)
userRouter.route('/changePassword').post(
    (req, res)=>{
        return new UserController().changePassword(req, res);
    }
)
userRouter.route('/changeUsername').post(
    (req, res)=>{
        return new UserController().changeUsername(req, res);
    }
)
userRouter.route('/changeFirstname').post(
    (req, res)=>{
        return new UserController().changeFirstname(req, res);
    }
)
userRouter.route('/changeLastname').post(
    (req, res)=>{
        return new UserController().changeLastname(req, res);
    }
)
userRouter.route('/changeEmail').post(
    (req, res)=>{
        return new UserController().changeEmail(req, res);
    }
)
userRouter.route('/changePhonenumber').post(
    (req, res)=>{
        return new UserController().changePhonenumber(req, res);
    }
)
userRouter.route('/changePicture').post(
    upload.single('image'),
    (req, res)=>{
        return new UserController().changeProfilePic(req, res);
    }
)


export default userRouter;