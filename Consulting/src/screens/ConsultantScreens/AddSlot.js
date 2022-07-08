
import {View, Text, TextInput, StyleSheet, Button,TouchableOpacity,Alert} from 'react-native';
import React from 'react';
import {
  getConsultantDetials,
  consultantAddSlot,
} from '../../ServerApis/ConsultantApis';


//creating the function component naming AddSlot
const AddSlot = () => {

  //creating the state variables for the input fields
  const [slotId, setSlotId] = React.useState('');
  const [Date, setDate] = React.useState('');
  const [doctorDetails, setDoctorDetails] = React.useState('');

  //creating the function for the onchange event of the input fields
  const getDetails = async () => {
    const doctorDetail = await getConsultantDetials();
    setDoctorDetails(doctorDetail.doctorEmail);
  };

  //creating the function for to add the slot in database
  const addSlot = async () => {

    //checking if the input fields are empty
    if(slotId.length>0 && Date.length>0){

    //calling the add slot object which is same as in database to transfer teh data to server apis
    const data = {
      slotId: slotId,
      doctorEmail: doctorDetails,
      date: Date,
    };

    //calling and awaiting the add slot function from the server apis
    const returnData = await consultantAddSlot(data);
    console.log('slot details', returnData);

    //poping the alert if the slot is added successfully
    Alert.alert("Success",`Slot added with Slot Id: ${slotId}`)
  }
  else{

    //poping the alert if the input fields are empty and wrong
    Alert.alert("Alert","Slot Id or Date cannot be Empty")
  }
  };

  //return the JSX component
  return (
    <View style={styles.inputContainer} onLayout={getDetails}>
      <Text style={{paddingRight: 190, marginTop: 5}}>Slot Id</Text>
      <TextInput
        placeholder="Enter a Slot Id"
        autoCapitalize="none"
        editable={true}
        onChangeText={value => {
          setSlotId(value);
        }}
        style={styles.input}
      />
      <Text style={{paddingRight: 190, marginTop: 5}}>Email</Text>
      <TextInput
        placeholder="doctorEmail"
        autoCapitalize="none"
        defaultValue={doctorDetails}
        editable={false}
        onChangeText={value => {
          setDoctorEmail(value);
        }}
        style={styles.input}
      />
      <Text style={{paddingRight: 135, marginTop: 5}}>Date and Time</Text>
      <TextInput
        placeholder="YYYY-MM-DD HH:MM"
        autoCapitalize="none"
        editable={true}
        onChangeText={value => {
          setDate(value);
        }}
        style={styles.input}
      />   
      <TouchableOpacity style={styles.done} onPress={addSlot}>
          <Text style={styles.doneText}>Add Slot</Text>
        </TouchableOpacity> 
    </View>
    
  );
};

//exporting the allslot function
export default AddSlot;

//creating the styles for the input fields
const styles=StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    width: '60%',
    marginBottom: 18,
    textAlign: 'center',
    borderColor: '#009387',
    marginTop: 14,
  },
  inputContainer: {
    alignItems: 'center',
    flex: 1,
    //justifyContent:"center"
    marginTop:70
  },
  done: {
    backgroundColor: '#009387',
    width: '70%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 25,
  },
  doneText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
})