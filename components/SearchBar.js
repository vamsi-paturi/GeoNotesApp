import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';


const SearchBar = () => {
    return(
        <View style={styles.container}>
            <TextInput placeholder="Search here...." style={styles.searchInput}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    width: '100%',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
},
searchInput: { 
    width: '100%',
    height: '100%',
    paddingLeft: 8,
    fontSize: 20

}

})


export default SearchBar;