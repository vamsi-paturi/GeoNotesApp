import { Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { StatusBar } from 'expo-status-bar';

export default function App({navigate, route}) {  

    
  return (
    <View style={styles.container}>
      <Image source= {{ uri: 'https://cdn.pixabay.com/photo/2016/03/27/23/11/post-it-notes-1284667__340.jpg', method: 'POST', 
                    headers: { Pragma: 'no-cache' },body: 'Your Body goes here'  }} 
                    style={{ width: 350, height: 200, padding: 20,margin: 40 }}/>
      <Image source= {{ uri: 'https://image.slidesharecdn.com/effectivenotetaking-12414452574-phpapp01/85/effective-note-taking-2-320.jpg?cb=1241427288', method: 'POST', 
                    headers: { Pragma: 'no-cache' },body: 'Your Body goes here'  }} 
                    style={{ width: 350, height: 300, padding: 20,margin: 40}}/>        

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
});
