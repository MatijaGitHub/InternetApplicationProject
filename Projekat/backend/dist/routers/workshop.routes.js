"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workshop_controller_1 = require("../controllers/workshop.controller");
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
exports.default = workshopRouter;
//# sourceMappingURL=workshop.routes.js.map