import express from 'express'
import UserModel from '../models/user'
import UserCommentWorkshopModel from '../models/user_comment_workshop'
import UserLikedWorkshopModel from '../models/user_liked_workshop'
import UserWorkshopModel from '../models/user_workshop'
import WorkshopModel from '../models/workshop'
import UserChatModel from '../models/user_chat'
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
    
    deleteUser = (req: express.Request , res: express.Response) =>{
        let username  = req.body.username;
        UserModel.findOne({'username': username},(err, resp)=>{
            if(!err){
                resp.type_of_user = 3;
                resp.save();
                res.json({'message':'User deleted!'})
            }
            else{
                res.json({'message':'Error!'})
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
                        UserCommentWorkshopModel.updateMany({'username':username}, {$set:{'username':usernameNew}}, (err, resp)=>{});
                        UserLikedWorkshopModel.updateMany({'username':username}, {$set:{'username':usernameNew}}, (err, resp)=>{});
                        UserWorkshopModel.updateMany({'username':username}, {$set:{'username':usernameNew}}, (err, resp)=>{});
                        WorkshopModel.updateMany({'organizatorUsername':username}, {$set:{'organizatorUsername':usernameNew}}, (err, resp)=>{
                            UserChatModel.find((err,resp)=>{
                                if(!err){
                                    for(let chat of resp){
                                        for(let message of chat.messages){
                                            if(message.user == username){
                                                message.user = usernameNew;
                                            }
                                        }
                                        chat.save();
                                    }
                                    UserChatModel.updateMany({'username1' : username}, {$set : {'username1' : usernameNew}}, (err, resp)=>{});
                                    UserChatModel.updateMany({'username2' : username}, {$set : {'username2' : usernameNew}}, (err, resp)=>{});
                                    //change folders
                                    WorkshopModel.find((err, resp)=>{
                                        for(let workshop of resp){
                                            if(workshop.organizatorUsername == usernameNew){
                                                let oldfolderPath = workshop.workshopImage.split('/')[0] + '/' + workshop.workshopImage.split('/')[1];
                                                let newFolderPath = 'images/' + workshop.workshopName + workshop.workshopDate.toISOString().split('T')[0] + usernameNew;
                                                const fs = require('fs-extra');
                                                console.log(oldfolderPath, newFolderPath);
                                                
                                                fs.renameSync(oldfolderPath, newFolderPath);
                                               workshop.workshopImage = newFolderPath + '/' + workshop.workshopImage.split('/')[2];
                                               workshop.save();
                                            }
                                        }
                                    })
    
                                }
                                else{
                                    res.json({'message':'Error!'})
                                }
                            })
                            res.json({'message': 'Username changed!'});
                        })
                        
                    }
                })
            }
            else{
                res.json({'message': 'Username already exists!'});
            }
        })
    }

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
                    if(user.approved == 0){
                        res.json({'message': 'User not aproved for registration!'});
                    }
                    else{
                        res.json(user);
                    }
                    
                }
            }
        })

    }

    register = (req: express.Request , res: express.Response)=>{
            let fields = req.body;
            let is_user = fields.is_user;
            let username = fields.username;
            let approved = +req.body.approved;
            let userFromDB = UserModel.findOne({$or:[{'username' : username},{'email' : fields.email}]}, (err, userDB)=>{
                if(err || userDB){
                    const fsExtra = require('fs-extra')
                    if(fields.hasImage == '2'){
                        let picPath =  'images/' + req.file.originalname.slice(0, -4)+'_'+req.body.username + '.' + fileExtension(req.file.originalname)
                        fsExtra.rmSync(picPath);
                    }
                    
                    if(userDB.username == username){
                        res.json({'message': 'Username already exists'});
                    }
                    else{
                        res.json({'message': 'Email already used'});
                    }
                } 
                else{
                    let user = new UserModel({
                        firstname : fields.firstname,
                        lastname : fields.lastname,
                        username : fields.username,
                        password : fields.password,
                        phonenumber : fields.number,
                        email : fields.email,
                        type_of_user : is_user == '1'?0:1,
                        approved : approved
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
        const fsExtra = require('fs-extra')
        let userFromDB = UserModel.findOne({'username' : username}, (err, user)=>{
            if(err || user == null){
                res.json({'image_path' : 'Error'});
            }
            else{
                fsExtra.rmSync(user.image_path);
                user.image_path = 'images/' + req.file.originalname.slice(0, -4)+'_'+req.body.username + '.' + fileExtension(req.file.originalname)
                user.save();
                res.json({'image_path' : 'images/' + req.file.originalname.slice(0, -4)+'_'+req.body.username + '.' + fileExtension(req.file.originalname)});
            }
        })

    }
    getPicturePath = (req: express.Request, res: express.Response) =>{
        let username = req.body.username;
        UserModel.findOne({'username':username},(err,resp)=>{
            if(!err){
                res.json({'path': resp.image_path})
            }
            else{
                res.json({'path': 'Error!'})
            }
        })

    }
    getAllUsers = (req: express.Request, res: express.Response) =>{

        UserModel.find({$and: [{$or : [{'type_of_user' : 0},{'type_of_user' : 1},{'type_of_user' : 2}]}, {'approved' : 1}]},(err,resp)=>{
            if(!err){
                console.log(resp)
                res.json(resp);
            }
            else{
                res.json({'message':'Error!'})
            }
        })


    }
    getAllUsersRequest =(req: express.Request, res: express.Response) =>{

        UserModel.find({$and: [{$or : [{'type_of_user' : 0},{'type_of_user' : 1},{'type_of_user' : 2}]}, {'approved' : 0}]},(err,resp)=>{
            if(!err){
                res.json(resp);
            }
            else{
                res.json({'message':'Error!'})
            }
        })


    }
    acceptRegistrationRequest = (req: express.Request, res: express.Response) =>{
        let username = req.body.username;
        console.log(username)
        UserModel.findOne({'username':username},(err, resp)=>{
            if(!err){
                resp.approved = 1;
                resp.save();
                res.json({'message': 'Success!'});
            }
            else{
                res.json({'message': 'Error!'});
            }
        })

    }
}