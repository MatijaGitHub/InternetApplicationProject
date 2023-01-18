import mongoose from "mongoose";


let workshop = new mongoose.Schema({
    workshopName: {
        type: String
    },
    workshopDate: {
        type: Date
    },
    workshopImage: {
        type: String
    },
    workshopPlace:{
        type: String
    },
    workshopDesc:{
        type: String
    },
    numOfLikes:{
        type: Number
    }

});

export default mongoose.model("WorkshopModel", workshop, 'workshops');




