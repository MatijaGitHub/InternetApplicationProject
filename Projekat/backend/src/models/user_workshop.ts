import mongoose, { mongo } from "mongoose";


let user_workshop = new mongoose.Schema({
    username: {
        type: String
    },
    workshopId: {
        type: String
    },
    accepted: {
        type: Number
    }
});

export default mongoose.model("UserWorkshopModel", user_workshop, 'user_workshop');

