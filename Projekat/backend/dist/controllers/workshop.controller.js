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
const user_chat_1 = __importDefault(require("../models/user_chat"));
const bson_1 = require("bson");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'nullpointerexceptionpsi@outlook.com',
        pass: 'bobancoban123'
    }
});
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
        this.getWorkshopById = (req, res) => {
            let id = req.body.id;
            let idSearch = new bson_1.ObjectID(id);
            let workshop = workshop_1.default.findOne({ '_id': idSearch }, (err, resp) => {
                if (!err) {
                    res.json(resp);
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.getOrganizatorWorkshops = (req, res) => {
            let username = req.body.username;
            let workshop = workshop_1.default.find({ 'organizatorUsername': username }, (err, resp) => {
                if (!err) {
                    res.json(resp);
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
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
        this.getChatsByWorkshop = (req, res) => {
            let workshopId = req.body.workshopId;
            let response = user_chat_1.default.find({ 'workshopId': workshopId }, (err, resp) => {
                if (!err) {
                    res.json(resp);
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
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
                            r.freeSpaces += 1;
                            for (let user of r.waitList) {
                                console.log(user);
                                var mailOptions = {
                                    from: 'nullpointerexceptionpsi@outlook.com',
                                    to: user,
                                    subject: 'Freed space',
                                    text: "Free spaces available for workshop " + r.workshopName + "."
                                };
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        console.log("Email sent");
                                    }
                                });
                            }
                            r.waitList = [];
                            r.save();
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
        this.getGalleryPics = (req, res) => {
            let wid = req.body.workshopId;
            let _id = new bson_1.ObjectID(wid);
            workshop_1.default.findOne({ '_id': _id }, (err, resp) => {
                if (!err) {
                    let pathToFile = resp.workshopName.replace(' ', '_') + resp.workshopDate.toISOString().split('T')[0] + resp.organizatorUsername.replace(' ', '_') + '/gallery';
                    const testFolder = 'images/' + pathToFile;
                    const fs = require('fs');
                    fs.readdir(testFolder, (err, files) => {
                        for (let i = 0; i < files.length; i++) {
                            files[i] = pathToFile + '/' + files[i];
                        }
                        if (!err) {
                            res.json(files);
                        }
                        else {
                            res.json(err);
                        }
                    });
                }
            });
        };
        this.isApplied = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            user_workshop_1.default.findOne({ 'workshopId': workshopId, 'username': username }, (err, resp2) => {
                if (resp2 == null) {
                    res.json({ 'result': 0 });
                }
                else {
                    res.json({ 'result': 1 });
                }
            });
        };
        this.applyForWorkShop = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            let _id = new bson_1.ObjectID(workshopId);
            workshop_1.default.findOne({ '_id': _id }, (err, resp) => {
                user_workshop_1.default.findOne({ 'workshopId': workshopId, 'username': username }, (err, resp2) => {
                    if (resp2 == null) {
                        if (resp.status == 0 && resp.freeSpaces > 0) {
                            resp.freeSpaces -= 1;
                            resp.save();
                            let aplliance = new user_workshop_1.default({
                                workshopId: workshopId,
                                username: username,
                                accepted: 0
                            });
                            aplliance.save();
                            res.json({ 'message': 'Applied!' });
                        }
                        else {
                            res.json({ 'message': 'Workshop finished!' });
                        }
                    }
                    else {
                        res.json({ 'message': 'Already applied!' });
                    }
                });
            });
        };
        this.waitForWorkshop = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            let email = req.body.email;
            let _id = new bson_1.ObjectID(workshopId);
            user_workshop_1.default.findOne({ 'workshopId': workshopId, 'username': username }, (err, resp) => {
                if (resp == null) {
                    workshop_1.default.findOne({ '_id': _id }, (err, resp2) => {
                        if (resp2 != null && resp2.status == 0) {
                            if (!resp2.waitList.includes(email)) {
                                resp2.waitList.push(email);
                                resp2.save();
                                res.json({ 'message': 'Added to wait list' });
                            }
                            else {
                                res.json({ 'message': 'Already in wait list!' });
                            }
                        }
                        else {
                            res.json({ 'message': 'Workshop ended!' });
                        }
                    });
                }
                else {
                    res.json({ 'message': 'Already applied!' });
                }
            });
        };
        this.getChat = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            let _id = new bson_1.ObjectID(workshopId);
            workshop_1.default.findOne({ '_id': _id }, (err, resp) => {
                if (!err && resp != null) {
                    let organizatorUsername = resp.organizatorUsername;
                    user_chat_1.default.findOne({ 'username1': username, 'username2': organizatorUsername, 'workshopId': workshopId }, (err2, resp2) => {
                        if (resp2 == null) {
                            let userChat = new user_chat_1.default({
                                username1: username,
                                username2: organizatorUsername,
                                workshopId: workshopId,
                                messages: []
                            });
                            userChat.save();
                            res.json(userChat);
                        }
                        else {
                            res.json(resp2);
                        }
                    });
                }
                else {
                    res.json({ 'message': 'Workshop not found!' });
                }
            });
        };
        this.postMessageToChat = (req, res) => {
            let usernameOrganizer = req.body.usernameOrganizer;
            let usernameUser = req.body.usernameUser;
            let usernameSender = req.body.usernameSender;
            let workshopId = req.body.workshopId;
            let message = req.body.message;
            let messageToChat = {
                user: usernameSender,
                message: message
            };
            user_chat_1.default.findOne({ 'username1': usernameUser, 'username2': usernameOrganizer, 'workshopId': workshopId }, (err, resp) => {
                resp.messages.push(messageToChat);
                resp.save();
                if (!err && resp != null) {
                    res.json({ 'message': 'Message sent!' });
                }
                else {
                    res.json({ 'message': 'Message not sent!' });
                }
            });
        };
        this.likeWorkshop = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            let _id = new bson_1.ObjectID(workshopId);
            let like = new user_liked_workshop_1.default({
                username: username,
                workshopId: workshopId
            });
            user_liked_workshop_1.default.findOne({ 'username': username, 'workshopId': workshopId }, (err1, resp1) => {
                if (resp1 == null) {
                    user_workshop_1.default.find({ 'username': username }, (err2, resp2) => {
                        if (resp2 != null) {
                            workshop_1.default.findOne({ '_id': _id }, (err, resp) => __awaiter(this, void 0, void 0, function* () {
                                let message = 'Didnt participate!';
                                for (let workshop of resp2) {
                                    let idF = new bson_1.ObjectID(workshop.workshopId);
                                    let workshopBase = yield workshop_1.default.findOne({ '_id': idF });
                                    if (workshopBase.workshopName == resp.workshopName && workshopBase.status == 1) {
                                        like.save();
                                        resp.numOfLikes += 1;
                                        resp.save();
                                        message = "liked";
                                        break;
                                    }
                                }
                                res.json({ 'message': message });
                            }));
                        }
                        else {
                            res.json({ 'message': 'User didnt participate' });
                        }
                    });
                }
                else {
                    res.json({ 'message': 'Already liked!' });
                }
            });
        };
        this.isLiked = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            user_liked_workshop_1.default.findOne({ 'username': username, 'workshopId': workshopId }, (err, resp) => {
                res.json({ 'result': resp != null });
            });
        };
        this.addComment = (req, res) => {
            let username = req.body.username;
            let workshopId = req.body.workshopId;
            let comment = req.body.comment;
            let _id = new bson_1.ObjectID(workshopId);
            workshop_1.default.findOne({ '_id': _id }, (err, resp) => {
                if (resp != null) {
                    let commentToDB = new user_comment_workshop_1.default({
                        username: username,
                        workshopId: workshopId,
                        comment: comment
                    });
                    commentToDB.save();
                    res.json({ 'message': 'Comment posted!' });
                }
                else {
                    res.json({ 'message': 'Comment not posted!' });
                }
            });
        };
        this.getAllComments = (req, res) => {
            let workshopId = req.body.workshopId;
            user_comment_workshop_1.default.find({ workshopId: workshopId }, (err, resp) => {
                if (!err) {
                    res.json(resp);
                }
                else {
                    res.json(err);
                }
            });
        };
        this.deleteGalleryImg = (req, res) => {
            let workshopId = req.body.workshopId;
            let galleryPicture = req.body.galleryPicture;
            let wid = new bson_1.ObjectID(workshopId);
            let workshop = workshop_1.default.findOne({ '_id': wid }, (err, resp) => {
                if (!err) {
                    let folderPath = resp.workshopImage.split('/')[0] + '/' + galleryPicture;
                    console.log(folderPath);
                    const fsExtra = require("fs-extra");
                    fsExtra.remove(folderPath, err => {
                        if (err)
                            return console.error(err);
                        console.log('success!');
                    });
                    res.json({ 'message': 'Success!' });
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.editWorkshop = (req, res) => {
            let workshopId = req.body.workshopId;
            let name = req.body.workshopName;
            let date = req.body.date;
            let dateToDb = null;
            if (date != 'null') {
                dateToDb = new Date(date);
            }
            let shortDesc = req.body.shortDesc;
            let longDesc = req.body.longDesc;
            let lat = req.body.lat;
            let long = req.body.long;
            let place = req.body.place;
            let username = req.body.username;
            let _id = new bson_1.ObjectID(workshopId);
            workshop_1.default.findOne({ '_id': _id }, (err, resp) => {
                if (!err) {
                    let oldDate = resp.workshopDate;
                    if (dateToDb != null) {
                        resp.workshopDate = dateToDb;
                    }
                    if (name != '') {
                        let oldPathToDelete = 'images/' + resp.workshopName.replace(' ', '_') + oldDate.toISOString().split('T')[0] + resp.organizatorUsername.replace(' ', '_');
                        let oldPath = 'images/' + resp.workshopName.replace(' ', '_') + resp.workshopDate.toISOString().split('T')[0] + resp.organizatorUsername.replace(' ', '_');
                        resp.workshopName = name;
                        let newPath = 'images/' + name.replace(' ', '_') + resp.workshopDate.toISOString().split('T')[0] + resp.organizatorUsername.replace(' ', '_');
                        resp.workshopImage = newPath + '/' + req.body.imageName;
                        const fsExtra = require("fs-extra");
                        if (oldPathToDelete != newPath) {
                            fsExtra.copySync(oldPathToDelete, newPath);
                            fsExtra.rmdirSync(oldPathToDelete, { recursive: true });
                        }
                    }
                    if (shortDesc != '') {
                        resp.workshopDesc = shortDesc;
                    }
                    if (lat != '' && long != '') {
                        resp.lat = +lat;
                        resp.long = +long;
                    }
                    if (place != '') {
                        resp.workshopPlace = place;
                    }
                    resp.save();
                    res.json({ 'message': 'Success!' });
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.suggestWorkshop = (req, res) => {
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
            let suggestedWorkshop = new workshop_1.default({
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
                organizatorUsername: username,
                waitList: []
            });
            suggestedWorkshop.save();
            res.json(suggestedWorkshop);
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map