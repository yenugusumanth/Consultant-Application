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

import { AuthContext } from '../../components/context';


import {ConsultantDetails} from '../../Data/ConsultantData';
import {consultantAuth} from '../../ServerApis/ConsultantApis';

//creating the function component naming CancelAppointment
const ConsultantSignIn = (props) => {

//destructiong the props object
    const [Emailerror, setEmailError] = useState('');
    const [Passerror, setPassError] = useState('');

    //creating the function to validate the regrex for the email
    const isEmailValid = (email) => {
      let Pattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      Pattern.test(String(email).toLowerCase())
        ? setEmailError('')
        : setEmailError('Invalid Email Address');
    };
  
    //creating the function to validate the regrex for the password
    const isPasswordValid = (password) => {
      let Pattern =
      /^[a-zA-Z].{7,10}$/;
      Pattern.test(String(password).toLowerCase())
        ? setPassError('')
        : setPassError('Invalid Password Address');
    };  

    //creating destructing the props
    const {navigation} = props;

    //drestructing the global props for navigation use of context
    const { consultantSignIn,isConsultantCheck } = React.useContext(AuthContext);

    //destructiong the props object
    const [data, setData] = useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    //destructing the usetheme object
    const { colors } = useTheme();

    //creating the function to handle the input fields
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

    //creating the function to handle the input fields
    const handlePasswordChange = (val) => {

        isPasswordValid(val);

        if( Passerror == "" ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    //creating the function to handle the input fields
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidEmail = (val) => {

        isEmailValid(val);

        if(Emailerror == ""){
            setData({
                ...data,
                isValidUser: true
            });
        }else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    //creating the function to handle the input fields
    const loginHandle = async () => {
        isEmailValid(data.username);
        isPasswordValid(data.password);
        let flag = false;
        if(Emailerror == '' && Passerror == ''){
            for(let i=0;i<ConsultantDetails.length;i++){
                if(data.username == ConsultantDetails[i].email && data.password == ConsultantDetails[i].password){
                    Alert.alert("Login Successful");
                    await consultantSignIn(true);
                    const details = {
                        email: data.username,
                        password: data.password
                    }
                    await consultantAuth(details);
                    flag = true;
                }
            }
            if(flag === false){
                Alert.alert(
                    'Invalid Credentials',
                    'Please enter correct credentials',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
            }
        }else{
            Alert.alert(
                'Login Failed',
                'Invalid Email or Password',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
    } 

    //creating the function to handle the input fields
    const consultantCheck = () => {
        isConsultantCheck(false);
    }

    //returning the JSX code
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome Consultant !</Text>
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
                <TouchableOpacity onPress={() => consultantCheck()}>
                    <Text style={{color: '#009387', marginTop:15, paddingTop:20,fontWeight:'bold'}}>Not a Consultant ?</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

//exporting the consultant login screen
export default ConsultantSignIn;

//creating the styles
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
