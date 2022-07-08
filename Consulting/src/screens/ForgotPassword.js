//importing all the required libraries
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {forgetPass} from '../ServerApis/UserApis';

//Creating functional component for the Forgot Password screen and exporting the same to be used in App.js
export default function ForgotPassword({navigation}) {

  //creating useState hooks to validate the data entered by the user
  const [Emailerror, setEmailError] = useState('');
  const [Passerror, setPassError] = useState('');
  const [validUserEmail, setValidUserEmail] = useState(true);
  const [validUserPass, setValidUserPass] = useState(true);

  //Function to validate the email according to the regEx expression
  const isEmailValid = email => {
    let Pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Pattern.test(String(email).toLowerCase())
      ? setEmailError('')
      : setEmailError('Invalid Email Address');
  };

  //Function to validate the password according to the regEx expression
  const isPasswordValid = passwordpara => {
    let Pattern = /^[a-zA-Z].{7,10}$/;
    Pattern.test(String(passwordpara).toLowerCase())
      ? setPassError('')
      : setPassError('Invalid Password Address');
  };

  //creating useState hooks to get input of email, new password and confirm new password by the user
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');

   //Function to handle any changes in the password section
  const handlePass = val => {
    isPasswordValid(val);
    if (Passerror == '') {
      setPassword(val);
      setValidUserPass(true);
    } else {
      setValidUserPass(false);
    }
  };

  //Function to handle any changes in the email section
  const handleEmail = val => {
    isEmailValid(val);
    if (Emailerror == '') {
      setEmail(val);
      setValidUserEmail(true);
    } else {
      setValidUserEmail(false);
    }
  };

  //Function to check all the conditions required to for new password successfully and give alert if any
  const setPass = () => {
    if (password === confirmPass) {
      const data = {
        email: email,
        password: password,
      };
      forgetPass(data);
      Alert.alert('Success', 'Password Changed successfully', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
        {
          text: 'Go to LogIn Page',
          onPress: () => navigation.navigate('SignInScreen'),
        },
      ]);
    } else {
      Alert.alert('Failed', 'Password Mismatch');
    }
  };

  //UI part for the Forgot Password Screen
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reset your Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={val => handleEmail(val)}
      />
      {validUserEmail ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Email error</Text>
        </Animatable.View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={val => handlePass(val)}
      />
      {validUserPass ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Password error</Text>
        </Animatable.View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={val => setConfirmPass(val)}
      />

      <TouchableOpacity style={styles.Button} onPress={setPass}>
        <Text style={styles.ButtonText}>Set Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{fontWeight: 'bold', marginTop: 40, fontSize: 15}}>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

//StyleSheet for UI
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    marginTop: '10%',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 25,
    color: '#009387',
  },
  input: {
    borderWidth: 1,
    width: '65%',
    borderRadius: 15,
    margin: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  Button: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 25,
    backgroundColor: '#009387',
    marginTop: 10,
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});