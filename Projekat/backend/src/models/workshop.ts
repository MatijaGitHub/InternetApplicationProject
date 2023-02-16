import mongoose from "mongoose";


let workshop = new mongoose.Schema({
    workshopName: {
        type: String
    },
    workshopDate: {
        type: Date,
        default : Date
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
    workshopDescLong:{
        type: String
    },
    numOfLikes:{
        type: Number
    },
    freeSpaces:{
        type: Number
    },
    status: {
        type: Number
    },
    lat:{
        type: Number
    },
    long:{
        type:Number
    },
    organizatorUsername:{
        type: String
    },
    waitList:[{
        type: String
    }]

});

export default mongoose.model("WorkshopModel", workshop, 'workshops');




