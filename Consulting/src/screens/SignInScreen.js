//Sign In Screen for the App

//importing all the required libraries
import React,{useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';  

import { userAuth } from '../ServerApis/UserApis'; 

//Creating functional component for the Sign In screen
const SignInScreen = (props) => {

    //creating useState hooks to validate the data entered by the user
    const [Emailerror, setEmailError] = useState('');
    const [Passerror, setPassError] = useState('');
    const [validUser,setValidUser] = useState(false);

    //Function to validate the email according to the regEx expression 
    const isEmailValid = (email) => {
      let Pattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      Pattern.test(String(email).toLowerCase())
        ? setEmailError('')
        : setEmailError('Invalid Email Address');
    };
  
    //Function to validate the password according to the regEx expression
    const isPasswordValid = (password) => {
      let Pattern =
      /^[a-zA-Z].{7,10}$/;
      Pattern.test(String(password).toLowerCase())
        ? setPassError('')
        : setPassError('Invalid Password Address');
    };  

    //destructing the props
    const {navigation} = props;

    //Creating a useState hook for storing the data entered by the user
    const [data, setData] = useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    //Using the current theme of the device
    const { colors } = useTheme();

    //Using the globally created props by createContext
    const { signIn,consultantSignIn,isConsultantCheck } = React.useContext(AuthContext);

    //Function to handle any changes in the email section
    const textInputChange = (val) => {

        isEmailValid(val);    
        isPasswordValid(val);

        if( Passerror == "" ||  Emailerror == "" ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    //Function to handle any changes in the password section
    const handlePasswordChange = (val) => {

        isPasswordValid(val);

        if( Passerror == "" ) {
            setValidUser(true);
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setValidUser(false);
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    //Function to handle the entry of password fiel as hidden or shown
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    //Function to handle validity in the email section
    const handleValidEmail = (val) => {

        isEmailValid(val);

        if(Emailerror == ""){
            setValidUser(true);
            setData({
                ...data,
                isValidUser: true
            });
        }else {
            setValidUser(false);
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    //Function to check all the conditions required to sign in successfully and give alerts if any
    const loginHandle = async () => {
      if(Emailerror == ""){
          if(Passerror == ""){
            const details = {
                email: data.username,
                password: data.password
            }
            if(details.email != "" && details.password != ""){
                const userData = await userAuth(details);
                if(userData.data.success === true ){
                    Alert.alert("Login Successful");
                    signIn();
                }else{
                    Alert.alert(
                        'Login Failed',
                        'Invalid Credentials',
                        [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                    );
                }
            }else{
                Alert.alert(
                    'Login Failed',
                    'Invalid Credentials',
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                );
            }
            }
            else{
            Alert.alert("Invalid Password")
        }
        }else{
        Alert.alert("Invalid Email")
      }
    } 

    //Function to check if the user is a consultant or not
    const isConsultantCheck1 = () => {
        console.log("Is Consultant Check");
        isConsultantCheck(true);
    }

    const consultantLogin = () => {
        console.log("Consultant Sign In");
        consultantSignIn(true);
    }

    //Funtion to navigate to the forgot password screen
    const ForgetPass = () => {
        navigation.navigate('ForgotPassword');
    }

    //UI part for the Sign In Screen
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome5
                    name="user"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor={'grey'}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{Emailerror}</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor={'grey'}
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{Passerror}</Text>
            </Animatable.View>
            }
            <TouchableOpacity onPress={ForgetPass}>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                     onPress={() => loginHandle()}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("SignUpScreen")}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => isConsultantCheck1()}>
                    <Text style={{color: '#009387', marginTop:15, paddingTop:15,fontWeight:'bold'}}>Are You Consultant ?</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

//Exporting the Sign In screen to be used in App.js
export default SignInScreen;


//StyleSheet for UI
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });