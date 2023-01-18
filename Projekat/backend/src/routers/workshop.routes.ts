import express from 'express'
import { WorkshopController } from '../controllers/workshop.controller'



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
export default workshopRouter;