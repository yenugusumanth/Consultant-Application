import bookings from "../models/appointments";
import users from "../models/users";
import appointments from "../models/appointments";

export default class CtrlAppoinments {

  /**
   * Function to change slot
   * @param userEmail 
   * @param body 
   * @returns 
   */
  static async ChangeSlot(userEmail:string,body:any){

    const result = await bookings.findOneAndUpdate({_id:body.id},{date:body.date,time:body.time});
    
    return result;
  }
}
