import express from 'express'
import UserModel from '../models/user'
import { upload } from '../routers/user.routes';
import fileExtension from 'file-extension'
import e from 'express';
var RandExp = require('randexp');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'nullpointerexceptionpsi@outlook.com',
        pass: 'bobancoban123'
    }
});


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

    register = (req: express.Request , res: express.Response)=>{
            let fields = req.body;
            let is_user = fields.is_user;
            let username = fields.username;
            let userFromDB = UserModel.findOne({'username' : username}, (err, userDB)=>{
                if(err || userDB) res.json({'message': 'Username already exists'});
                else{
                    let user = new UserModel({
                        firstname : fields.firstname,
                        lastname : fields.lastname,
                        username : fields.username,
                        password : fields.password,
                        phonenumber : fields.number,
                        email : fields.email,
                        type_of_user : is_user == '1'?0:1
                    })
                    if(fields.hasImage == '2'){
                        user.image_path = 'images/' + req.file.originalname.slice(0, -4)+'_'+req.body.username + '.' + fileExtension(req.file.originalname)
                    }
                    if(!(is_user=='1')){
                        user.name_of_organization = fields.name_of_org;
                        user.organization_identification_number = fields.id_num;
                        user.adress_of_organization.country = fields.country;
                        user.adress_of_organization.city = fields.city;
                        user.adress_of_organization.zipcode = fields.zipcode;
                        user.adress_of_organization.street = fields.street;
            
                    }
                    user.save();
                    res.json({'message' : 'Successfull registration!'});
                }
                
            })
                
          
        
        
    }
    sendRecoveryMail =  (req: express.Request , res: express.Response)=>{
        let email = req.body.email;
  
        let userFromDB = UserModel.findOne({'email' : email}, (err, response)=>{
            if(err || !response){
                res.json({'message':'Dati email nije registrovan u bazi!'});
            }
            else{
                let oldPassword = response.password
                const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z][A-Za-z\d@$!%*?&]{7,15}$/
                let newPassword = this.generateRandomPassword(passwordRegex);
                response.password = newPassword;
                response.save();
                var mailOptions = {
                    from: 'nullpointerexceptionpsi@outlook.com',
                    to: email,
                    subject: 'New password',
                    text: newPassword
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error){
                        console.log(error);
                        
                    } else {
                        console.log("Email sent");
                        
                    }
                });
                setTimeout((newPassword: string, oldPassword: string, username: string)=>{
                    let userFromDB2 = UserModel.findOne({'username' : username}, (err, resp)=>{
                        
                        if(resp.password==newPassword){
                         
                            resp.password = oldPassword;
                            resp.save();
                        }
                    })
                }, 1800000, newPassword, oldPassword, response.username)
                res.json({'message': 'Email sent!'});
            }
        })



    }

    generateRandomPassword(regEx: RegExp) : string{
        return new RandExp(regEx).gen();
    }
    changePassword =  (req: express.Request , res: express.Response)=>{
        let username = req.body.username;
        let newPassword = req.body.newPassword;
        let oldPassword = req.body.oldPassword;
        let userFromDB = UserModel.findOne({'username': username}, (err, resp)=>{
            if(err || resp == null){
                res.json({'message': 'User not found!'});
            }
            else{
                if(resp.password == oldPassword){
                    resp.password = newPassword;
                    resp.save();
                    res.json({'message': 'Password changed!'});
                }
                else{
                    res.json({'message': 'Wrong password!'});
                }
                
            }
            
        })


    }

    changeFirstname = (req: express.Request , res: express.Response) =>{
        let firstname = req.body.firstname;
        let username = req.body.username;
        let userFromDB = UserModel.findOne({'username': username}, (err, resp)=>{
            if(err || resp == null){
                res.json({'message': 'User not found!'});
            }
            else{
                resp.firstname = firstname;
                resp.save();
                res.json({'message': 'Username changed!'});
            }
        })
    }
    changeLastname = (req: express.Request , res: express.Response) =>{
        let lastname = req.body.lastname;
        let username = req.body.username;
        let userFromDB = UserModel.findOne({'username': username}, (err, resp)=>{
            if(err || resp == null){
                res.json({'message': 'User not found!'});
            }
            else{
                resp.lastname = lastname;
                resp.save();
                res.json({'message': 'Lastname changed!'});
            }
        })
    }
    changeUsername = (req: express.Request , res: express.Response) =>{
        let usernameNew = req.body.usernameNew;
        let username = req.body.username;
        let userFromDB = UserModel.findOne({'username': usernameNew}, (err, resp)=>{
            if(err || resp == null){
                let userFromDB2 = UserModel.findOne({'username' : username}, (err, resp2)=>{
                    if(err || resp2 == null){
                        res.json({'message': 'User doesnt exist!'});
                    }
                    else{
                        resp2.username = usernameNew;
                        resp2.save();
                        res.json({'message': 'Username changed!'});
                    }
                })
            }
            else{
                res.json({'message': 'Username already exists!'});
            }
        })
    }
    changeEmail = (req: express.Request , res: express.Response) =>{
        let email = req.body.email;
        let username = req.body.username;
        let userFromDB = UserModel.findOne({'username': username}, (err, resp)=>{
            if(err || resp == null){
                res.json({'message': 'User not found!'});
            }
            else{
                resp.email = email;
                resp.save();
                res.json({'message': 'Email changed!'});
            }
        })
    }
    changePhonenumber = (req: express.Request , res: express.Response) =>{
        let phonenumber = req.body.phonenumber;
        let username = req.body.username;
        let userFromDB = UserModel.findOne({'username': username}, (err, resp)=>{
            if(err || resp == null){
                res.json({'message': 'User not found!'});
            }
            else{
                resp.phonenumber = phonenumber;
                resp.save();
                res.json({'message': 'Phonenumber changed!'});
            }
        })
    }

    changeProfilePic = (req: express.Request, res: express.Response) =>{
        let username = req.body.username;
        let userFromDB = UserModel.findOne({'username' : username}, (err, user)=>{
            if(err || user == null){
                res.json({'image_path' : 'Error'});
            }
            else{
                user.image_path = 'images/' + req.file.originalname.slice(0, -4)+'_'+req.body.username + '.' + fileExtension(req.file.originalname)
                user.save();
                res.json({'image_path' : req.file.originalname.slice(0, -4)+'_'+req.body.username + '.' + fileExtension(req.file.originalname)});
            }
        })

    }
    
}