import { View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList, TextInput } from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import AppStyles from '../styles/AppStyles';
import { auth, db } from "../firebase";
import { useState } from 'react';
// import { setDoc, getDoc } from 'firebase/firestore';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore"; 
import { sendEmailVerification } from 'firebase/auth';
import UpdateToDo from './Update';
import React from 'react';
import AddToDoModal from '../components/AddToDoModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import todo from './screens/ToDo'

export default function UpdateD({ navigation,route  }) {
  let [text, setText] = useState("")
  let [title, setTitle] = useState("")
  const [userDoc, setUserDoc] = useState(null);
  const Read = () =>{
    //Mark: Reading doc
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));
    getDoc(q)
    //Handling proises 
    .then((snapshot)=>{
      //Mark: success
      if (snapshot.exists){
        setUserDoc(snapshot.data())
      }
      else{
        alert("No Doc Found")
      }
      alert("Success")
    })
    .catch((error)=>{
      //mark failuree
      alert(error.message)
    })

  }

  const Update = (value,title,merge) =>{
    // Mark: updating doc
    // const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));
    const k = doc(db, 'todos', route.params.id);
    setDoc(k, value, title, {merge: merge})
    .then(()=>{
      //Mark: success
      alert("Updated succesfully")

    })
    .catch((error)=>{
      //mark failuree
      alert(error.message)
    })

  }

  return (
    <View style={AppStyles.container}>
      <Text>Update Title</Text>
      <TextInput style={{marginTop: 20, borderWidth: 3, marginBottom: 20}} multiline={true} defaultValue={route.params.title} onChangeText={(title)=>{setTitle(title)}}></TextInput>
      <TextInput style={[AppStyles.textInput, AppStyles.darkTextInput]} multiline={true} defaultValue={route.params.tex} onChangeText={(text)=>{setText(text)}}></TextInput>
      <Button title='Update Doc' onPress={()=>{
        Update({
          "text": text,
          "title": title
        }, true)
      }}></Button>
      <Button onPress={()=>{navigation.navigate('ToDo')}} title='Done' style={{marginTop:20}}></Button>
    </View>
       
  )
}