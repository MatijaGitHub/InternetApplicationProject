import express from 'express'
import UserModel from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let userToReturn = UserModel.findOne({'username' : username}, (err, user)=>{
            if(err || !user) res.json({'message': 'User does not exist!'});
            else{
                if(user.password != password){
                    res.json({'message': 'Wrong password!'});
                }
                else{
                    res.json(user);
                }
            }
        })

    }
}