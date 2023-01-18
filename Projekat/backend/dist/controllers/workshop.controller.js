"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const workshop_1 = __importDefault(require("../models/workshop"));
class WorkshopController {
    constructor() {
        this.getAllWorkshops = (req, res) => {
            let workshops = workshop_1.default.find((err, resp) => {
                if (!err) {
                    res.json(resp);
                }
            });
        };
        this.getWorkshopsByFilter = (req, res) => {
            let name = req.body.name;
            let place = req.body.place;
            if (name == "") {
                let workshops = workshop_1.default.find({ 'workshopPlace': { '$regex': new RegExp("^" + place.toLowerCase(), "i") } }, (err, resp) => {
                    if (!err) {
                        res.json(resp);
                    }
                });
            }
            else if (place == "") {
                let workshops = workshop_1.default.find({ 'workshopName': { '$regex': new RegExp("^" + name.toLowerCase(), "i") } }, (err, resp) => {
                    if (!err) {
                        res.json(resp);
                    }
                });
            }
            else {
                let workshops = workshop_1.default.find({ 'workshopName': { '$regex': new RegExp("^" + name.toLowerCase(), "i") }, 'workshopPlace': { '$regex': new RegExp("^" + place.toLowerCase(), "i") } }, (err, resp) => {
                    if (!err) {
                        res.json(resp);
                    }
                });
            }
        };
        this.getTop5Workshops = (req, res) => {
            let workshops = workshop_1.default.find((err, resp) => {
                if (!err) {
                    res.json(resp);
                }
            }).sort({ 'numOfLikes': -1 }).limit(5);
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map