import * as Location from 'expo-location';

import { ActivityIndicator, Button, FlatList, Linking, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { sendEmailVerification, signOut } from 'firebase/auth';

import AddToDoModal from '../components/AddToDoModal';
import AppStyles from '../styles/AppStyles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Header } from 'react-native-elements';
import InlineTextButton from '../components/InlineTextButton';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import UpdateToDo from './Update';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import location from '../components/AddToDoModal'
import {title} from '../components/AddToDoModal';

// import React from 'react';
// import { useState } from 'react';




// import { Link, NavigationContainer } from '@react-navigation/native';





// import StickyParallaxHeader from 'react-native-sticky-parallax-header'


// import ToDoUpdate from './screens/Update';

export default function ToDo({ navigation }) {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [toDos, setToDos] = React.useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // useLayoutEffect(() => {
  //   navigation.setoptions ({
  //     headerLeft: () => {
  //       <TouchableOpacity onPress={()=> {navigation.navigate("Search")}} title="Search"></TouchableOpacity>
  //     }
  //   })
  // })

  
    
useEffect(()=>{
  //console.log(" Profile : called anytime a specific state variable changes");
  navigation.setOptions({
    headerLeft: () => (
         <TouchableOpacity onPress={()=> navigation.navigate("Sample")}>
         <Text  style={{fontWeight: 'bold',color: 'black'}}>More</Text>
         </TouchableOpacity>
    )
  })
});


 useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
    // alert(text)
  } else if (location) {
    text = JSON.stringify(location);
    // alert(text)
  }
  let loadToDoList = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  let checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, 'todos', item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  let deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    alert('Deleted Succesfully')
    let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

  let renderToDoItem = ({item}) => {
    return (
      <View style={[AppStyles.k, AppStyles.rightMargin, AppStyles.leftMargin]}>
        <View style={AppStyles.fillSpace}>
          <View color="white">
            <Text style={{fontSize:20, fontWeight:'bold'}}>Title:{item.title}</Text>
            {/* <Text style={{fontSize:20, fontWeight:'bold', marginBottom: 10}}>{item.title}</Text> */}
            {/* <Text>{location.coords.latitude}{location.coords.longitude}</Text>  */}
            {/* <Text style={{fontSize:20, fontWeight:'bold', marginBottom: 10}}>Description</Text> */}
            {/* <Text style={{fontSize:20, fontWeight:'bold'}} numberOfLines={1}>Description:{item.text}</Text> */}
            <Text style={{color: 'blue', fontSize: 15, marginTop: 50}}
      onPress={() => Linking.openURL(item.link)}>Location</Text>
          </View>
        </View>
        <Ionicons name="trash-bin-sharp" size={24} color="black"  onPress={() => deleteToDo(item.id)} style={{paddingRight: 10}}/>
        {/* <InlineTextButton text="Delete" color='#9CC3D5FF' onPress={() => deleteToDo(item.id)} /> */}
        <AntDesign name="edit" size={24} color="black" onPress={()=> {navigation.navigate('UpdateD', {tex: item.text, id: item.id, title: item.title})}}/>
        {/* <InlineTextButton text="Update" color='#9CC3D5FF' onPress={()=> {navigation.navigate('UpdateD', {tex: item.text, id: item.id, title: item.title})}} /> */}
      </View>
   
    );
    alert("deleted succesfully")
  }

  let showToDoList = () => {
    return (
      <View style={{ height:550,width:'100%' }}>
        <FlatList
          data={toDos}
          // scrollEnabled={isScrollEnabled}
          refreshing={isRefreshing}
          onRefresh={() => {
            loadToDoList();
            setIsRefreshing(true);
          }}
          renderItem={renderToDoItem}
          keyExtractor={item => item.id} />
      </View>
    )
  };

  let showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList() }
        <Button 
          title="Add Notes" 
          onPress={() => setModalVisible(true)} 
          color="#0063B2FF" styles={{backgroundColor:'#9CC3D5FF', borderRadius: 5, width: 50}} />
      </View>
    );
  };

  let showSendVerificationEmail = () => {
    return (
      <View>
        <Text>Please verify your email to use Notes</Text>
        <Button title="Send Verification Email" onPress={() => sendEmailVerification(auth.currentUser)} />
      </View>
    );
  };

  // let renderheader = () => {}
  

  let addToDo = async (todo, title) => {
    let lat = JSON.stringify(location.coords.latitude);
    let long = JSON.stringify(location.coords.longitude);
    let toDoToSave = {
      title: title,
      text: todo,
      completed: false,
      userId: auth.currentUser.uid,
      latitude: JSON.stringify(location.coords.latitude),
      longitude: JSON.stringify(location.coords.longitude),
      link : `http://maps.google.com/maps?q=${lat},${long}+(My+Point)&z=14&ll=${lat},${long}`
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);
    alert('Added succesfully')
    setToDos(updatedToDos);
  };


// let signOutUser = () => {
//     // alert("hii");
//     try {
//       signOut(auth);
//       navigation.navigate('Login');
//     } catch (e) {
//       alert(e)
//         console.log(e);
//     }
// }

  return (
    <SafeAreaView>
      <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin, AppStyles.topMargin]}>
      {/* <Header
      style={{minWidth: "100%"}}

        backgroundColor="#0063B2FF"

        placement="left"

        leftComponent={{ text: 'Search Here', style: { color: '#ffffff', minWidth: "100%" }, onPress: () => {navigation.navigate("Search")}}}

        centerComponent={{ text: 'Signout', style: { color: '#ffffff' }, onPress: () => signOutUser()}}

        rightComponent={{ text: 'Manage Account', style: { color: '#ffffff' }, onPress: () => signOutUser()}}

      /> */}


    {/* <StickyParallaxHeader headerType="AvatarHeader" /> */}
    {/* <StickyParallaxHeader headerType="DetailsHeader" /> */}
        {/* <Button title='Logout' onPress={() => signOutUser()}></Button> */}
        {/* <Button style={{backgroundColor: "#9CC3D5FF", paddingBottom: 40}} title='Search here' onPress={() => {navigation.navigate("Search")}}></Button> */}
        {/* <InlineTextButton style={{backgroundColor: "#0063B2FF", paddingBottom: 40}} text="Manage Account" /> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <AddToDoModal 
          onClose={() => setModalVisible(false)}
          addToDo={addToDo}
           />
      </Modal>
      {/* <Text style={AppStyles.header}>Notes App</Text> */}
      {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
    </SafeAreaView>
  );
}
