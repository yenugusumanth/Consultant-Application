import {Schema,model} from 'mongoose';

//Slots interface
export interface ISlots{
    slotId: string;
    doctorEmail: string;
    date: Date;
} 

//Slots schema
const schema = new Schema({
    slotId: {
        type: String,
        required: true,
    },
    doctorEmail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status:{
        type:Boolean,
        required: true,
    }
})

//export slots schema
export default model<ISlots>('slots', schema);