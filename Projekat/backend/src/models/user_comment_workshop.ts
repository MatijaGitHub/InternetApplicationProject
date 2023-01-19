import mongoose, { mongo } from "mongoose";


let user_comment_workshop = new mongoose.Schema({
    username: {
        type: String
    },
    comment: {
        type: String
    },
    workshopId: {
        type: String
    }
});

export default mongoose.model("UserCommentWorkshopModel", user_comment_workshop, 'user_comment_workshop');

