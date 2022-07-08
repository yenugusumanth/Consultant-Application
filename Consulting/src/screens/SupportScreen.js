import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//creating the functional component named as SupportScreen
export default function SupportScreen() {

  //destructing the usetheme colors
  const { colors } = useTheme();

  //creating the state variables for all the inputs
  return (
    <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
          <View style={styles.header}>
              <Animatable.Image 
                  animation="bounceIn"
                  duraton="1500"
              source={require('../assets/logo4.png')}
              style={styles.logo}
              resizeMode="stretch"
              />
          </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: "#009387"
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: 'white'
            }]}>Need some help ?</Text>
            <Text style={styles.text}>Feel free to get in touch with us</Text>
            
            <View style={{flexDirection:"row",marginTop:10}}>
              <Text style={{marginTop:10,marginRight:10}}>
                <FontAwesome5 name="whatsapp" size={20} color="white" />
              </Text>
              <Text style={{color:'white',marginTop:10}}>Phone No : 123123123</Text>
            </View>
            <View style={{flexDirection:"row",marginTop:10}}>
              <Text style={{marginTop:10,marginRight:10}}>
                <FontAwesome5 name="at" size={20} color="white" />
              </Text>
              <Text style={{color:'white',marginTop:10}}>Email : consultingsupport@gmail.com</Text>
            </View>
            <View style={{flexDirection:"row",marginTop:10}}>
              <Text style={{marginTop:10,marginRight:10}}>
                <FontAwesome5 name="yahoo" size={20} color="white" />
              </Text>
              <Text style={{color:'white',marginTop:10}}>Email : consultingsupport@yahoo.com</Text>
            </View>
            <View style={{flexDirection:"row",marginTop:50,justifyContent:'center',alignItems:"center"}}>
              <Text style={{marginTop:10,marginRight:10}}>
                <FontAwesome5 name="facebook" size={20} color="white" />
              </Text>
              <Text style={{marginTop:10,marginRight:10}}>
                <FontAwesome5 name="instagram" size={20} color="white" />
              </Text>
              <Text style={{marginTop:10,marginRight:10}}>
                <FontAwesome5 name="google" size={20} color="white" />
              </Text>
            </View>
        </Animatable.View>
      </View>
  );
}

//creating the dimensions 
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

//creating the styles
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#009387',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo,
      borderRadius:120,
      borderWidth:4,
      borderColor:"coral"
  },
  title: {
      color: '#05375a',
      fontSize: 35,
      fontWeight: 'bold',
  },
  text: {
      color: 'white',
      fontSize:18,
      marginTop:10
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});
