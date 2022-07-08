import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { DrawerContent } from './src/screens/DrawerContent';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from './src/components/context';

import MainTabScreen from './src/screens/MainTabScreen';
import SupportScreen from './src/screens/SupportScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BookAppointment from './src/screens/BookAppointment';

import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPassword from './src/screens/ForgotPassword';

import ConsultantHomeScreen from './src/screens/ConsultantScreens/ConsultantHomeScreen';
import ConsultantProfileScreen from './src/screens/ConsultantScreens/ConsultantProfileScreen';
import { ConsultantDrawerContent } from './src/screens/ConsultantScreens/ConsultantDrawerContent';
import ConsultantSignInScreen from './src/screens/ConsultantScreens/ConsultantSignInScreen';
import AddSlot from './src/screens/ConsultantScreens/AddSlot';
import CancelAppointment from './src/screens/ConsultantScreens/CancelAppointment';

const Drawer = createDrawerNavigator();

const RootStack = createStackNavigator();

//creating a functional component naming Authentication
const Authentication = (props) => {

  //returning the JSX component with drawer navigation
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}
    drawerContent={props => <DrawerContent {...props} />}>   
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen}  />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        <Drawer.Screen name="BookAppointment" component={BookAppointment} />
    </Drawer.Navigator>
  )
}

//creating a functional component naming RootScreen
const RootScreen = (props) => {

  //returning the JSX component with stack navigation
  return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
      </RootStack.Navigator>
  )
}

//creating a functional component naming ConsultantRootScreen
const ConsultantRootScreen = (props) => {

  //returning the JSX component with drawer navigation
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true,headerTintColor:"#009387" }}
    drawerContent={props => <ConsultantDrawerContent {...props} />}>   
        <Drawer.Screen name="Your Appointments" component={ConsultantHomeScreen}  />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        <Drawer.Screen name="ConsultantProfileScreen" component={ConsultantProfileScreen} />
        <Drawer.Screen name="AddSlot" component={AddSlot} />
        <Drawer.Screen name="CancelAppointment" component={CancelAppointment} />
    </Drawer.Navigator>
  )
}

//creating a functional component naming ConsultantAuth
const ConsultantAuth = () => {

  //returning the JSX component with stack navigation
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="ConsultantSignInScreen" component={ConsultantSignInScreen} />
    </RootStack.Navigator>
  )
}

//creating a functional component naming App
const App = () => {

  //creating a state variable for the theme
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  //taking the initial value of login state
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  //creating a objexct variable for the default Theme
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  //creating a object for dark theme 
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  //assingning the theme to the state using tenanry operator
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  //state for user login
  const [loginState, setLoginState] = useState(false);

  //state for consultant or user check
  const [isConsultant, setIsConsultant] = useState(false);

  //state for consultant login
  const [consultantLogin, setConsultantLogin] = useState(false);

  //creating a globla props for to access this props all over the app
  const authContext = React.useMemo( () => ({
    signIn: async () => {
      try{
        setLoginState(true);
      }catch(e){
        console.log(e);
      }
    },
    logout: async () => {
      try{
        setLoginState(false);
      }catch(e){
        console.log(e);
      }
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    },
    consultantSignIn: async (flag) => {
      try{
        setConsultantLogin(flag);
      }catch(e){
        console.log(e);
      }
    },
    isConsultantCheck : async (flag) => {
      try{
        setIsConsultant(flag)
      }catch(e){
        console.log(e);
      }
    }
  }), []);


  //returning the JSX component
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
            {
              !isConsultant ? 
                !loginState ? (
                  <RootScreen/>
                )
                  :(
                    <Authentication/>
                )
              :
                !consultantLogin ? (
                  <ConsultantAuth/>
                )
                  :(
                  <ConsultantRootScreen/>
                )
              
            }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

//exporting the app
export default App