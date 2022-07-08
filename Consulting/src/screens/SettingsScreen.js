import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

import {getuserDetails, updateProfile} from '../ServerApis/UserApis';

//creating the functional component bookappointment
const SettingsScreen = props => {

  //destructuring the props
  const {navigation} = props;

  //creating the state variables for all the inputs
  const [userData, setUserData] = useState([{}]);

  //creting the useEffect hook to get the appointments from the server apis without manual interface (Automatic)
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDetails();
    });
    return unsubscribe;
  }, [navigation]);

  //creating the fucntion to get the user details from the server apis
  const getDetails = async () => {
    const data = await getuserDetails();
    await setUserData(data);
    console.log('userDaata : ', userData);
    await setData({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      DOB: userData.DOB,
    });
    console.log('userData', data);
  };

  //creating the state variables for all the inputs
  const [update, setUpdate] = useState(true);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    DOB: '',
  });

  //creating the function to update the user details
  const updateDetails = async () => {
    const sendDetails = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      DOB: data.DOB,
    };
    const returnData = await updateProfile(sendDetails);
    console.log('returnData : ', returnData);
    Alert.alert('Success', 'User details updated successfully');
  };

  //retunring the JSX
  return (
    <View onLayout={getDetails}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold', color: '#fff'}}>Settings</Text>
      </View>
        <View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              defaultValue={userData.email}
              editable={false}
              style={styles.input}
            />
            <Text style={{paddingRight: 188, marginTop: 5}}>Name</Text>
            <TextInput
              placeholder="Name"
              autoCapitalize="none"
              defaultValue={userData.name}
              editable={true}
              onChangeText={val => setData({name: val})}
              style={styles.input}
            />
            <Text style={{paddingRight: 150, marginTop: 5}}>Date of Birth</Text>
            <TextInput
              placeholder="DOB"
              autoCapitalize="none"
              defaultValue={userData.DOB}
              editable={true}
              onChangeText={val =>
                setData({
                  ...data,
                  DOB: val,
                })
              }
              style={styles.input}
            />
            <Text style={{paddingRight: 130, marginTop: 5}}>Phone Number</Text>
            <TextInput
              placeholder="Phone"
              autoCapitalize="none"
              defaultValue={userData.phone}
              editable={true}
              onChangeText={val => setData({phone: val})}
              style={styles.input}
            />
            <Text style={{paddingRight: 170, marginTop: 5}}>Address</Text>
            <TextInput
              placeholder="Address"
              autoCapitalize="none"
              defaultValue={userData.address}
              editable={true}
              onChangeText={val =>
                setData({
                  ...data,
                  address: val,
                })
              }
              style={styles.input}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.done} onPress={updateDetails}>
              <Text style={styles.doneText}>Update Details</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.done}
              onPress={() => navigation.navigate('HomeDrawer')}>
              <Text style={styles.doneText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

//exprting the component
export default SettingsScreen;

//creating the stylesheet
const styles = StyleSheet.create({
  header: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009387',
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    width: '60%',
    marginBottom: 18,
    textAlign: 'center',
    borderColor: '#009387',
    marginTop: 10,
  },
  done: {
    backgroundColor: '#009387',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 40,
  },
  doneText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
