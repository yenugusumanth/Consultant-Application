import users from '../models/users';
import consultants from '../models/consultants.';
import Bcrypt from '../services/bcrypt'
import bookings from "../models/appointments";
import slots from '../models/slots';

export default class CtrlUsers {

    /**
     * Function to create user account
     * @param body 
     * @returns 
     */
    static async create(body: any) {

        //Using Bcrypt for encrypting password
        const hash = await Bcrypt.hashing(body.password);
        const data = {
            ...body,
            password: hash,
        }

        //Calling create function to create an account with data
        const user = await users.create(data);

        //storing user details in returndata
        const returnData = {
            ...user,
            success: true,
        }

        //return user data;
        return returnData;

    }


    /**
     * Function to authenticate user
     * @param body 
     * @returns 
     */
    static async auth(body: any) {

        const user1 = await users.aggregate([
            {
                //matching the email in database with email provided by user
                $match: {
                    email: body.email
                }
            }
        ]).exec();

        const user = user1[0];

        //returning a message 'User not found' if user doesn't exist
        if (!user) {

            return ({
                success: false,
                message: 'User not found'
            });
        }

        //Comparing the passwords if user exist
        const isMatch = await Bcrypt.comparing(body.password, user.password);

        //returning a message 'Invalid password' if passwords doesn't match
        if (!isMatch) {

            return ({
                success: false,
                message: 'Invalid password'
            });
        }

        //Storing user details in returnData
        const returnData = {
            ...user,
            success: true,
        }

        return returnData;

    }

    /**
     * Function to get profile of a person
     * @param body 
     * @returns 
     */
    static async getProfile(body: any) {

        const user1 = await users.aggregate([
            {

                //matching the email in database with email provided by user
                $match: {
                    email: body
                }

            }

        ]).exec();

        const user = user1[0];

        //returning a message 'User not found' if user doesn't exist
        if (!user) {

            return ({
                success: false,
                message: 'User not found'
            });
        }

        //Storing user details in returnData
        const returnData = {
            ...user,
            success: true,
        }

        return returnData;

    }

    /**
     * Function to get all the consultant details
     * @returns 
     */
    static async getConsultants() {

        //using find function to find all consultant details from consultants database
        const consultant = await consultants.find();

        //return consultant data
        return consultant;
    }

    /**
     * Function to update password
     * @param email 
     * @param body 
     * @returns 
     */
    static async updatePassword(email: string, body: any) {

        const user1 = await users.aggregate([
            {

                //matching the email in database with email provided by user
                $match: {
                    email: email
                }

            }

        ]).exec();

        const user = user1[0];

        //Using Bcrypt for encrypting new password
        const hash = await Bcrypt.hashing(body);

        //returning a message 'User not found' if user doesn't exist
        if (!user) {

            return ({
                success: false,
                message: 'User not found'
            });
        }

        //updating password with new encrypted password
        const updatedUser = await users.updateOne({ email: email }, { $set: { password: hash } });

        //storing updatedUser details in returnData
        const returnData = {
            ...updatedUser,
            success: true,
        }

        //return the returnData
        return returnData;
    }

    /**
     * Function to update user profile
     * @param email 
     * @param body 
     * @returns 
     */
    static async updateProfile(email: string, body: any) {

        
        const user1 = await users.aggregate([
            {
                //matching the email in database with email provided by user
                $match: {
                    email: email
                }

            }

        ]).exec();

        const user = user1[0];

        //returning a message 'User not found' if user doesn't exist
        if (!user) {

            return ({
                success: false,
                message: 'User not found'
            });
        }
        console.log("body : ",body);
        console.log("user : ",user);
        
        //using updateOne function to update new values
        const updatedUser = await users.updateOne({ email: email }, { $set: { ...body } });

        //storing updatedUser details in returnData
        const returnData = {
            ...updatedUser,
            success: true,
        }

        //return the returnData
        return returnData;
    }

    /**
     * Function to book appointments
     * @param userEmail 
     * @param body 
     * @returns 
     */
    static async bookAppointment(userEmail: string, body: any) {

        //using create function to add booking details of user in bookings database
        const result = await bookings.create(body);

        //updating the slotbooked status of the user
        const updatedData = await users.findOneAndUpdate({ email: userEmail }, { $push: { slotBooked: result._id } });

        return result;
    }

    /**
     * Function to change slots
     * @param userEmail 
     * @param body 
     * @returns 
     */
    static async ChangeSlot(userEmail: string, body: any) {
        const result = await bookings.findOneAndUpdate({ _id: body.id }, { date: body.date, time: body.time });
        return result;
    }

    /**
     * Function to get slots of a selected doctor
     * @param body 
     * @returns 
     */
    static async getSlots(body: any) {
        
        //using find function to find slots of selected doctor
        const result = await slots.find({ doctorEmail: body.doctorEmail });
    
        return result;
    }

    /**
     * Function to get all appoitments of a user
     * @param userEmail 
     * @returns 
     */
    static async getMyAppointments(userEmail: string) {
        
        const result = await bookings.aggregate([
            {
                //matching the email in database with email provided by user
                $match: {
                    userEmail: userEmail,
                }

            }

        ]).exec();

        //storing result in returnData
        const returnData = {
            data: result,
            success: true,
        }

        //return the returnData
        return returnData;
    }

    /**
     * 
     * @param body 
     * @returns 
     */
    static async updateSlot(body: any) {
         
        const result = await slots.findOneAndUpdate({ slotId: body.slotId, doctorEmail: body.doctorEmail }, { $set: { status: true } });
        return result;
    }

}