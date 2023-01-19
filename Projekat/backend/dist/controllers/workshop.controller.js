"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const workshop_1 = __importDefault(require("../models/workshop"));
const user_workshop_1 = __importDefault(require("../models/user_workshop"));
const user_liked_workshop_1 = __importDefault(require("../models/user_liked_workshop"));
const user_comment_workshop_1 = __importDefault(require("../models/user_comment_workshop"));
const bson_1 = require("bson");
class WorkshopController {
    constructor() {
        this.getAllWorkshops = (req, res) => {
            let workshops = workshop_1.default.find({ 'status': 0 }, (err, resp) => {
                if (!err) {
                    res.json(resp);
                }
            });
        };
        this.getWorkshopsByFilter = (req, res) => {
            let name = req.body.name;
            let place = req.body.place;
            if (name == "") {
                let workshops = workshop_1.default.find({ 'workshopPlace': { '$regex': new RegExp("^" + place.toLowerCase(), "i") }, 'status': 0 }, (err, resp) => {
                    if (!err) {
                        res.json(resp);
                    }
                });
            }
            else if (place == "") {
                let workshops = workshop_1.default.find({ 'workshopName': { '$regex': new RegExp("^" + name.toLowerCase(), "i") }, 'status': 0 }, (err, resp) => {
                    if (!err) {
                        res.json(resp);
                    }
                });
            }
            else {
                let workshops = workshop_1.default.find({ 'workshopName': { '$regex': new RegExp("^" + name.toLowerCase(), "i") }, 'workshopPlace': { '$regex': new RegExp("^" + place.toLowerCase(), "i") }, 'status': 0 }, (err, resp) => {
                    if (!err) {
                        res.json(resp);
                    }
                });
            }
        };
        this.getTop5Workshops = (req, res) => {
            let workshops = workshop_1.default.find({ 'status': 0 }, (err, resp) => {
                if (!err) {
                    res.json(resp);
                }
            }).sort({ 'numOfLikes': -1 }).limit(5);
        };
        this.getWorkshopsByParticipation = (req, res) => {
            let username = req.body.username;
            let participation_flag = req.body.participated;
            let response = user_workshop_1.default.find({ 'username': username }, (err, resp) => __awaiter(this, void 0, void 0, function* () {
                let workshops = [];
                if (!err) {
                    for (let i of resp) {
                        let workshop = yield workshop_1.default.findOne({ '_id': i.workshopId });
                        if (workshop && workshop.status == participation_flag) {
                            workshops.push(workshop);
                        }
                    }
                    res.json(workshops);
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            }));
        };
        this.getWorkshopsByLikes = (req, res) => {
            let username = req.body.username;
            let response = user_liked_workshop_1.default.find({ 'username': username }, (err, resp) => __awaiter(this, void 0, void 0, function* () {
                let workshops = [];
                if (!err) {
                    for (let i of resp) {
                        let workshop = yield workshop_1.default.findOne({ '_id': i.workshopId });
                        if (workshop) {
                            workshops.push(workshop);
                        }
                    }
                    res.json(workshops);
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            }));
        };
        this.getWorkshopCommentsByUser = (req, res) => {
            let username = req.body.username;
            let response = user_comment_workshop_1.default.find({ 'username': username }, (err, resp) => __awaiter(this, void 0, void 0, function* () {
                let workshopsComments = [];
                if (!err) {
                    for (let i of resp) {
                        let workshop = yield workshop_1.default.findOne({ '_id': i.workshopId });
                        if (workshop) {
                            let workshopComment = {
                                workshopId: workshop._id.toString(),
                                workshopName: workshop.workshopName,
                                comment: i.comment
                            };
                            workshopsComments.push(workshopComment);
                        }
                    }
                    res.json(workshopsComments);
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            }));
        };
        this.unlikeWorkshop = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            let _id = new bson_1.ObjectID(workshopId);
            user_liked_workshop_1.default.findOneAndDelete({ 'workshopId': workshopId, 'username': username }, (err, resp) => {
                if (resp != null) {
                    workshop_1.default.findOneAndUpdate({ '_id': _id }, { $inc: { 'numOfLikes': -1 } }, (err, resp) => {
                        if (!err) {
                            res.json({ 'message': 'Uspeh!' });
                        }
                        else {
                            res.json({ 'message': 'Error!' });
                        }
                    });
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.editComment = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            let comment = req.body.comment;
            user_comment_workshop_1.default.findOneAndUpdate({ 'workshopId': workshopId, 'username': username }, { $set: { 'comment': comment } }, (err, resp) => {
                if (!err) {
                    res.json({ 'message': 'Success!' });
                }
                else {
                    res.json({ 'message': 'Error' });
                }
            });
        };
        this.deleteComment = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            user_comment_workshop_1.default.findOneAndDelete({ 'workshopId': workshopId, 'username': username }, (err, resp) => {
                if (!err) {
                    res.json({ 'message': 'Success!' });
                }
                else {
                    res.json({ 'message': 'Error' });
                }
            });
        };
        this.cancelParticipation = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            let _id = new bson_1.ObjectID(workshopId);
            workshop_1.default.findOne({ '_id': _id }, (err, r) => {
                let nowDate = new Date();
                let workshopDate = new Date(r.workshopDate);
                var hours = Math.abs(workshopDate.getTime() - nowDate.getTime()) / (60 * 60 * 1000);
                if (hours >= 12) {
                    user_workshop_1.default.findOneAndDelete({ 'workshopId': workshopId, 'username': username }, (err, resp) => {
                        if (!err) {
                            res.json({ 'message': 'Success!' });
                        }
                        else {
                            res.json({ 'message': 'Error' });
                        }
                    });
                }
                else {
                    res.json({ 'message': 'Less than 12 hours left!' });
                }
            });
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map