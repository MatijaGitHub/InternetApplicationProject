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
const user_1 = __importDefault(require("../models/user"));
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
                        if (files != null) {
                            for (let i = 0; i < files.length; i++) {
                                files[i] = pathToFile + '/' + files[i];
                            }
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
            const fsExtra = require("fs-extra");
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
                        console.log(req.body.imageName);
                        resp.workshopImage = newPath + '/' + req.body.imageName;
                        if (oldPathToDelete != newPath) {
                            fsExtra.copySync(oldPathToDelete, newPath);
                            fsExtra.rmdirSync(oldPathToDelete, { recursive: true });
                        }
                    }
                    let newImagePath = "";
                    let folder = resp.workshopImage.split('/')[0] + '/' + resp.workshopImage.split('/')[1];
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
                    fsExtra.readdir(folder, (err, files) => {
                        //console.log(files);
                        for (let file of files) {
                            if (file != 'gallery') {
                                newImagePath = folder + '/' + file;
                            }
                        }
                        resp.workshopImage = newImagePath;
                        resp.save();
                        res.json({ 'message': 'Success!' });
                    });
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.suggestWorkshop = (req, res) => {
            let name = req.body.workshopName;
            let jsonMainPic = req.body.main_picture_path;
            let galleryImgPaths = req.body.gallery_pics_paths;
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
            let dir = 'images/' + name.replace(' ', '_') + date.split('T')[0] + username.replace(' ', '_');
            const fs = require('fs-extra');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                fs.mkdirSync(dir + '/gallery');
            }
            let mainImagePath = "";
            if (jsonMainPic != "") {
                let from = 'images/' + jsonMainPic;
                let to = dir + '/' + from.split('/')[2];
                mainImagePath = to;
                fs.copy(from, to, (err) => {
                    if (!err) {
                        console.log(from, to, 'success!');
                    }
                });
            }
            if (galleryImgPaths != null) {
                for (let galleryPic of galleryImgPaths) {
                    let from = 'images/' + galleryPic;
                    let to = dir + '/gallery/' + from.split('/')[3];
                    fs.copy(from, to, (err) => {
                        if (!err) {
                            console.log(from, to, 'success!');
                        }
                    });
                }
            }
            fs.readdir(dir, (err, files) => {
                //console.log(files);
                for (let file of files) {
                    if (file != 'gallery') {
                        mainImagePath = dir + '/' + file;
                    }
                }
                let suggestedWorkshop = new workshop_1.default({
                    workshopName: name,
                    workshopDate: dateToDb,
                    workshopImage: mainImagePath,
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
            });
        };
        this.getUnaprovedWorkshops = (req, res) => {
            let returnWorkshops = [];
            workshop_1.default.find({ 'status': 2 }, (err, resp) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    for (let workshop of resp) {
                        let addWorkshop = true;
                        let organizator = workshop.organizatorUsername;
                        let user = yield user_1.default.findOne({ 'username': organizator });
                        if (user.type_of_user == 0) {
                            let resp2 = yield user_workshop_1.default.find({ 'username': organizator });
                            for (let applied of resp2) {
                                let _id = new bson_1.ObjectID(applied.workshopId);
                                let workshop = yield workshop_1.default.findOne({ '_id': _id });
                                if (workshop.status == 0) {
                                    addWorkshop = false;
                                }
                            }
                        }
                        if (addWorkshop) {
                            returnWorkshops.push(workshop);
                        }
                    }
                    res.json(returnWorkshops);
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            }));
        };
        this.getApplications = (req, res) => {
            let wid = req.body.workshopId;
            user_workshop_1.default.find({ 'workshopId': wid, 'accepted': 0 }, (err, resp) => {
                if (!err) {
                    res.json(resp);
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.acceptWorkshop = (req, res) => {
            let wid = new bson_1.ObjectID(req.body.workshopId);
            workshop_1.default.findOne({ '_id': wid }, (err, resp) => {
                if (!err) {
                    resp.status = 0;
                    resp.save();
                    res.json({ 'message': "Success!" });
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.rejectWorkshop = (req, res) => {
            let wid = new bson_1.ObjectID(req.body.workshopId);
            const fsExtra = require('fs-extra');
            workshop_1.default.findOneAndDelete({ '_id': wid }, (err, resp) => {
                if (!err) {
                    let folderPath = resp.workshopImage.split('/')[0] + '/' + resp.workshopImage.split('/')[1];
                    fsExtra.rmdirSync(folderPath, { recursive: true });
                    res.json({ 'message': "Success!" });
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.acceptApplication = (req, res) => {
            let wid = req.body.workshopId;
            let username = req.body.username;
            user_workshop_1.default.findOneAndUpdate({ 'username': username, 'workshopId': wid }, { 'accepted': 1 }, (err, resp) => {
                if (!err) {
                    res.json({ 'message': 'Success!' });
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.denyApplication = (req, res) => {
            let wid = req.body.workshopId;
            let username = req.body.username;
            const fsExtra = require('fs-extra');
            user_workshop_1.default.findOneAndDelete({ 'username': username, 'workshopId': wid }, (err, resp) => {
                if (!err) {
                    res.json({ 'message': 'Success!' });
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            });
        };
        this.cancelWorkshop = (req, res) => {
            let wid = req.body.workshopId;
            let _id = new bson_1.ObjectID(wid);
            let workshopName = req.body.workshopName;
            user_workshop_1.default.find({ 'workshopId': wid }, (err, resp) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    for (let user of resp) {
                        console.log(user);
                        let userFromDB = yield user_1.default.findOne({ 'username': user.username });
                        let emailTo = userFromDB.email;
                        var mailOptions = {
                            from: 'nullpointerexceptionpsi@outlook.com',
                            to: emailTo,
                            subject: 'Event cancelled!',
                            text: "Event " + workshopName + " cancelled!"
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log("Email sent");
                                    yield user_workshop_1.default.deleteOne({ 'workshopId': wid, 'username': user.username });
                                }
                            });
                        });
                    }
                    workshop_1.default.findOneAndUpdate({ '_id': _id }, { 'status': 1 }, (err, resp) => {
                        if (!err) {
                            res.json({ 'message': resp });
                        }
                        else {
                            res.json({ 'message': 'Error!' });
                        }
                    });
                }
                else {
                    res.json({ 'message': 'Error!' });
                }
            }));
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map