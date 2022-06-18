// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/
 
// import React in our code
// import React, {useState, useEffect} from 'react';
import { View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList, TextInput, StyleSheet } from 'react-native';
// import InlineTextButton from '../components/InlineTextButton';
// import AppStyles from '../styles/AppStyles';
import { auth, db } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
// import {writeJsonFile} from 'write-json-file';
// import { sendEmailVerification } from 'firebase/auth';
// import UpdateToDo from './Update';
import React from 'react';
// import * as RNFS from 'com.rnfs.RNFSPackage';
import { useState, useEffect } from 'react';
// import SyncStorage from 'sync-storage';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as RNFS from 'react-native-fs';
// import ToDo from './ToDo'
// import { set } from 'lodash';
// import * as RNFS from 'react-native-fs';
const App = () => {
  // var RNFS = require('react-native-fs');
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);


  let loadToDoList = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });
    alert('zayn')
    const storeData = async (toDos) => {
      try {
        const jsonValue = JSON.stringify(toDos)
        alert('called')
        await AsyncStorage.setItem('@storage_Key', jsonValue)
      } catch (e) {
        // saving error
        alert('nope')
      }
    storeData();
    }
  }
  loadToDoList();

  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      alert('jsonValue', jsonValue)
      setFilteredDataSource(jsonValue)
      setFilteredDataSource(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;

    } catch(e) {
      alert('hekjwbvkjkwv')
      // error reading value
    }
  getData();
  }
  const searchFilterFunction = (text) => {
    // console.log(masterDataSource)
    // Check if searched text is not blank
    if (text) {
      console.log('kkkkkkkk', text);
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.text
            ? item.text.toUpperCase()
            : ''.toUpperCase();
            // console.log(newData);
          const textData = item.text.toUpperCase();
          // console.log(textData);
          console.log('lll',textData);
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
 
 
 
  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {/* {item.userId} */}
        {/* {'.'} */}
        {item.text.toUpperCase()}
      </Text>
    );
  };
 
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
 
  const getItem = (item) => {
    
    // Function for click on an item
    alert('Id : ' + item.userId + ' Title : ' + item.text);
  };
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 100,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
 
export default App;
