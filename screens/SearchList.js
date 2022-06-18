import {React,useState} from "react";
import {View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList, TextInput, StyleSheet} from 'react-native';
import { auth, db } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";

const Search = () => {
    // const [data, setData] = useState([]);
    const [dataFromState, setData] = useState([]);
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
        setData(toDos)
        // alert(toDos)
    }
    loadToDoList();



    
    const item = ({item}) => {
        return(
            <View style={{backgroundColor: 'green'}}>
                <Text>{item.text}</Text>
            </View>
        )
    }

   const searchName = (input) => {
    let data = dataFromState;
    let searchData = data.filter((item)=>{
        return item.text.toLowerCase().includes(input.toLowerCase())
    });
    setData(searchData)

   }
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
                <TextInput
                    placeholder="Search here..."
                    onChangeText={(input)=> {
                        searchName(input)
                    }}
                />
            </View>
            <FlatList
            data={dataFromState}
            renderItem={item}
            keyExtractor={(item, index) =>index.toString()}
            />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({

})