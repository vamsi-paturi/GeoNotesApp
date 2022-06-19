import * as Analytics from "expo-firebase-analytics";

import { ActivityIndicator, Button, FlatList, Linking, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, {useRef} from 'react';
import { auth, db } from "./firebase";
import { sendEmailVerification, signOut } from 'firebase/auth';

import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import Login from './screens/Login';
import ManageAccount from './screens/ManageAccount';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import ResetPassword from './screens/ResetPassword';
import Sample from './screens/Sample';
import Search from './screens/SB';
import SignUp from './screens/SignUp';
import ToDo from './screens/ToDo';
import UpdateD from './screens/Update';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App({ navigation}) {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const Stack = createNativeStackNavigator();

  // const navigation = useNavigation();
  let signOutUser = () => {
    alert("hii");
    try {
      signOut(auth);
      navigate('Login')
    } catch (e) {
      alert(e)
        console.log(e);
    }
}
  return (
    <NavigationContainer       ref={navigationRef}
    onReady={() =>
      (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
    }
    onStateChange={ async () => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.current.getCurrentRoute().name;
      if (previousRouteName !== currentRouteName) {
        await Analytics.logEvent("screen_view", {
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
      }
      // Save the current route name for later comparison
      routeNameRef.current = currentRouteName;
    }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}} />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}} />
        <Stack.Screen
          name="ManageAccount"
          component={ManageAccount}
          options={{headerShown: false}} />
        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={({navigation}) => ({
            title: 'Notes App',
            headerRight: () => (
              <View style={{flexDirection:"row"}}>
              <AntDesign name="logout" size={24} color="black" style={{marginLeft: 20}} onPress={() => {signOut(auth), alert("loggedout"),navigation.navigate('Login')}}/>
              <MaterialIcons name="account-circle" size={24} color="black" style={{marginLeft: 20}} onPress={()=> {navigation.navigate('ManageAccount')}}/> 
              </View>
            )
          })}
          />  
        <Stack.Screen
          name="UpdateD"
          component={UpdateD}
          options={{headerShown: false}} /> 
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}} />
           <Stack.Screen
          name="Sample"
          component={Sample} 
          options={({navigation}) => ({
            title: 'Notes App',
            headerLeft: () => (
              <View style={{flexDirection:"row"}}>
              <MaterialIcons name="arrow-back" size={24} color="black" style={{marginLeft: 20}} onPress={()=> {navigation.navigate('ToDo')}}/> 
              </View>
            )
          })}
          />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}