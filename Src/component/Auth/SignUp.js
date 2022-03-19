

import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'

import { Button, Alert, StyleSheet, Text, View, TextInput, ActivityIndicator, Image } from 'react-native';


class SignUp extends Component {

  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false,
      NIK:0,
      address:'',
      phone:''
    }
  }

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ email: text })
      return false;
    }
    else {
      this.setState({ email: text })
      console.log("Email is Correct");
    }
  }

  onTextChange = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addUser = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(this.state.email) === false){
        Alert.alert('Email Format False');
    }
    else if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter correct details.')
    }
    else if(this.state.phone === '' && this.state.NIK === 0){
      Alert.alert('column should not be emptied.')
    }
    else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        this.setState({isLoading:false})
        if(error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
          this.props.navigation.navigate('login')
        }
      })
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        const uid = firebase.auth().currentUser.uid
        const db = firebase.firestore();
        db.collection("activityDb")
          .doc(uid)
          .set({
            id: uid,   
            email: this.state.email,
            fullname : this.state.displayName,
            NIK : this.state.NIK,
            phone: this.state.phone
          })
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Home')
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loading}>
           <Image style={styles.loginLogo} source={require('../../../assets/image/loading/loading.png')}/> 
           <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }    
    return (
      <View style={styles.formWrapper}>  
        <TextInput
          style={styles.formField}
          placeholder="NIK"
          value={this.state.NIK}
          keyboardType='numeric'
          onChangeText={(val) => this.onTextChange(val, 'NIK')}
        />      
        <TextInput
          style={styles.formField}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.onTextChange(val, 'displayName')}
        />      
        <TextInput
          style={styles.formField}
          placeholder="Email"
          value={this.state.email}
          keyboardType='email-address '
          onChangeText={(val) => this.onTextChange(val, 'email')}
        />
        <TextInput
          style={styles.formField}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.onTextChange(val, 'password')}
          maxLength={20}
          secureTextEntry={true}
        />     
        <TextInput
          style={styles.formField}
          placeholder="Telepon"
          value={this.state.phone}
          onChangeText={(val) => this.onTextChange(val, 'phone')}
          keyboardType='numeric'
          maxLength={20}
        />   

        <Button
          color="blue"
          title="Signup"
          onPress={() => this.addUser()}
        />        

        <Text 
          style={styles.redirectText}
          onPress={() => this.props.navigation.navigate('login')}>
          Already have account ? Signin
        </Text>                          
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 30,
    backgroundColor: '#fff',    
    flexDirection: "column",
  },
  formField: {
    width: '100%',
    alignSelf: "center",
    borderColor: "#444",
    borderBottomWidth: 1,    
    marginBottom: 20,
    paddingBottom: 20,
  },
  redirectText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 24,    
  },
  loading: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loginLogo:{
    width:300,
    height:200
  }
});

export default SignUp;