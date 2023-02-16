import mongoose from "mongoose";


let user = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phonenumber: {
        type: String
    },
    email: {
        type: String
    },
    name_of_organization: {
        type: String
    },
    adress_of_organization: {
        country : String,
        city : String,
        street : String,
        zipcode : String
    },
    organization_identification_number: {
        type: String
    },
    type_of_user: {
        type: Number
    },
    image_path: {
        type: String
    },
    approved:{
        type: Number
    }

});

export default mongoose.model("UserModel", user, 'users');

