import { Schema,model } from "mongoose";

//Appointments interface
export interface IBooking{
    doctorEmail: string;
    userEmail: string;
    date: Date;
    time: string;
    bookingStatus : boolean;
    reason : string;
}

//Appointments Schema
const schema = new Schema({
    doctorEmail: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    bookingStatus : {
        type: Boolean,
    },
    reason : {
        type: String,
        required: true,
    },
    slotId:{
        type:String,
        required:true,
    }
})

//exporting appointments schema
export default model<IBooking>("booking", schema);