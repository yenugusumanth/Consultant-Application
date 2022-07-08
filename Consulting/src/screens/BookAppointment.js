import {
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  getConsultantSlots,
  userBookAppointment,
  getuserDetails,
  updateSlot,
} from '../ServerApis/UserApis';

import {ConsultantDetails} from '../Data/ConsultantData';

//creating the functional component bookappointment
const BookAppointment = props => {

  //destructuting the props
  const {navigation} = props;

  //stroring the email passed from parent screen as a props
  const email = props.route.params.docEmail;

  //creating the state variables for all the inputs
  const [slotDetails, setslotDetails] = useState([{}]);
  const [doctorEmail, setdoctorEmail] = useState(props.route.params.docEmail);
  const [reason, Setreason] = useState('');
  const [slotTime, setSlotTime] = useState(false);
  const [slot, setslot] = useState(false);
  const [textslot, setTextslot] = useState(false);
  const [slotSelected, setSlotSelected] = useState(0);
  const [slotUpdateDetails, setSlotUpdateDetails] = useState({slotId:"",doctorEmail:""});

  //creating a function to get the slots from the server apis
  const getSlots = async () => {
    const data = await props.route.params.docEmail;
    const returnData = await getConsultantSlots(email);
    await setslotDetails(returnData);
    console.log("return data : ",returnData);
    if (returnData.length > 0) {
      console.log('if cosndition');
      setslot(true);
    } else {
      console.log('else cosndition');
      setTextslot(true);
    }
  };

  //craeting the cancel function to cancel the appointment
  const Cancel = async () => {
    Alert.alert('Cancelled');
    navigation.navigate('HomeDrawer');
    await setslotDetails('');
    await setslot(false);
    setTextslot(false);
    setSlotSelected(0);
  };

  //creating the function to book the appointment
  const BookSlot = async () => {
    if (slotSelected && reason.length > 0) {
      const userDetails = await getuserDetails();
      console.log("slotUpdateDetails : ",slotUpdateDetails);
      const data = {
        doctorEmail: doctorEmail,
        userEmail: userDetails.email,
        date: slotTime,
        bookingStatus: true,
        reason: reason,
        slotId: slotUpdateDetails.slotId,
      };
      console.log("sample data :",data);
      await userBookAppointment(data);
      console.log("slotdetails : ",slotDetails);
      await updateSlot(slotUpdateDetails);
      Alert.alert(
        'Success',
        `Appointment booked with ${props.route.params.docName}`,
      );
      navigation.navigate('HomeDrawer');
      await setslotDetails('');
      await setslot(false);
      setTextslot(false);
      setSlotSelected(0);
    } else {
      Alert.alert('Alert', 'Please Enter reason and select a slot');
    }
  };

  //creating the slot function to get the slots from the server apis
  const slotUpdate = (id,mail) => {
    setSlotUpdateDetails({slotId:id,doctorEmail:mail})
    //console.log("details : ",slotUpdateDetails);
  }

  //returning the JSX
  return (
    <ScrollView>
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Book your Appointment</Text>
        <Text style={{paddingRight: 145, marginTop: 5}}>Doctor Name</Text>
        <TextInput
          autoCapitalize="none"
          defaultValue={props.route.params.docName}
          editable={false}
          style={styles.input}
        />
        <Text style={{paddingRight: 145, marginTop: 5}}>Doctor Email</Text>
        <TextInput
          autoCapitalize="none"
          defaultValue={props.route.params.docEmail}
          editable={false}
          style={styles.input}
        />
        <Text style={{paddingRight: 70, marginTop: 5}}>
          Reason for Appointment
        </Text>
        <TextInput
          placeholder="Reason"
          autoCapitalize="none"
          editable={true}
          style={styles.input}
          onChangeText={value => {
            Setreason(value);
          }}
        />
      </View>
      <View style={styles.getslot}>
        <TouchableOpacity style={styles.fav1} onPress={() => getSlots()}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            Tap to get Available slots
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {slot ? (
          <View style={styles.ViewFlatList}>
            <FlatList
              data={slotDetails}
              renderItem={({item, status}) =>
                !item.status ? (
                  <View style={styles.flatList}>
                    <View style={styles.flatListText}>
                      <Text style={styles.flatListTextTitle}>
                        {item.doctorEmail}
                      </Text>
                      <Text style={styles.flatListTextDesciption}>
                        {item.date}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.fav}
                      onPress={() => {
                        setSlotTime(item.date);
                        Alert.alert(
                          'Success',
                          `Slot Selected for ${item.date}`,
                        );
                        setSlotSelected(1);
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                        onPress={() => slotUpdate(item.slotId,item.doctorEmail)}
                        >
                        Select
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (null)
              }
              keyExtractor={item => item.slotId}
              horizontal={true}
              scrollEnabled
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : textslot ? (
          <View>
            <Text style={{marginLeft: 130}}>No Slots Avaliable</Text>
          </View>
        ) : null}
      </View>
      <View style={{marginLeft: 50}}>
        <TouchableOpacity style={styles.done} onPress={BookSlot}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancel} onPress={Cancel}>
          <Text style={styles.doneText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

//exporting the component
export default BookAppointment;

//creating the styles
const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
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
  },
  heading: {
    paddingTop: 20,
    paddingBottom: 20,
    color: '#009387',
    fontSize: 20,
    fontWeight: 'bold',
  },
  done: {
    backgroundColor: '#009387',
    width: '85%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  cancel: {
    backgroundColor: '#36454f',
    width: '85%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 25,
  },
  doneText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  slot: {
    flexDirection: 'column',
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#36454f',
    margin: 7,
    height: 80,
    width: 105,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewFlatList: {
    // flex:0.9,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  flatList: {
    flex: 1,
    height: 130,
    width: '100%',
    marginLeft: 35,
    marginBottom: 8,
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 4.5,
    borderColor: '#00000030',
    shadowColor: '#00000070',
  },
  image: {
    height: '65%',
    borderRadius: 60,
    width: 120,
    marginLeft: 100,
  },
  flatListText: {
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    padding: 2,
    borderRadius: 10,
  },
  flatListTextTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  flatListTextDesciption: {
    fontSize: 12,
    color: 'black',
  },
  headline: {
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  fav1: {
    backgroundColor: '#36454f',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 38,
  },
  fav: {
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 0,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#01ab9d',
    height: 35,
    width: 75,
    alignItems: 'center',

    border: 5,
    borderWidth: 2,
    borderColor: '#00000030',
    justifyContent: 'center',
  },
  getslot: {
    marginTop: 15,
    marginBottom: 15,
  },
});
