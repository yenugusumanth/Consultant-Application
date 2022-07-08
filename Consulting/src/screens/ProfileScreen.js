import {View, Text, Button, Alert, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';

import {getuserDetails} from '../ServerApis/UserApis';

const ProfileScreen = props => {

  //destructuring the props
  const {navigation} = props;

  //creating the state variables
  const [userData, setUserData] = useState([{}]);

  //creating a useEffect hook to get the appointments from the server apis without manual interface (Automatic)
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDetails();
    });
    return unsubscribe;
  }, [navigation]);

  //creating a state variable to store the user details
  const [dateString, setDateString] = useState("2022-08-12");

  //creating the function to get the user details from the server apis
  const getDetails = async () => {
    const data = await getuserDetails();
    await setUserData(data);
  };

  //retunring the JSX
  return (
    <View style={styles.mainView} onLayout={getDetails}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Name : {userData.name}</Text>
        <Text style={styles.text}>Email : {userData.email}</Text>
        <Text style={styles.text}>DOB:{userData.DOB}</Text>
        <Text style={styles.text}>Address : {userData.address}</Text>
        <Text style={styles.text}>Phone No : {userData.phone}</Text>
      </View>
    </View>
  );
};

//exporting the ProfileScreen
export default ProfileScreen;

//creating the styles
const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    alignItems: 'center',
    //justifyContent:"center",
    backgroundColor: '#00938720',
  },
  text: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00000098',
    marginLeft: 20,
  },
  infoContainer: {
    alignItems: 'baseline',
    justifyContent: 'center',
    backgroundColor: '##00938705',
    width: '85%',
    borderRadius: 10,
    height: '60%',
    borderWidth: 4,
    borderColor: '#00000070',
    marginTop: 120,
  },
});
