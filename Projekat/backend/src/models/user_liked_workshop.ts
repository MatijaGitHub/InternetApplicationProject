import mongoose, { mongo } from "mongoose";


let user_liked_workshop = new mongoose.Schema({
    username: {
        type: String
    },
    workshopId: {
        type: String
    }
});

export default mongoose.model("UserLikedWorkshopModel", user_liked_workshop, 'user_like_workshop');

