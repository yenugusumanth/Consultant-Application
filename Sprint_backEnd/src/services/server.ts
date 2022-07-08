import express from "express";
import expressResponse from "../middleware/expressResponse";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
//import Joi from "joi";
import JoiDate from "@hapi/joi-date";
import JoiBase from "@hapi/joi";
//import moment from "moment";

import CtrlUsers from "../controllers/users";
import CtrlConsultants from "../controllers/consultants";
import CtrlAppoinments from "../controllers/appoinments";

const Joi = JoiBase.extend(JoiDate);

export default class Server {

    //initializing the express with app const
    app = express();

    //starting the express-server,mongo,middleware,routes & defRoutes
    async start() {
        try {

            console.log("Listening the Server");

            //listening the port
            this.app.listen(process.env.PORT);
            console.log("Successfully connected to http://localhost:" + process.env.PORT)

            //calling the middleware method where all middleware are present
            this.middleware();

            //calling the routes methods where all HTTP request are present
            this.routes();

            //calling the defroutes fro server testing
            this.defRoutes();
        } 
        catch (e) {

            //catching and printing the error in console if something happens 
            console.log("Error" + e);
        }
    }

    //middleware for requests
    middleware() {

        //bpdy-parser middleware for parsing the body data providing in postman
        this.app.use(bodyParser.json())

        //session middleware 
        this.app.use(
            session({

                //providing the secret to store in cookie
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,

                //storing the session in mongodb URL
                store: MongoStore.create({
                    mongoUrl: process.env.SESSION_URL,
                }),

                //fixing age of cookie to 24hours
                cookie: {
                    maxAge: 24 * 60 * 60 * 1000,
                },
            }
            ))
    }

    //defining the all required Routes
    routes() {

        //Creating a user account
        this.app.post("/user/create",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //creating a schema for input validation
                const schema = Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                    name: Joi.string().required(),
                    phone: Joi.string().required(),
                    DOB: Joi.date().required(),
                    address: Joi.string().required(),
                })

                //validating the Joi schema provided
                const data = await schema.validateAsync(req.body);

                //creating a user account with given details
                const result = await CtrlUsers.create(data);

                return result;

            })
        )

        //User authentication
        this.app.post("/user/auth",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //creating a schema for input validation
                const schema = Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                })

                //validating the Joi schema provided
                const data = await schema.validateAsync(req.body);

                //calling auth function in CtrlUsers for authentication
                const result = await CtrlUsers.auth(data);

                //storing the user session details in cookies
                req.session.users = result;

                return result;

            })
        )

        //get user profile
        this.app.get("/user/getProfile",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether user is authenticated or not by cookie saved in database
                if (req.session && req.session.users) {

                    //calling getProfile function in CtrlUsers to get user details
                    const result = await CtrlUsers.getProfile(req.session.users.email);

                    return result;

                }
                else {

                    //sending "User not Authenticated" error
                    throw new Error("User not Authenticated");
                }

            })
        )

        //Book doctor appointment
        this.app.post("/user/bookAppointment",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether user is authenticated or not by cookie saved in database
                if (req.session && req.session.users) {

                    //creating a schema for input validation
                    const schema = Joi.object().keys({
                        doctorEmail: Joi.string().required(),
                        userEmail: Joi.string(),
                        date: Joi.date().required(),
                        bookingStatus: Joi.boolean().required(),
                        reason: Joi.string().required(),
                        slotId: Joi.string().required(),
                    })

                    console.log("1 : ", req.body);

                    //validating the Joi schema provided
                    const data = await schema.validateAsync(req.body);
                    console.log("2 : ", req.body);

                    //calling bookAppointment function in CtrlUsers for booking a doctor appointment
                    const result = await CtrlUsers.bookAppointment(req.session.users.email, data);

                    return result;

                } else {

                    //sending "User not Authenticated" error
                    throw new Error("User not Authenticated");
                }
            })
        )

        //Consultant Auhentication
        this.app.post("/consultant/auth",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //creating a schema for input validation
                const schema = Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                })

                //validating the Joi schema provided
                const data = await schema.validateAsync(req.body)

                const data1 = {
                    doctorEmail: data.email,
                    password: data.password
                }

                //storing the consultant session details in cookies
                req.session.consultant = data1;

                //storing consultant data in returnData
                const returnData = {
                    ...data,
                    success: true,
                }

                return returnData;

            })
        )

        //Add slot for consultant
        this.app.post("/consultant/addSlot",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether consultant is authenticated or not by cookie saved in database
                if (req.session && req.session.consultant) {

                    //creating a schema for input validation
                    const schema = Joi.object().keys({
                        slotId: Joi.string().required(),
                        doctorEmail: Joi.string().email().required(),
                        date: Joi.date().format('YYYY-MM-DD HH:mm').utc().required(),
                        status: Joi.boolean().required().default(false)
                    })

                    //validating the Joi schema provided
                    const data = await schema.validateAsync(req.body);

                    //calling addSlot function in CtrlConsultants for adding a slot by doctor
                    const result = await CtrlConsultants.addSlot(req.session.consultant.doctorEmail, data);

                    return result;

                } else {

                    //sending "Consultant not Authenticated" error
                    throw new Error("Consultant not Authenticated");
                }
            })
        )

        this.app.post("/consultant/cancelAppointment",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether consultant is authenticated or not by cookie saved in database
                if (req.session && req.session.consultant) {

                    //creating a schema for input validation
                    const schema = Joi.object().keys({
                        userEmail: Joi.string().required(),
                        reason: Joi.string().required(),
                        slotId: Joi.string().required(),
                    })

                    //validating the Joi schema provided
                    const data = await schema.validateAsync(req.body);

                    //calling cancelAppointment function in CtrlConsultants to cancel an appointment with a reason
                    const result = await CtrlConsultants.cancelAppointment(req.session.consultant.doctorEmail, data);

                    return result;

                } else {

                    //sending "Consultant not Authenticated" error
                    throw new Error("User not Authenticated");
                }
            })
        )

        //Get slots of a selected doctor
        this.app.get("/user/getConsultantSlots",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether user is authenticated or not by cookie saved in database
                if (req.session && req.session.users) {

                    //creating a schema for input validation
                    const schema = Joi.object().keys({
                        doctorEmail: Joi.string().email().required(),
                    })

                    //validating the Joi schema provided
                    const data = await schema.validateAsync(req.query);
                    console.log("data ", data);

                    //calling getSlots function in CtrlUsers to get slots of a selected doctor
                    const result = await CtrlUsers.getSlots(data);

                    return result;

                } else {

                    //sending "Consultant not Authenticated" message
                    return {
                        success: false,
                        message: "User not Authenticated"
                    }
                }
            })
        )

        //
        this.app.get("/consultant/getConsultantDetials",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether consultant is authenticated or not by cookie saved in database
                if (req.session && req.session.consultant) {

                    const data = {
                        doctorEmail: req.session.consultant.doctorEmail,
                        password: req.session.consultant.password
                    }
                    return data;
                }
            })
        )

        //Get appointments of a doctor
        this.app.get("/consultant/getAppointments",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether consultant is authenticated or not by cookie saved in database
                if (req.session && req.session.consultant) {

                    
                    //calling getAppointments from CtrlConsultants to get appointments of doctor
                    const result = await CtrlConsultants.getAppointments(req.session.consultant.doctorEmail);

                    return result;

                } else {

                    //sending "Consultant not Authenticated" error
                    throw new Error("User not Authenticated");
                }
            })
        )

        //Update profile for user
        this.app.post("/user/updateProfile",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether user is authenticated or not by cookie saved in database
                if (req.session && req.session.users) {

                    //creating a schema for input validation
                    const schema = Joi.object().keys({
                        name: Joi.string(),
                        phone: Joi.string(),
                        DOB: Joi.date(),
                        address: Joi.string(),
                    })

                    //validating the Joi schema provided
                    const data = await schema.validateAsync(req.body);

                    //calling updateProfile from CtrlUsers to update user profile
                    const result = await CtrlUsers.updateProfile(req.session.users.email, data);

                    return result;

                } else {

                    //sending "User not Authenticated" error
                    throw new Error("User not Authenticated");
                }
            })
        )

        // //Forgot password for user
        // this.app.post("/user/updatePassowrd",

        //     //using expressresponse middleware for error handling
        //     expressResponse(async (req, resp) => {

        //         //checking whether user is authenticated or not by cookie saved in database
        //         if (req.session && req.session.users) {

        //             //creating a schema for input validation
        //             const schema = Joi.object().keys({
        //                 password: Joi.string(),
        //             })

        //             //validating the Joi schema provided
        //             const data = await schema.validateAsync(req.body);

        //             //calling updatePassword from CtrlUsers to change password 
        //             const result = await CtrlUsers.updatePassword(req.session.users.email, data);

        //             return result;

        //         } else {

        //             //sending "User not Authenticated" error
        //             throw new Error("User not Authenticated");
        //         }
        //     })
        // )

        //user appointments
        this.app.get("/user/MyAppointments",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether user is authenticated or not by cookie saved in database
                if (req.session && req.session.users) {

                    //calling getMyApppointments from CtrlUsers to get user appointments
                    const result = await CtrlUsers.getMyAppointments(req.session.users.email);
                    return result;

                } 
                else {

                    //sending "User not Authenticated" error
                    throw new Error("User not Authenticated");
                }
            })
        )

        //Forgot password for user
        this.app.post("/user/forgetPassowrd",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //creating a schema for input validation
                const schema = Joi.object().keys({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                })

                //validating the Joi schema provided
                const data = await schema.validateAsync(req.body);

                //calling updatePassword from CtrlUsers update password
                const result = await CtrlUsers.updatePassword(data.email, data.password);

                return result;
            })
        )

        this.app.post("/user/updateSlot",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //checking whether user is authenticated or not by cookie saved in database
                if (req.session && req.session.users) {

                    //creating a schema for input validation
                    const schema = Joi.object().keys({
                        slotId: Joi.string().required(),
                        doctorEmail: Joi.string().email().required(),
                    })

                    //validating the Joi schema provided
                    const data = await schema.validateAsync(req.body);
                    const result = await CtrlUsers.updateSlot(data);
                } 
                else {

                    //sending "User not Authenticated" error
                    throw new Error("User not Authenticated");
                }
            })
        )

        this.app.post("/user/cancelSlot",

            //using expressresponse middleware for error handling
            expressResponse(async (req, resp) => {

                //creating a schema for input validation
                const schema = Joi.object().keys({
                    date: Joi.date().format('YYYY-MM-DD HH:mm').utc().required(),
                })

                const result = await CtrlUsers.ChangeSlot(req.session.users.email, req.body);
            })
        )


        //logout of admin
        this.app.post("/user/logout", async (req, resp) => {

            //destroying the session stored in cookie for admin (logging out)
            req.session.destroy(() => { });

            //sending a success response with status code 200 in postman 
            resp.status(200).send({ success: true, message: "User is logged out" })
        })

        //logout of admin
        this.app.post("/consultant/logout", async (req, resp) => {

            //destroying the session stored in cookie for admin (logging out)
            req.session.destroy(() => { });

            //sending a success response with status code 200 in postman 
            resp.status(200).send({ success: true, message: "User is logged out" })
        })




    }

    //default routes for testing
    defRoutes() {
        // check if server running
        this.app.all("/", (req, resp) => {
            resp.status(200).send({ success: true, message: "Server is working" });
        });

        this.app.all("*", (req, resp) => {
            resp.status(404).send({ success: false, message: `given route [${req.method}] ${req.path} not found` });
        });
    }

}