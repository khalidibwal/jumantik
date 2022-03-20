import React,{useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, Button, Alert} from 'react-native'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';


  
export default function Menu(props){
  const user = firebase.auth().currentUser;
  const signOut = () => {
    // Sign-out successful.
    const {navigate} = props.navigation
    Alert.alert(
      'Log out',
      'Do you want to logout?',
      [
        {text: 'Cancel'},
        {text: 'Confirm', onPress: () => {
          firebase.auth().signOut()
          navigate('phoneauth')
        }},
      ],
      { cancelable: true }
    )
}
    return(
    // <DrawerContentScrollView {...props}>
    <ScrollView>
      <View
      style={{
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {user ? <Text>Welcome, {user.email}</Text> :<Text>Welcome Guest</Text>}
    </View>
      <DrawerItemList {...props} />
      {user==null ?<Button title='Login' onPress={()=>props.navigation.navigate('login')}></Button>:<Button title='SignOut' onPress={signOut}></Button>}
    </ScrollView>
    
    )
}
const styles = StyleSheet.create({
  txttocenter:{
      textAlign:'center'
  },
  iconsize:{
      width:66,
      height:50,
      marginLeft:'auto',
      marginRight:'auto'
  }
})
