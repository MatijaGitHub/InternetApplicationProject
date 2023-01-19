import express from 'express'
import { WorkshopController } from '../controllers/workshop.controller'
import userRouter from './user.routes';



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
export default workshopRouter;