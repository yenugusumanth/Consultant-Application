//Landing page for the App

//importing all the required libraries
import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//Creating functional component for the Landing screen
const SplashScreen = ({navigation}) => {

     //Using the current theme of the device
    const { colors } = useTheme();             

    //UI part for the Landing Screen
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image           //Animation for the UI
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View               //Animation for the UI
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >                                                   
            <Text style={[styles.title, {
                color: colors.text
            }]}>Book Your Appointments Today !</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            {/*Navigating to the SignIn Screen*/}
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>   
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started {' '}</Text>
                    <FontAwesome5 
                        name="arrow-alt-circle-right"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

//Exporting the Landing screen to be used in App.js
export default SplashScreen;

//specifying the dimentions for the landing page
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;


//StyleSheet for UI
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo,
      borderRadius:80,
      borderWidth:4,
      borderColor:"coral"
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold',
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});