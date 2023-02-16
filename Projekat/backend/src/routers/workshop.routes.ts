import express from 'express'
import { WorkshopController } from '../controllers/workshop.controller'
import userRouter, { upload } from './user.routes';
import fileExtension from 'file-extension'
import multer from 'multer'

var storageGallery = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        const fs = require('fs')
        const path = require('path')
        const dir = 'images/' + req.body.oldWorkshopName.replace(' ', '_') + req.body.olddate + req.body.username.replace(' ', '_');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
            fs.mkdirSync(dir + '/gallery')
        }
        
        if(req.body.edit_main_picture == 'true' && file.fieldname == 'main_picture' ){
            fs.readdir(dir, (err,files)=>{
                if(!err){
                    for(const file of files){
                        let file_path_to_unlink = path.join(dir, file);

                        const fsExtra = require("fs-extra");
                        if(file != 'gallery'){
                            //fsExtra.rmdirSync(file_path_to_unlink, { recursive: true });
                            fsExtra.remove(file_path_to_unlink, err => {
                                if (err) return console.error(err)
                                console.log('success!')
                              })
                        }
                       
                        // fs.unlink(file_path_to_unlink, (err)=>{
                        //     if (err) throw err;
                        // })
                    }
                }
            })
        }
    
      
        let gallery_dir = dir + '/gallery';
        if(req.body.edit_gallery_pictures == 'true' && file.fieldname == 'gallery_pics'){
            let numOfPics;
            fs.readdir(gallery_dir, (err,files)=>{
                if(!err){
                    numOfPics = files.length;
                    if(numOfPics >= 5){
                        return cb(new Error("Image limit exceeded!"), null);
                    }
                }
            })
        }
        let pathS = dir;
        if(file.fieldname == 'gallery_pics'){
            pathS+='/gallery';
        }
        cb(null, pathS)
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        let imgName =  file.originalname.slice(0, -4)+'_'+req.body.username + '.' + fileExtension(file.originalname);
        req.body.imageName = imgName;
        cb(null, imgName)
    }
})



export var uploadGallery = multer({
    storage: storageGallery,
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        cb(undefined, true)
    }
})

let workshopRouter = express.Router();
workshopRouter.route('/get_all_workshops').get(
    (req, res)=>{
        return new WorkshopController().getAllWorkshops(req, res);
    }
)
workshopRouter.route('/get_filter_workshops').post(
    (req, res)=>{
        return new WorkshopController().getWorkshopsByFilter(req, res);
    }
)
workshopRouter.route('/get_top_5').get(
    (req, res)=>{
        return new WorkshopController().getTop5Workshops(req, res);
    }
)
workshopRouter.route('/getWorkshops').post(
    (req, res)=>{
        return new WorkshopController().getWorkshopsByParticipation(req, res);
    }
)
workshopRouter.route('/getWorkshopByLikes').post(
    (req, res)=>{
        return new WorkshopController().getWorkshopsByLikes(req, res);
    }
)
workshopRouter.route('/getWorkshopCommentsByUser').post(
    (req, res)=>{
        return new WorkshopController().getWorkshopCommentsByUser(req, res);
    }
)
workshopRouter.route('/unlikeWorkshop').post(
    (req, res)=>{
        return new WorkshopController().unlikeWorkshop(req, res);
    }
)
workshopRouter.route('/editComment').post(
    (req, res)=>{
        return new WorkshopController().editComment(req, res);
    }
)
workshopRouter.route('/deleteComment').post(
    (req, res)=>{
        return new WorkshopController().deleteComment(req, res);
    }
)
workshopRouter.route('/cancelParticipation').post(
    (req, res)=>{
        return new WorkshopController().cancelParticipation(req, res);
    }
)
workshopRouter.route('/getWorkshopById').post(
    (req, res)=>{
        return new WorkshopController().getWorkshopById(req, res);
    }
)
workshopRouter.route('/getGalleryPics').post(
    (req, res)=>{
        return new WorkshopController().getGalleryPics(req, res);
    }
)
workshopRouter.route('/applyForWorkshop').post(
    (req, res)=>{
        return new WorkshopController().applyForWorkShop(req, res);
    }
)
workshopRouter.route('/addToWaitList').post(
    (req, res)=>{
        return new WorkshopController().waitForWorkshop(req, res);
    }
)
workshopRouter.route('/isApplied').post(
    (req, res)=>{
        return new WorkshopController().isApplied(req, res);
    }
)
workshopRouter.route('/getChat').post(
    (req, res)=>{
        return new WorkshopController().getChat(req, res);
    }
)
workshopRouter.route('/postMessageToChat').post(
    (req, res)=>{
        return new WorkshopController().postMessageToChat(req, res);
    }
)
workshopRouter.route('/likeWorkshop').post(
    (req, res)=>{
        return new WorkshopController().likeWorkshop(req, res);
    }
)
workshopRouter.route('/isLiked').post(
    (req, res)=>{
        return new WorkshopController().isLiked(req, res);
    }
)
workshopRouter.route('/addComment').post(
    (req, res)=>{
        return new WorkshopController().addComment(req, res);
    }
)
workshopRouter.route('/getAllComments').post(
    (req, res)=>{
        return new WorkshopController().getAllComments(req, res);
    }
)
workshopRouter.route('/suggestWorkshop').post(
    uploadGallery.fields([{
        name: 'main_picture', maxCount: 1
      }, {
        name: 'gallery_pics', maxCount: 5
      }]),
    (req, res)=>{
        return new WorkshopController().suggestWorkshop(req, res);
    }
)
workshopRouter.route('/editWorkshop').post(
    uploadGallery.fields([{
        name: 'main_picture', maxCount: 1
      }, {
        name: 'gallery_pics', maxCount: 5
      }]),
    (req, res)=>{
        return new WorkshopController().editWorkshop(req, res);
    }
)
workshopRouter.route('/getOrganizatorWorkshops').post(
    (req, res)=>{
        return new WorkshopController().getOrganizatorWorkshops(req,res);
    }
)
workshopRouter.route('/getChatsByWorkshop').post(
    (req, res)=>{
        return new WorkshopController().getChatsByWorkshop(req, res);
    }
)
workshopRouter.route('/deleteGalleryImg').post(
    (req, res)=>{
        return new WorkshopController().deleteGalleryImg(req, res);
    }
)
workshopRouter.route('/getApplications').post(
    (req, res)=>{
        return new WorkshopController().getApplications(req, res);
    }
)
workshopRouter.route('/acceptApplication').post(
    (req, res)=>{
        return new WorkshopController().acceptApplication(req, res);
    }
)
workshopRouter.route('/denyApplication').post(
    (req, res)=>{
        return new WorkshopController().denyApplication(req, res);
    }
)
workshopRouter.route('/cancelWorkshop').post(
    (req, res)=>{
        return new WorkshopController().cancelWorkshop(req, res);
    }
)
workshopRouter.route('/getUnaprovedWorkshops').get(
    (req,res)=>{
        return new WorkshopController().getUnaprovedWorkshops(req, res);
    }
)
workshopRouter.route('/acceptWorkshop').post(
    (req,res)=>{
        return new WorkshopController().acceptWorkshop(req, res);
    }
)
workshopRouter.route('/rejectWorkshop').post(
    (req,res)=>{
        return new WorkshopController().rejectWorkshop(req, res);
    }
)
export default workshopRouter;