import express from 'express'
import { UserController } from '../controllers/user.controller';



let userRouter = express.Router();


userRouter.route('/login').post(
    (req, res)=>{
        return new UserController().login(req, res);
    }
)

userRouter.route('/register').post(
    (req, res)=>{
        return new UserController().register(req, res);
    }
)

export default userRouter;