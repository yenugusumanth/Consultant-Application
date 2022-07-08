import bookings from "../models/appointments";
import slots from "../models/slots";

export default class CtrlConsultants {

  /**
   * Function to get appointments of a doctor
   * @param doctorEmail 
   * @returns 
   */
  static async getAppointments(doctorEmail: any) {

    const result = await bookings.aggregate([
        //matching the email in database with email provided by doctor
      {
        $match: {

        doctorEmail: doctorEmail,

        }
      },
      {
        $sort: { slotId: 1, }
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
   * Function to cancel appointment by providing a reason
   * @param doctorEmail 
   * @param body 
   * @returns 
   */
  static async cancelAppointment(doctorEmail: string, body: any) {

    //using findOneAndUpdate function to change booking status to false and give reason
    const result = await bookings.findOneAndUpdate(

      { slotId: body.slotId, doctorEmail: doctorEmail, userEmail: body.userEmail },
      { bookingStatus: false, reason: body.reason }

    );

    //storing result in returnData
    const returnData = {
      ...result,
      success: true,
    }

    //return the returnData
    return returnData;
  }

  /**
   * Function to add slots by doctor
   * @param doctorEmail 
   * @param body 
   * @returns 
   */
  static async addSlot(doctorEmail: string, body: any) {

    //using create function to add slot to slots database
    const result = await slots.create(body);

    //return the returnData
    return result;
  }

}
