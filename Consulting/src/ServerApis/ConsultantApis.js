import instance from "../config/axiosConfig";

// cerating a function to Get authneticate consulatant 
export const consultantAuth = async (consultant) => {
    try{
        const  consultantData  = await instance.post('consultant/auth', consultant);
        //console.log(consultantData);
        return consultantData;
    }catch(e){
        console.log(e);
    }
}

// cerating a function to post logout consulatant
export const consultantLogout = async () => {
    const consultantData  = await instance.post('consultant/logout');
    console.log(consultantData);
}

// cerating a function to get all getConsultantDetials
export const getConsultantDetials = async () => {
    const consultantData  = await instance.get('consultant/getConsultantDetials');
    console.log(consultantData.data);
    return consultantData.data;
}

// cerating a function to post all consultantAddSlot
export const consultantAddSlot = async (data) => {
    const data1 = {
        ...data,
        status:false
    }
    const consultantData  = await instance.post('consultant/addSlot',data1);
    //console.log(consultantData);
    return consultantData.data;
}


// cerating a function to get all appointments
export const getAppointments = async () => {
    const consultantData  = await instance.get('consultant/getAppointments');
    //console.log(consultantData.data);
    return consultantData.data;
}

// cerating a function to cancel the appointments
export const cancelAppointments = async (data) => {
    console.log("API data : ",data);
    const returnData = await instance.post('consultant/cancelAppointment',data);
    console.log("returned data : ",returnData.data);
}