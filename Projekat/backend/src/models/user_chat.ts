import mongoose, { mongo } from "mongoose";


let user_chat = new mongoose.Schema({
    username1: {
        type: String
    },
    username2: {
        type: String
    },
    workshopId: {
        type: String
    },
    messages : [
        {
            user: {
                type: String
            },
            message:{
                type: String
            },
            time:{
                type: Date
            }
        }
    ]
});

export default mongoose.model("UserChatModel", user_chat, 'user_chat');

