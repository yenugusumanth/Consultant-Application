import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';

import {appointments} from '../../Data/ConsultantData';
import {getAppointments} from '../../ServerApis/ConsultantApis';

//creating the function component naming ConsultantHomeScreen
const ConsultantHomeScreen = props => {

  //destructing the props to get the navigation object
  const {navigation} = props;

  //creating a useEffect hook to get the appointments from the server apis without manual interface (Automatic)
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAppointment();
    });
    return unsubscribe;
  }, [navigation]);

  //creating the state variables for the input fields
  const [appointments, setAppointments] = React.useState([{}]);


  //creating the function to get the appointments from the server apis
  const getAppointment = async () => {
    console.log('called appointmetns');

    //calling the get appointments function from the server apis
    const data = await getAppointments();
    await console.log('data : ', data);
    //setting the state variables to the data received from the server apis
    await setAppointments(data.data);
    console.log('Appointments : ', appointments);
  };

  //creating the state variables for the input fields
  const [expToggle, setExpToggle] = React.useState(false);
  const [nameToggle, setNameToggle] = React.useState(false);

  //creating the function to get the appointments from the server apis
  const sortData1 = () => {
    //checking the value of the expToggle state variable
    if (!expToggle) {
      //setting the state variables to the data received from the server apis
      setAppointments(appointments.sort((a, b) => (a.date < b.date ? 1 : -1)));
      //setting the state variables to the data received from the server apis
      setExpToggle(!expToggle);
      console.log('1 data', appointments);
    } else {
      setAppointments(appointments.sort((a, b) => (a.date > b.date ? 1 : -1)));
      setExpToggle(!expToggle);
      console.log('1 data', appointments);
    }
  };

  //creating the function to get the appointments from the server apis
  const sortData2 = () => {
    //checking the value of the nameToggle state variable
    if (!nameToggle) {
      //setting the state variables to the data received from the server apis
      setAppointments(
        appointments.sort((a, b) => (a.userEmail > b.userEmail ? 1 : -1)),
      );
      //setting the state variables to the data received from the server apis
      setNameToggle(!nameToggle);
      console.log('1 data', appointments);
    } else {
      //setting the state variables to the data received from the server apis
      setAppointments(
        appointments.sort((a, b) => (a.userEmail < b.userEmail ? 1 : -1)),
      );
      //setting the state variables to the data received from the server apis
      setNameToggle(!nameToggle);
      console.log('1 data', appointments);
    }
  };

  //creating the function to get the appointments from the server apis
  const sortData3 = () => {
    //checking the value of the expToggle state variable
    setAppointments(appointments.sort((a, b) => (a.key > b.key ? 1 : -1)));
    setNameToggle(false);
    setExpToggle(false);
    console.log('1 data', appointments);
  };

  //returning the JSX component
  return (
    <View style={styles.ViewFlatList} onLayout={getAppointment}>
      <ScrollView style={{marginTop: 15}} horizontal={true}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#00000099',
              marginLeft: 10,
              marginTop: 13,
            }}>
            Filter by :{' '}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              marginHorizontal: 9.5,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#00000070',
              borderRadius: 10,
              height: 50,
              width: 83,
              backgroundColor: '#01ab9d99',
            }}
            onPress={sortData1}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
              date
            </Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
              ↑ - ↓ / ↓ - ↑
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              marginHorizontal: 9.5,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#00000070',
              borderRadius: 10,
              height: 50,
              width: 83,
              backgroundColor: '#01ab9d99',
            }}
            onPress={sortData2}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
              Name
            </Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
              ↑ - ↓ / ↓ - ↑
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              marginHorizontal: 9.5,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#00000070',
              borderRadius: 10,
              height: 50,
              width: 83,
              backgroundColor: '#36454f99',
            }}
            onPress={sortData3}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
              Clear all
            </Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 13}}>
              Filters
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {expToggle ? (
        <FlatList
          data={appointments}
          renderItem={({item}) => (
            <View style={styles.flatList}>
              <View style={styles.flatListText}>
                <Text style={styles.flatListTextTitle}>{item.userEmail}</Text>
                <Text style={styles.flatListTextDesciption}>{item.reason}</Text>
                <Text style={styles.flatListTextDesciption}>{item.date}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: item.bookingStatus ? 'green' : 'red',
                  }}>
                  {item.bookingStatus ? 'Confirmed' : 'Cancelled'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.fav}
                onPress={() =>
                  navigation.navigate('CancelAppointment', {
                    email: item.userEmail,
                    slotId: item.slotId,
                  })
                }>
                <Text
                  style={{
                    color: 'white',
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontWeight: 'bold',
                    fontSize: 10,
                  }}>
                  Cancel
                </Text>
                <Text
                  style={{
                    color: 'white',
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontWeight: 'bold',
                    fontSize: 10,
                  }}>
                  Appointment
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      ) : (
        <FlatList
          data={appointments}
          renderItem={({item}) => (
            <View style={styles.flatList}>
              <View style={styles.flatListText}>
                <Text style={styles.flatListTextTitle}>{item.userEmail}</Text>
                <Text style={styles.flatListTextDesciption}>{item.reason}</Text>
                <Text style={styles.flatListTextDesciption}>{item.date}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: item.bookingStatus ? 'green' : 'red',
                  }}>
                  {item.bookingStatus ? 'Confirmed' : 'Cancelled'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.fav}
                onPress={() =>
                  navigation.navigate('CancelAppointment', {
                    email: item.userEmail,
                    slotId: item.slotId,
                  })
                }>
                <Text
                  style={{
                    color: 'white',
                    paddingTop: 6,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontWeight: 'bold',
                    fontSize: 10,
                  }}>
                  Cancel
                </Text>
                <Text
                  style={{
                    color: 'white',
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontWeight: 'bold',
                    fontSize: 10,
                  }}>
                  Appointment
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};


//creating the styles for the component
const styles = StyleSheet.create({
  ViewFlatList: {
    flex: 1,
    // marginTop: 10,
    // marginStart: 10,
    // marginEnd: 10,
    backgroundColor: '#01ab9d10',
  },
  flatList: {
    flex: 1,
    height: 130,
    width: '82%',
    marginTop: 15,
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
    height: '55%',
    borderRadius: 60,
    width: 100,
    marginLeft: 100,
    marginTop: 4,
  },
  flatListText: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding: 2,
    borderRadius: 10,
    marginTop: 20,
  },
  flatListTextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  flatListTextDesciption: {
    fontSize: 13,
    color: 'black',
  },
  fav: {
    position: 'absolute',
    marginBottom: 40,
    margin: 10,
    right: 0,
    bottom: 0,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#01ab9d',
    height: 45,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    border: 5,
    borderWidth: 2,
    borderColor: '#00000030',
  },
  headline: {
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
  },
});

export default ConsultantHomeScreen;
