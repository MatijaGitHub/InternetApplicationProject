import e from 'express';
import express from 'express'
import WorkshopModel from '../models/workshop'
import UserWorkshopModel from '../models/user_workshop'
import UserLikedWorkshopModel from '../models/user_liked_workshop'
import UserCommentWorkshopModel from '../models/user_comment_workshop'
import mongoose from 'mongoose';
import { ObjectID } from 'bson';



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
}