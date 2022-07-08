import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React from 'react';
import {ConsultantDetails} from '../Data/ConsultantData';

//creating the function component naming CancelAppointment
const HomeScreen = props => {

  //destructing the props object
  const {navigation} = props;

  //creating the state variables for the input fields
  const [consultingData, setData] = React.useState(ConsultantDetails);
  const [expToggle, setExpToggle] = React.useState(false);
  const [nameToggle,setNameToggle] = React.useState(false);

  //creating the sort1 function to sort the data by experience
  const sortData1 = () => {
    if(!expToggle){
    setData(ConsultantDetails.sort((a, b) => (a.Experience < b.Experience) ? 1 : -1));
    setExpToggle(!expToggle);
    console.log("1 data",ConsultantDetails);
    }
    else{
    setData(ConsultantDetails.sort((a, b) => (a.Experience > b.Experience) ? 1 : -1));
    setExpToggle(!expToggle);
    console.log("1 data",ConsultantDetails);

    }
  }

  //creating the sort1 function to sort the data by doctorName
  const sortData2 = () => {
    if(!nameToggle){
      setData(ConsultantDetails.sort((a, b) => (a.doctorName > b.doctorName) ? 1 : -1));
      setNameToggle(!nameToggle);
      console.log("1 data",ConsultantDetails);
      }
      else{
      setData(ConsultantDetails.sort((a, b) => (a.doctorName < b.doctorName) ? 1 : -1));
      setNameToggle(!nameToggle);
      console.log("1 data",ConsultantDetails);
  
      }
  }

  //creating the sort3 function to sort the data by Key
  const sortData3 = () => {

      setData(ConsultantDetails.sort((a, b) => (a.key > b.key) ? 1 : -1));
      setNameToggle(false);
      setExpToggle(false);
      console.log("1 data",ConsultantDetails);
     
  }

  //returning the JSX component
  return (
    <View style={styles.ViewFlatList}>
      <ScrollView style={{marginTop:15}} horizontal={true} >
      <View>
          
            <Text style={{fontSize:16,fontWeight:"bold",marginTop:12,color:"#00000099",marginLeft:10,marginTop:13}}>Filter by : </Text>

        </View>

        <View>
          <TouchableOpacity style={{marginHorizontal:9.5,marginBottom:10,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#00000070",borderRadius:10,height:50,width:83,backgroundColor:"#01ab9d99"}} onPress={sortData1}>
            <Text style={{color: 'white',
                  fontWeight: 'bold',
                  fontSize: 12,}}>Experience</Text>
            <Text style={{color: 'white',
                  fontWeight: 'bold',
                  fontSize: 14,}}>↑ - ↓ / ↓ - ↑</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={{marginHorizontal:9.5,marginBottom:10,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#00000070",borderRadius:10,height:50,width:83,backgroundColor:"#01ab9d99"}} onPress={sortData2}>
            <Text style={{color: 'white',
                  fontWeight: 'bold',
                  fontSize: 12,}}>Name</Text>
            <Text style={{color: 'white',
                  fontWeight: 'bold',
                  fontSize: 14,}}>↑ - ↓ / ↓ - ↑</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={{marginHorizontal:9.5,marginBottom:10,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#00000070",borderRadius:10,height:50,width:83,backgroundColor:"#36454f99"}} onPress={sortData3}>
            <Text style={{color: 'white',
                  fontWeight: 'bold',
                  fontSize: 12,}}>Clear all</Text>
            <Text style={{color: 'white',
                  fontWeight: 'bold',
                  fontSize: 13,}}>Filters</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={{backgroundColor: '#01ab9d50', marginTop: 13}}></View>
      {expToggle ? (
        <FlatList
        data={consultingData}
        renderItem={({item}) => (
          <View style={styles.flatList}>
            <Image
              style={styles.image}
              source={require('../assets/logo2.jpg')}
            />
            <View style={styles.flatListText}>
              <Text style={styles.flatListTextTitle}>{item.doctorName}</Text>
              <Text style={styles.flatListTextDesciption}>
                {item.specialization}
              </Text>
              <Text style={{fontSize: 13,color: 'black',marginBottom:10}}>
                Exp: {item.Experience} years
              </Text>
            </View>
            <TouchableOpacity
              style={styles.fav}
              onPress={() =>
                navigation.navigate('BookAppointment', {
                  docEmail: item.email,
                  docName: item.doctorName,
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
                Book
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
      />
      ):(<FlatList
        data={consultingData}
        renderItem={({item}) => (
          <View style={styles.flatList}>
            <Image
              style={styles.image}
              source={require('../assets/logo2.jpg')}
            />
            <View style={styles.flatListText}>
              <Text style={styles.flatListTextTitle}>{item.doctorName}</Text>
              <Text style={styles.flatListTextDesciption}>
                {item.specialization}
              </Text>
              <Text style={{fontSize: 13,color: 'black',marginBottom:10}}>
                Exp: {item.Experience} years
              </Text>
            </View>
            <TouchableOpacity
              style={styles.fav}
              onPress={() =>
                navigation.navigate('BookAppointment', {
                  docEmail: item.email,
                  docName: item.doctorName,
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
                Book
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
      />)}
      
      <View style={{backgroundColor: '#01ab9d50', marginTop: 15}}></View>
    </View>
  );
};

//creating the styles
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
    height: 190,
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
    margin: 2,
    padding: 2,
    borderRadius: 10,
    marginTop: 12,
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
  headline: {
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  fav: {
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 0,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#01ab9d',
    height: 45,
    width: 90,
    alignItems: 'center',
    border: 5,
    borderWidth: 2,
    borderColor: '#00000030',
  },
});

//export the component
export default HomeScreen;