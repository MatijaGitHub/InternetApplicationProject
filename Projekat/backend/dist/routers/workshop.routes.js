"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadGallery = void 0;
const express_1 = __importDefault(require("express"));
const workshop_controller_1 = require("../controllers/workshop.controller");
const file_extension_1 = __importDefault(require("file-extension"));
const multer_1 = __importDefault(require("multer"));
var storageGallery = multer_1.default.diskStorage({
    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        const fs = require('fs');
        const path = require('path');
        const dir = 'images/' + req.body.oldWorkshopName.replace(' ', '_') + req.body.olddate + req.body.username.replace(' ', '_');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.mkdirSync(dir + '/gallery');
        }
        if (req.body.edit_main_picture == 'true' && file.fieldname == 'main_picture') {
            fs.readdir(dir, (err, files) => {
                if (!err) {
                    for (const file of files) {
                        let file_path_to_unlink = path.join(dir, file);
                        const fsExtra = require("fs-extra");
                        if (file != 'gallery') {
                            //fsExtra.rmdirSync(file_path_to_unlink, { recursive: true });
                            fsExtra.remove(file_path_to_unlink, err => {
                                if (err)
                                    return console.error(err);
                                console.log('success!');
                            });
                        }
                        // fs.unlink(file_path_to_unlink, (err)=>{
                        //     if (err) throw err;
                        // })
                    }
                }
            });
        }
        let gallery_dir = dir + '/gallery';
        if (req.body.edit_gallery_pictures == 'true' && file.fieldname == 'gallery_pics') {
            let numOfPics;
            fs.readdir(gallery_dir, (err, files) => {
                if (!err) {
                    numOfPics = files.length;
                    if (numOfPics >= 5) {
                        return cb(new Error("Image limit exceeded!"), null);
                    }
                }
            });
        }
        let pathS = dir;
        if (file.fieldname == 'gallery_pics') {
            pathS += '/gallery';
        }
        cb(null, pathS);
    },
    // Setting name of file saved
    filename: function (req, file, cb) {
        let imgName = file.originalname.slice(0, -4) + '_' + req.body.username + '.' + (0, file_extension_1.default)(file.originalname);
        req.body.imageName = imgName;
        cb(null, imgName);
    }
});
exports.uploadGallery = (0, multer_1.default)({
    storage: storageGallery,
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload JPG and PNG images only!'));
        }
        cb(undefined, true);
    }
});
let workshopRouter = express_1.default.Router();
workshopRouter.route('/get_all_workshops').get((req, res) => {
    return new workshop_controller_1.WorkshopController().getAllWorkshops(req, res);
});
workshopRouter.route('/get_filter_workshops').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getWorkshopsByFilter(req, res);
});
workshopRouter.route('/get_top_5').get((req, res) => {
    return new workshop_controller_1.WorkshopController().getTop5Workshops(req, res);
});
workshopRouter.route('/getWorkshops').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getWorkshopsByParticipation(req, res);
});
workshopRouter.route('/getWorkshopByLikes').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getWorkshopsByLikes(req, res);
});
workshopRouter.route('/getWorkshopCommentsByUser').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getWorkshopCommentsByUser(req, res);
});
workshopRouter.route('/unlikeWorkshop').post((req, res) => {
    return new workshop_controller_1.WorkshopController().unlikeWorkshop(req, res);
});
workshopRouter.route('/editComment').post((req, res) => {
    return new workshop_controller_1.WorkshopController().editComment(req, res);
});
workshopRouter.route('/deleteComment').post((req, res) => {
    return new workshop_controller_1.WorkshopController().deleteComment(req, res);
});
workshopRouter.route('/cancelParticipation').post((req, res) => {
    return new workshop_controller_1.WorkshopController().cancelParticipation(req, res);
});
workshopRouter.route('/getWorkshopById').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getWorkshopById(req, res);
});
workshopRouter.route('/getGalleryPics').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getGalleryPics(req, res);
});
workshopRouter.route('/applyForWorkshop').post((req, res) => {
    return new workshop_controller_1.WorkshopController().applyForWorkShop(req, res);
});
workshopRouter.route('/addToWaitList').post((req, res) => {
    return new workshop_controller_1.WorkshopController().waitForWorkshop(req, res);
});
workshopRouter.route('/isApplied').post((req, res) => {
    return new workshop_controller_1.WorkshopController().isApplied(req, res);
});
workshopRouter.route('/getChat').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getChat(req, res);
});
workshopRouter.route('/postMessageToChat').post((req, res) => {
    return new workshop_controller_1.WorkshopController().postMessageToChat(req, res);
});
workshopRouter.route('/likeWorkshop').post((req, res) => {
    return new workshop_controller_1.WorkshopController().likeWorkshop(req, res);
});
workshopRouter.route('/isLiked').post((req, res) => {
    return new workshop_controller_1.WorkshopController().isLiked(req, res);
});
workshopRouter.route('/addComment').post((req, res) => {
    return new workshop_controller_1.WorkshopController().addComment(req, res);
});
workshopRouter.route('/getAllComments').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getAllComments(req, res);
});
workshopRouter.route('/suggestWorkshop').post(exports.uploadGallery.fields([{
        name: 'main_picture', maxCount: 1
    }, {
        name: 'gallery_pics', maxCount: 5
    }]), (req, res) => {
    return new workshop_controller_1.WorkshopController().suggestWorkshop(req, res);
});
workshopRouter.route('/editWorkshop').post(exports.uploadGallery.fields([{
        name: 'main_picture', maxCount: 1
    }, {
        name: 'gallery_pics', maxCount: 5
    }]), (req, res) => {
    return new workshop_controller_1.WorkshopController().editWorkshop(req, res);
});
workshopRouter.route('/getOrganizatorWorkshops').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getOrganizatorWorkshops(req, res);
});
workshopRouter.route('/getChatsByWorkshop').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getChatsByWorkshop(req, res);
});
workshopRouter.route('/deleteGalleryImg').post((req, res) => {
    return new workshop_controller_1.WorkshopController().deleteGalleryImg(req, res);
});
workshopRouter.route('/getApplications').post((req, res) => {
    return new workshop_controller_1.WorkshopController().getApplications(req, res);
});
workshopRouter.route('/acceptApplication').post((req, res) => {
    return new workshop_controller_1.WorkshopController().acceptApplication(req, res);
});
workshopRouter.route('/denyApplication').post((req, res) => {
    return new workshop_controller_1.WorkshopController().denyApplication(req, res);
});
workshopRouter.route('/cancelWorkshop').post((req, res) => {
    return new workshop_controller_1.WorkshopController().cancelWorkshop(req, res);
});
workshopRouter.route('/getUnaprovedWorkshops').get((req, res) => {
    return new workshop_controller_1.WorkshopController().getUnaprovedWorkshops(req, res);
});
workshopRouter.route('/acceptWorkshop').post((req, res) => {
    return new workshop_controller_1.WorkshopController().acceptWorkshop(req, res);
});
workshopRouter.route('/rejectWorkshop').post((req, res) => {
    return new workshop_controller_1.WorkshopController().rejectWorkshop(req, res);
});
exports.default = workshopRouter;
//# sourceMappingURL=workshop.routes.js.map