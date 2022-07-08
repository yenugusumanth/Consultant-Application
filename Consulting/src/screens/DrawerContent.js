import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {AuthContext} from '../components/context';

import {userLogout, getuserDetails} from '../ServerApis/UserApis';

//creating the function component naming DrawerContent
export function DrawerContent(props) {

  //creating the variable to store the usetheme function
  const paperTheme = useTheme();

  //destructing the global props from authcontext fir navigation
  const {logout} = React.useContext(AuthContext);
  const {toggleTheme} = React.useContext(AuthContext);

  //creating the function to logout the user
  const logout1 = () => {
    userLogout();
    logout();
  };

  //destructing the props object
  const {navigation} = props;

  //creating the states variables for the input fields
  const [userData, setUserData] = React.useState([{}]);

  //creating the getdetails function to get the user details from the server apis
  const getDetails = async () => {
    const data = await getuserDetails();
    await setUserData(data);
    console.log(userData);
  };

  //returning the JSX component
  return (
    <View style={{flex: 1}} onLayout={getDetails}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrb7XeVpElaj3yF0M2zBadpBwR1H32HQQumw&usqp=CAU',
                }}
                size={70}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{userData.name}</Title>
                <Caption style={styles.caption}>{userData.email}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  Address:
                </Paragraph>
                <Caption style={styles.caption}>{userData.address}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({focused}) => (
                <FontAwesome5 name="home" color={'#009387'} size={20} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <FontAwesome5 name="user" color={'#009387'} size={20} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <FontAwesome5 name="cogs" color={'#009387'} size={20} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <FontAwesome5 name="headset" color={'#009387'} size={20} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text style={{fontWeight: 'bold', color: '#009387'}}>
                  Dark Theme
                </Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <FontAwesome5 name="user-lock" color={'#009387'} size={20} />
          )}
          label="Sign Out"
          onPress={() => logout1()}
        />
      </Drawer.Section>
    </View>
  );
}

//creating the stylesheet
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#009387',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
