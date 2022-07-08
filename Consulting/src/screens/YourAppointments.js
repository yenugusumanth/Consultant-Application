import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {getMyAppointments} from '../ServerApis/UserApis';

//creating a function component named YourAppointments
const YourAppointment = props => {

  //destructing the props object
  const {navigation} = props;

  //creating a useeffect hook to get the data from the server apis
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDetails();
    });
    return unsubscribe;
  }, [navigation]);

  //creating the state variables for the input fields
  const [appointmentsData, setAppointmentsData] = useState([{}]);
  const [dateString, setDateString] = useState('');

  //creating the getDetails function to get the data from the server apis
  const getDetails = async () => {
    try {
      const appointmentsData = await getMyAppointments();
      await setAppointmentsData(appointmentsData.data);
      console.log('appointmentsData', appointmentsData.data);
    } catch (e) {
      console.log(e);
    }
  };


  //retuning the JSX
  return (
    <View style={styles.ViewFlatList} onLayout={getDetails}>
      <FlatList
        data={appointmentsData}
        renderItem={({item}) => (
          <View style={styles.flatList}>
            <View style={styles.flatListText}>
              <Text style={styles.flatListTextTitle}>
                {item.doctorEmail}
                </Text>
              <Text style={styles.flatListTextDesciption}>
                Date : {item.date}
              </Text>
              <Text
              style={{
                margin:10,
                fontSize: 16,
                fontWeight: 'bold',
                color: item.bookingStatus ? 'green' : 'red',
              }}>
                {item.bookingStatus ? 'Confirmed' : 'Cancelled'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

//creating the styles object
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
    height: 150,
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
  flatListText: {
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    padding: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  flatListTextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    margin:10,
  },
  flatListTextDesciption: {
    fontSize: 13,
    color: 'black',
    margin:10,
  },
});

//exporting the component
export default YourAppointment;
