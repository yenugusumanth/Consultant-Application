import { Schema,model } from 'mongoose';
import {IBooking} from './appointments';

//Users interface
export interface Iusers {
    name: string,
    email: string,
    password: string,
    DOB:Date,
    phone: string,
    address: string,
    slotBooked: [
        {
            BookingId : IBooking | string
        }
    ]
}

//Users schema
const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    slotBooked:[
        {
            type:Schema.Types.ObjectId,
            ref:'booking',
            required:false,
        }
    ]
});

//exporting users schema
export default model<Iusers>('users', schema);