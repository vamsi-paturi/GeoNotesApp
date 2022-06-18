import { Button, Text, TextInput, View } from 'react-native';
import { auth, db } from "../firebase";
import { collection, getDocs, query, where, writeBatch } from "firebase/firestore";
import { deleteUser, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth';

import AppStyles from '../styles/AppStyles';
import React from 'react';

export default function ManageAccount({ navigation }) {
  let [newPassword, setNewPassword] = React.useState("");
  let [currentPassword, setCurrentPassword] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");
  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  }

  let updateUserPassword = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updatePassword(user, newPassword).then(() => {
          setNewPassword("");
          setErrorMessage("");
          setCurrentPassword("");
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  let deleteUserAndToDos = () => {
    if (currentPassword === "") {
      setErrorMessage("Must enter current password to delete account");
    } else {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        // Get all todos for user and delete
        let batch = writeBatch(db);
        const q = query(collection(db, "todos"), where("userId", "==", user.uid));
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
          batch.commit();
  
          deleteUser(user).then(() => {
            navigation.popToTop();
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    }
  };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.passwordInput]} 
          placeholder='Current Password'
          value={currentPassword}
          secureTextEntry={true}
          onChangeText={setCurrentPassword} />
      <TextInput 
          style={[AppStyles.textInput, AppStyles.passwordInput]} 
          placeholder='New Password'
          value={newPassword}
          secureTextEntry={true}
          onChangeText={setNewPassword} />
          <View >
            <Button title="Update Password" onPress={updateUserPassword} style={{marginBottom: 10}}/>
            <Button title="Delete User" onPress={deleteUserAndToDos} style={{marginBottom: 10}}/>
            <Button title="Logout" onPress={logout} style={{marginBottom: 10}}/>
            <Button title="Back to ToDos" onPress={() => navigation.pop()} style={{marginBottom: 10}}/>
          </View>
    </View>
  );
}