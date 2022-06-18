// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { auth, db } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { set } from 'lodash';

var global = 1;
const Search = ({navigation}) => {
  var l = []
  const [search, setSearch] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [result, setResult] = useState('');

  let loadToDoList = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });
    setMasterDataSource(toDos)
    setFilteredDataSource(toDos)
    // alert(toDos)
}
loadToDoList();

  const searchFilterFunction = (text) => {
    console.log(text);
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      console.log('kkk',masterDataSource);

    //   const hii = masterDataSource.filter()
      const newData = masterDataSource.filter(function (item) {
        if (item.title == text){

            const itemData = item
            const textData = item.title;
            console.log('jai')
            console.log(item);
            setResult(item);
            // 
            return item;
        }
        // colsole.log('l', newData)
        // const itemData = item
        // return console.log(item.text.includes(text));
        //   ? item.text.toUpperCase()
        //   : ''.toUpperCase();
        //   console.log('ll',newData);
        // const textData = item.text.toUpperCase();
        // return itemData.indexOf(textData) > 0;
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
//   var k = 1;

const cancle = () => {
  navigation.navigate("ToDo")
}
  const ItemView = ({ item }) => {
    // var length = result.length
    if (result.length != 0){
        console.log(result, 'iii')
        var k = result
        l.push(k)
        var j = set(l)
        console.log('ncnwkjcnkueuwhfuihewuuehf',j)
        return (<View style={{width: "100%", height: 100, alignItems: 'center', justifyContent:"center"}}>
          <Text style={{padding: 20}} onPress={()=> {navigation.navigate('UpdateD', {tex: item.text, id: item.id, title: item.title})}}>{result.title}</Text></View>)
    } else{
        return(<View style={{width: "100%", height: 100, alignItems: 'center', justifyContent: "center"}}><Text onPress={()=> {navigation.navigate('UpdateD', {tex: item.text, id: item.id})}}>{item.title}</Text></View>)

    }
  }

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
    alert('Id : ' + item.id + ' Title : ' + item.text);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
        style={{backgroundColor: 'white', color: "black"}}
          lightTheme
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          // onCancel={cancle}
          cancelButtonTitle=''
          // onCancel={()=>{navigation.navigate("ToDo")}}
          value={search}
        />
        <Button title="cancel" onPress={()=>{cancle();}}></Button>
        <View style={{ height:800,width:'100%' }}>
          <FlatList
            // scrollEnabled={isScrollEnabled}
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            // renderItem={ItemView}
            renderItem={ItemView}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 20
  },
  itemStyle: {
    padding: 10,
  },
});

export default Search;