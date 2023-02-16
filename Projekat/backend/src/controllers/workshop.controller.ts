import e, { Request, Response } from 'express';
import express from 'express'
import WorkshopModel from '../models/workshop'
import UserWorkshopModel from '../models/user_workshop'
import UserLikedWorkshopModel from '../models/user_liked_workshop'
import UserCommentWorkshopModel from '../models/user_comment_workshop'
import UserChatModel from '../models/user_chat'
import mongoose from 'mongoose';
import { ObjectID } from 'bson';
import { json } from 'stream/consumers';
import { upload } from '../routers/user.routes';
import { uploadGallery } from '../routers/workshop.routes';

var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'nullpointerexceptionpsi@outlook.com',
        pass: 'bobancoban123'
    }
});

export class WorkshopController{
    getAllWorkshops = (req: express.Request, res: express.Response) =>{
        let workshops = WorkshopModel.find({'status': 0},(err, resp)=>{
            if(!err){
                res.json(resp);
            }
        })
    }
    getWorkshopsByFilter = (req: express.Request, res: express.Response)=>{
        let name = req.body.name;
        let place = req.body.place;
        if(name == ""){
            let workshops = WorkshopModel.find({'workshopPlace': {'$regex':new RegExp("^" + place.toLowerCase(), "i")},'status' : 0}, (err, resp)=>{
                if(!err){
                    res.json(resp);
                }
            })
        }
        else if(place == ""){
            let workshops = WorkshopModel.find({'workshopName': {'$regex':new RegExp("^" + name.toLowerCase(), "i")},'status' : 0}, (err, resp)=>{
                if(!err){
                    res.json(resp);
                }
            })
        }
        else{
            let workshops = WorkshopModel.find({'workshopName': {'$regex':new RegExp("^" + name.toLowerCase(), "i")}, 'workshopPlace': {'$regex':new RegExp("^" + place.toLowerCase(), "i")},'status' : 0}, (err, resp)=>{
                if(!err){
                    res.json(resp);
                }
            })
        }
    }
    getTop5Workshops = (req: express.Request, res: express.Response)=>{
        let workshops = WorkshopModel.find({'status' : 0},(err, resp)=>{
            if(!err){
                res.json(resp);
            }
        }).sort({'numOfLikes': -1}).limit(5)

    }
    getWorkshopById = (req : express.Request, res: express.Response)=>{
        let id = req.body.id;
        let idSearch = new ObjectID(id);
        let workshop = WorkshopModel.findOne({'_id': idSearch},(err, resp)=>{
            if(!err){
                res.json(resp);
            }
            else{
                res.json({'message' : 'Error!'});
            }
        })
    }
    getOrganizatorWorkshops = (req : express.Request, res: express.Response)=>{
        let username = req.body.username;
        let workshop = WorkshopModel.find({'organizatorUsername': username},(err,resp)=>{
            if(!err){
                res.json(resp);
            }
            else{
                res.json({'message' : 'Error!'});
            }
        })
        
    }
    getWorkshopsByParticipation = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let participation_flag = req.body.participated;
        let response = UserWorkshopModel.find({'username' : username}, async (err, resp)=>{
        
            let workshops = [];
            if(!err){
                for(let i of resp){
                    let workshop = await WorkshopModel.findOne({'_id' : i.workshopId})
                    if(workshop && workshop.status == participation_flag){
                        workshops.push(workshop);
                     
                    }
                }
                res.json(workshops);
            }
            else{
                res.json({'message': 'Error!'})
            }
        })
    }
    getChatsByWorkshop = (req: express.Request, res: express.Response)=>{
        let workshopId = req.body.workshopId;

        let response = UserChatModel.find({'workshopId':workshopId},(err,resp)=>{
            if(!err){
                res.json(resp);
            }
            else{
                res.json({'message': 'Error!'})
            }
        })


    }
    getWorkshopsByLikes = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        let response = UserLikedWorkshopModel.find({'username' : username}, async (err, resp)=>{
      
            let workshops = [];
            if(!err){
                for(let i of resp){
                  
                    let workshop = await WorkshopModel.findOne({'_id' : i.workshopId})
                    if(workshop){
                        workshops.push(workshop);
                     
                    }
                }
                res.json(workshops);
            }
            else{
                res.json({'message': 'Error!'})
            }
        })
    }
    getWorkshopCommentsByUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let response = UserCommentWorkshopModel.find({'username' : username}, async (err, resp)=>{
            
            let workshopsComments = [];
            if(!err){
                for(let i of resp){
                    let workshop = await WorkshopModel.findOne({'_id' : i.workshopId})
                    if(workshop){
                        
                        let workshopComment = {
                            workshopId : workshop._id.toString(),
                            workshopName : workshop.workshopName,
                            comment : i.comment
                        }
                        workshopsComments.push(workshopComment);
                     
                    }
                }
                res.json(workshopsComments);
            }
            else{
                res.json({'message': 'Error!'})
            }
        })
    }
    unlikeWorkshop = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        let _id = new ObjectID(workshopId);
        UserLikedWorkshopModel.findOneAndDelete({'workshopId' : workshopId, 'username' : username}, (err, resp)=>{
            if(resp != null){
                WorkshopModel.findOneAndUpdate({'_id' : _id}, {$inc : {'numOfLikes': -1}}, (err, resp)=>{
                    if(!err){
                        res.json({'message' : 'Uspeh!'});
                    }
                    else{
                        res.json({'message' : 'Error!'});
                    }
                })
            }
            else{
                res.json({'message' : 'Error!'});
            }
            
        });
        
    }
    editComment = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        let comment = req.body.comment;
        UserCommentWorkshopModel.findOneAndUpdate({'workshopId':workshopId, 'username' : username},
            {$set:{'comment':comment}}, (err, resp)=>{
                
                if(!err){
                    res.json({'message':'Success!'});
                }
                else{
                    res.json({'message':'Error'});
                }
            })
    }
    deleteComment = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        UserCommentWorkshopModel.findOneAndDelete({'workshopId':workshopId, 'username' : username},(err, resp)=>{
            if(!err){
                res.json({'message':'Success!'});
            }
            else{
                res.json({'message':'Error'});
            }
        })
    }
    cancelParticipation = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        let _id = new ObjectID(workshopId)
        WorkshopModel.findOne({'_id' : _id}, (err, r)=>{
            let nowDate =new Date()
            let workshopDate = new Date(r.workshopDate)
            var hours = Math.abs(workshopDate.getTime() - nowDate.getTime()) / (60*60*1000);
            if(hours >= 12){
                UserWorkshopModel.findOneAndDelete({'workshopId':workshopId, 'username' : username},(err,resp)=>{
                    if(!err){
                        r.freeSpaces+=1;
                        for(let user of r.waitList){
                            console.log(user)
                            var mailOptions = {
                                from: 'nullpointerexceptionpsi@outlook.com',
                                to: user,
                                subject: 'Freed space',
                                text: "Free spaces available for workshop " + r.workshopName + "."
                            };
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error){
                                    console.log(error);
                                    
                                } else {
                                    console.log("Email sent");
                                    
                                }
                            }); 
                        }
                        r.waitList = []
                        r.save();
                        res.json({'message':'Success!'});
                    }
                    else{
                        res.json({'message':'Error'});
                    }
                })
            }
            else{
                res.json({'message' : 'Less than 12 hours left!'})
            }
        })
        
    }
    getGalleryPics = (req: express.Request, res: express.Response)=>{
        let wid = req.body.workshopId;
        let _id = new ObjectID(wid);
        WorkshopModel.findOne({'_id': _id}, (err, resp)=>{
            if(!err){
                let pathToFile = resp.workshopName.replace(' ', '_') + resp.workshopDate.toISOString().split('T')[0] + resp.organizatorUsername.replace(' ', '_') + '/gallery';
                
             
                const testFolder = 'images/' + pathToFile;
                const fs = require('fs');
        
                fs.readdir(testFolder, (err, files) => {
                 
                    for(let i = 0; i < files.length; i++){
                        files[i] = pathToFile + '/' + files[i];
                    }
                    if(!err){
                        res.json(files);
                    }
                    else{
                        res.json(err);
                    }
                
                });
            }
        })
        
    }
    isApplied = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        UserWorkshopModel.findOne({'workshopId': workshopId, 'username': username},(err, resp2)=>{
            if(resp2 == null){
                res.json({'result' : 0});
            }
            else{
                res.json({'result': 1});
            }
        })
    }
    applyForWorkShop = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        let _id = new ObjectID(workshopId);
        WorkshopModel.findOne({'_id' : _id} , (err, resp)=>{
            UserWorkshopModel.findOne({'workshopId': workshopId, 'username': username},(err, resp2)=>{
                if(resp2 == null){
                    if(resp.status == 0 && resp.freeSpaces > 0){
                        resp.freeSpaces-=1;
                        resp.save();
                        let aplliance = new UserWorkshopModel({
                            workshopId : workshopId,
                            username : username,
                            accepted : 0
                        })
                        aplliance.save();
                        res.json({'message' : 'Applied!'});
                    }
                    else{
                        res.json({'message' : 'Workshop finished!'});
                    }
                    
                }
            
                else{
                    res.json({'message' : 'Already applied!'})
                }
                
            })
           
        })
    }
    waitForWorkshop = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        let email = req.body.email;
        let _id = new ObjectID(workshopId);
        UserWorkshopModel.findOne({'workshopId': workshopId, 'username':username}, (err, resp)=>{
            if(resp == null){
                
                WorkshopModel.findOne({'_id':_id}, (err,resp2)=>{
                    
                    if(resp2!=null && resp2.status == 0){
                        if(!resp2.waitList.includes(email)){
                            resp2.waitList.push(email);
                            resp2.save();
                            res.json({'message': 'Added to wait list'});
                        }
                        else{
                            res.json({'message' : 'Already in wait list!'}) 
                        }
                       
                    }
                    else{
                        res.json({'message' : 'Workshop ended!'}) 
                    }
                })
            }
            else{
                res.json({'message' : 'Already applied!'})
            }
        })
    }

    getChat = (req: express.Request, res: express.Response)=>{
        
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        let _id = new ObjectID(workshopId);
        WorkshopModel.findOne({'_id' : _id}, (err, resp)=>{
            if(!err && resp!= null){
                let organizatorUsername = resp.organizatorUsername;
                UserChatModel.findOne({'username1' : username, 'username2' : organizatorUsername, 'workshopId' : workshopId}, (err2, resp2)=>{
                    if(resp2 == null){
                        let userChat = new UserChatModel({
                            username1: username,
                            username2: organizatorUsername,
                            workshopId: workshopId,
                            messages : []
                        })
                        userChat.save();
                        res.json(userChat);
                    }
                    else{
                        res.json(resp2);
                    }
                })
            }
            else{
                res.json({'message' : 'Workshop not found!'})
            }
        })
    }
    postMessageToChat = (req: express.Request, res: express.Response)=>{
        
        let usernameOrganizer = req.body.usernameOrganizer;
        let usernameUser = req.body.usernameUser;
        let usernameSender = req.body.usernameSender;
        let workshopId = req.body.workshopId;
        let message = req.body.message;
        let messageToChat = {
            user : usernameSender,
            message : message
        }

        UserChatModel.findOne({'username1' : usernameUser , 'username2': usernameOrganizer, 'workshopId' : workshopId} ,(err, resp)=>{
            resp.messages.push(messageToChat);
            resp.save();
            if(!err && resp!=null){
                res.json({'message' : 'Message sent!'})
            }
            else{
                res.json({'message' : 'Message not sent!'})
            }
        })
    }

    likeWorkshop = (req : express.Request, res : express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        let _id = new ObjectID(workshopId);
        let like = new UserLikedWorkshopModel({
            username: username,
            workshopId: workshopId
        })
        UserLikedWorkshopModel.findOne({'username': username, 'workshopId' : workshopId}, (err1, resp1)=>{
            if(resp1 == null){
                UserWorkshopModel.find({'username' : username}, (err2, resp2)=>{
                    
                    if(resp2!=null){
                        WorkshopModel.findOne({'_id' : _id}, async (err, resp)=>{
                            let message = 'Didnt participate!';
                            for(let workshop of resp2){
                                let idF = new ObjectID(workshop.workshopId)
                                let workshopBase = await WorkshopModel.findOne({'_id' : idF})
                
                                if(workshopBase.workshopName == resp.workshopName && workshopBase.status == 1){
                                    like.save();
                                    resp.numOfLikes+=1;
                                    resp.save();
                                    message = "liked";
                                    break;
                                }
                            }
                            res.json({'message' : message})
                        })
                      
                    }else{
                        res.json({'message' : 'User didnt participate'});
                    }
                    
                })
                
            }
            else{
                res.json({'message' : 'Already liked!'});
            }
        })
       
    }
    isLiked = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        UserLikedWorkshopModel.findOne({'username':username, 'workshopId' : workshopId}, (err, resp)=>{
            res.json({'result' : resp != null});
        })
    }
    addComment = (req: express.Request, res:express.Response)=>{
        let username = req.body.username;
        let workshopId = req.body.workshopId;
        let comment = req.body.comment;
        let _id = new ObjectID(workshopId);
        WorkshopModel.findOne({'_id' : _id}, (err, resp)=>{
            if(resp!= null){
                let commentToDB = new UserCommentWorkshopModel({
                    username: username,
                    workshopId: workshopId,
                    comment : comment
                })
                commentToDB.save();
                res.json({'message' : 'Comment posted!'});
            }
            else{
                res.json({'message' : 'Comment not posted!'});
            }
        })
    }
    getAllComments = (req: express.Request, res:express.Response)=>{
        let workshopId = req.body.workshopId;
        UserCommentWorkshopModel.find({workshopId : workshopId}, (err, resp)=>{
            if(!err){
                res.json(resp);
            }
            else{
                res.json(err);
            }
        })


    }
    deleteGalleryImg = (req: express.Request, res:express.Response)=>{
        let workshopId = req.body.workshopId;
        let galleryPicture = req.body.galleryPicture;
        let wid = new ObjectID(workshopId);
        let workshop = WorkshopModel.findOne({'_id':wid}, (err,resp)=>{
            if(!err){
                let folderPath = resp.workshopImage.split('/')[0] + '/' +  galleryPicture;
                console.log(folderPath)
                const fsExtra = require("fs-extra");
                fsExtra.remove(folderPath, err => {
                    if (err) return console.error(err)
                    console.log('success!')
                  })
                  res.json({'message' : 'Success!'});
            }
            else{
                res.json({'message' : 'Error!'})
            }
        })
        
    
    }
    editWorkshop = (req: express.Request, res:express.Response)=>{
        let workshopId = req.body.workshopId;
        let name = req.body.workshopName;
        let date = req.body.date;
        let dateToDb = null;
        if(date != 'null'){
            dateToDb = new Date(date);
        }
    
        let shortDesc = req.body.shortDesc;
        let longDesc = req.body.longDesc;
        let lat = req.body.lat;
        let long = req.body.long;
        let place = req.body.place;
        let username = req.body.username;
        let _id = new ObjectID(workshopId);
  
        WorkshopModel.findOne({'_id' : _id}, (err, resp)=>{
            if(!err){
                let oldDate = resp.workshopDate;
                if(dateToDb != null){
                    resp.workshopDate = dateToDb;
                }
                if(name != ''){
                    let oldPathToDelete = 'images/' +  resp.workshopName.replace(' ', '_') + oldDate.toISOString().split('T')[0] + resp.organizatorUsername.replace(' ', '_');
                    let oldPath = 'images/' +  resp.workshopName.replace(' ', '_') + resp.workshopDate.toISOString().split('T')[0] + resp.organizatorUsername.replace(' ', '_');
                    resp.workshopName = name;
                    let newPath = 'images/' +  name.replace(' ', '_') + resp.workshopDate.toISOString().split('T')[0] + resp.organizatorUsername.replace(' ', '_');
                    
                    resp.workshopImage = newPath + '/' +  req.body.imageName;
                    const fsExtra = require("fs-extra");
                    if(oldPathToDelete!=newPath){
                        fsExtra.copySync(oldPathToDelete, newPath);
                        fsExtra.rmdirSync(oldPathToDelete, { recursive: true });
                    }
                   
                   
                    
                }
                
                if(shortDesc != ''){
                    resp.workshopDesc = shortDesc;
                }
                if(lat != '' && long != ''){
                    resp.lat = +lat;
                    resp.long = +long;
                }
                if(place != ''){
                    resp.workshopPlace = place;
                }
                resp.save();
                res.json({'message':'Success!'})
            }
            else{
                res.json({'message':'Error!'})
            }
           

        })

    }
    suggestWorkshop = (req: express.Request, res:express.Response)=>{
        let name = req.body.workshopName;
        let date = req.body.date;
        let dateToDb = new Date(date);
        let shortDesc = req.body.shortDesc;
        let longDesc = req.body.longDesc;
        let lat = req.body.lat;
        let long = req.body.long;
        let place = req.body.place;
        let statusToDb = 2;
        let numOfSpaces = +req.body.numOfSpaces;
        let username = req.body.username;
        let suggestedWorkshop = new WorkshopModel({
            workshopName: name,
            workshopDate: dateToDb,
            workshopImage: "",
            workshopPlace: place,
            workshopDesc: shortDesc,
            workshopDescLong: longDesc,
            numOfLikes: 0,
            freeSpaces: numOfSpaces,
            status: statusToDb,
            lat: lat,
            long: long,
            organizatorUsername:username,
            waitList:[]
        })
        suggestedWorkshop.save();
   
        res.json(suggestedWorkshop);

    }

}