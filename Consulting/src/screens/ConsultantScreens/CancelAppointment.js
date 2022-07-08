import {View, Text, TextInput, Button,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import React from 'react';

import {cancelAppointments} from '../../ServerApis/ConsultantApis';

//creating the function component naming CancelAppointment
const CancelAppointment = props => {
  const {navigation} = props;

  //creating the state variables for the input fields
  const [reason, setReason] = React.useState('');

  //creating the function to cancel the slot booked by user 
  const cancelSlot = async () => {

    //creating the object to transfer the data to server apis
    const data = {
      userEmail:props.route.params.email,
      slotId:props.route.params.slotId,
      reason:reason
    }

    //calling and awaiting the cancel appointment function from the server apis
    const returnData = await cancelAppointments(data);

    //poping the alert if the slot is cancelled successfully
    Alert.alert("Appointment Cancelled");
  };

  //return the JSX component
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Reason"
        autoCapitalize="none"
        onChangeText={text => setReason(text)}
        style={styles.input}
      />
      <View style={{alignItems:"center"}}>
        <TouchableOpacity
            style={styles.cancelBtn}
            onPress={cancelSlot}
            >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                paddingLeft:10,
                paddingRight:10,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:"center"}}>
        <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.navigate('Your Appointments')}
            >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                paddingLeft:10,
                paddingRight:10,
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

//creating the styles for the component
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    marginTop:50,
  },
  cancelBtn:{
    marginBottom:5,
    margin: 10,
    right: 0,
    bottom: 0,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#01ab9d',
    height: 45,
    width: 190,
    alignItems: 'center',
    justifyContent: 'center',
    border: 5,
    borderWidth: 2,
    borderColor: '#00000030',
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    width: '80%',
    marginBottom: 18,
    textAlign: 'center',
    borderColor: '#009387',
    marginTop: 14,
  },
})

//exporting the CancelAppointment functional component
export default CancelAppointment;
