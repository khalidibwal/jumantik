import React, {useState, useRef} from 'react';
import {Text, TextInput, TouchableOpacity, View, Alert, StyleSheet} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { db } from '../../config/Brantas';
import firebase from 'firebase/app';

const PhoneAuth = (props) => {
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const sendVerification = () => { 
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
   };
  const confirmCode = () => { 
    const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );

      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          // Do something with the results here
          props.navigation.navigate('Home');
          console.log('resultsss',result);
        })
        .catch(function(error){
            Alert.alert(`${error.message}`)
        })
   };

  return (

<View style={styles.container}>
    <TextInput
      placeholder="Contoh: +620812345"
      onChangeText={setPhoneNumber}
      keyboardType="phone-pad"
      autoCompleteType="tel"
      style={styles.inputStyle}
    />
    <TouchableOpacity onPress={sendVerification} style={styles.appButtonContainer}>
      <Text>Send Verification</Text>
    </TouchableOpacity>

    <TextInput
      placeholder="Confirmation Code"
      onChangeText={setCode}
      keyboardType="number-pad"
      style={styles.inputStyle}
    />
    <TouchableOpacity onPress={confirmCode} style={styles.appButtonContainer}>
      <Text>Send SMS OTP Verification</Text>
    </TouchableOpacity>
    <FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
      firebaseConfig={firebase.app().options}
    />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
      },
      appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom:15
      },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
      },
  });

export default PhoneAuth;