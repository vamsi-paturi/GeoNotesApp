import { View, Text, TextInput, Button } from 'react-native';
// import {React, useState, useEffect} from 'react';
import AppStyles from '../styles/AppStyles';
// import * as Location from 'expo-location';
import React, { Component, useEffect, useState } from 'react';


export default function AddToDoModal(props) {
  let [todo, setTodo] = React.useState("");
  let [title, setTitle] = React.useState("");
  // let [location, setLocation] = React.useState([])
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);


  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  //   // alert(text)
  // } else if (location) {
  //   text = JSON.stringify(location);
  //   // alert(text)
  // }
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Notes</Text>
      <TextInput
        placeholder="Add title...."
        multiline={true}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder='Write Something'
        multiline={true}
        value={todo}
        onChangeText={setTodo} />
      <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]}>
        {/* <Button title='Tag Location' onPress={()=>{getLocation()}} style={{paddingRight: 10}}></Button> */}
        <Button title="Cancel" onPress={props.onClose} />
        <Button title="OK" onPress={() => {
          props.addToDo(todo, title);
          setTodo("");
          props.onClose();
        }} />
      </View>
    </View>
  );
}