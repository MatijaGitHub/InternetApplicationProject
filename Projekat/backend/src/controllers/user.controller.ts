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
    register = (req: express.Request, res: express.Response)=>{
        let is_user = req.body.is_user;
        let username = req.body.username;
        let userFromDB = UserModel.findOne({'username' : username}, (err, userDB)=>{
            if(err || userDB) res.json({'message': 'Username already exists'});
            else{
                let user = new UserModel({
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    username : req.body.username,
                    password : req.body.password,
                    phonenumber : req.body.number,
                    email : req.body.email,
                    type_of_user : is_user?0:1
                })
                if(!is_user){
                    user.name_of_organization = req.body.name_of_org;
                    user.organization_identification_number = req.body.id_num;
                    user.adress_of_organization.country = req.body.country;
                    user.adress_of_organization.city = req.body.city;
                    user.adress_of_organization.zipcode = req.body.zipcode;
                    user.adress_of_organization.street = req.body.street;
        
                }
                user.save();
                res.json({'message' : 'Successfull registration!'});
            }
            
        })
        
    }
}