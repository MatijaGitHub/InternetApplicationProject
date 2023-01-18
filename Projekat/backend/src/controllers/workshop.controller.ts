import e from 'express';
import express from 'express'
import WorkshopModel from '../models/workshop'



export class WorkshopController{
    getAllWorkshops = (req: express.Request, res: express.Response) =>{
        let workshops = WorkshopModel.find((err, resp)=>{
            if(!err){
                res.json(resp);
            }
        })
    }
    getWorkshopsByFilter = (req: express.Request, res: express.Response)=>{
        let name = req.body.name;
        let place = req.body.place;
        if(name == ""){
            let workshops = WorkshopModel.find({'workshopPlace': {'$regex':new RegExp("^" + place.toLowerCase(), "i")}}, (err, resp)=>{
                if(!err){
                    res.json(resp);
                }
            })
        }
        else if(place == ""){
            let workshops = WorkshopModel.find({'workshopName': {'$regex':new RegExp("^" + name.toLowerCase(), "i")}}, (err, resp)=>{
                if(!err){
                    res.json(resp);
                }
            })
        }
        else{
            let workshops = WorkshopModel.find({'workshopName': {'$regex':new RegExp("^" + name.toLowerCase(), "i")}, 'workshopPlace': {'$regex':new RegExp("^" + place.toLowerCase(), "i")}}, (err, resp)=>{
                if(!err){
                    res.json(resp);
                }
            })
        }
    }
    getTop5Workshops = (req: express.Request, res: express.Response)=>{
        let workshops = WorkshopModel.find((err, resp)=>{
            if(!err){
                res.json(resp);
            }
        }).sort({'numOfLikes': -1}).limit(5)

    }
}