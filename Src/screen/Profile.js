import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { db, auth } from '../config/Brantas';
import { Card, Input, Button} from 'react-native-elements'
import firebase from 'firebase/app';
import 'firebase/auth'
export default class Profile extends Component {
  constructor(){
    super()
    this.state = {
      UserData:[]
    }
  }
  componentDidMount(){
    const subscriber = db
      .collection('activityDb')
      .where('id','==', auth.currentUser.uid)
      .onSnapshot(querySnapshot => {
        const users = [];
  
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        
        this.setState({UserData:users})
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
}

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          {this.state.UserData === [] ? <Text>No Recent Activity</Text> : 
               <FlatList
               data={this.state.UserData}
               renderItem={({ item }) => (
                <View style={styles.body}>
            <Card containerStyle={{borderRadius:10}}>
                  <Card.Title>
                      NIK : {item.NIK}
                  </Card.Title>
                  <Card.Title>
                      Name : {item.fullname}
                  </Card.Title>
                  <Card.Title>
                      Alamat : {item.address}
                  </Card.Title>
                  <Card.Title>
                      Email : {item.email}
                  </Card.Title>
                  <Card.Title>
                      Telepon : {item.phone}
                  </Card.Title>
              </Card>
        </View>
               )}
             />
              }
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:10,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
