import {View, Text, Alert,StyleSheet} from 'react-native';
import React from 'react';

import {ConsultantDetails} from '../../Data/ConsultantData';
import {getConsultantDetials} from '../../ServerApis/ConsultantApis';

//creating the function component naming CancelAppointment
const ConsultantProfileScreen = props => {

  //destructiong the props object
  const {navigation} = props;

  //creating the state variables for the input fields
  const [consultant, setConsultant] = React.useState([{}]);

  //creating the useEffect hook to get the consultant details from the server apis automatically
  React.useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      getSession();
      getConsultantProfile();
    });
    return unsubscribe;
  }, [navigation]);

  //creating the function to get the consultant details from the session stored in database server apis
  const getSession = async () => {
    const data = await getConsultantDetials();
    console.log(data);
    await setConsultant(data);
  };

  
  //creating the state variables for the input fields
  const [doctorDetails, setDoctorDetails] = React.useState({});

  //creating the function to get the consultant details from the server apis
  const getConsultantProfile = async () => {
    for (let i = 0; i < ConsultantDetails.length; i++) {
      if (ConsultantDetails[i].email === consultant.doctorEmail) {
        await setDoctorDetails(ConsultantDetails[i]);
      }
    }
    console.log('doctorDetails : ', doctorDetails);
  };

  //returning the JSX component
  return (
    <View style={styles.mainView} onLayout={getConsultantProfile}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Email: {doctorDetails.email}</Text>
        <Text style={styles.text}>Clinic Name: {doctorDetails.clinicName}</Text>
        <Text style={styles.text}>
          Specialization: {doctorDetails.specialization}
        </Text>
        <Text style={styles.text}>
          Clinic Address: {doctorDetails.clinicAddress}
        </Text>
        <Text style={styles.text}>Phone No: {doctorDetails.phone}</Text>
      </View>
    </View>
  );
};

export default ConsultantProfileScreen;

const styles=StyleSheet.create({
  mainView:{
    height:"100%",
    alignItems:"center",
    //justifyContent:"center",
    backgroundColor:"#00938720"
  },
  text:{
    marginTop:15,
    marginBottom:15,
    fontSize:20,
    fontWeight:"bold",
    color:"#00000098",
    marginLeft:20
  },
  infoContainer:{
    alignItems:"baseline",
    justifyContent:"center",
    backgroundColor:"##00938705",
    width:"85%",
    borderRadius:10,
    height:"60%",
    borderWidth:4,
    borderColor:"#00000070",
    marginTop:120,
  },
})
