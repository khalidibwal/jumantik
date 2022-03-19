// import * as firebase from 'firebase/app';
// import firestore from 'firebase/compat/firestore'
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import 'firebase/auth'
import firebase from "firebase/app";
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB92SlhBUmboyz2fHhbZmNiIGWlkIu098E",
    authDomain: "brantasdb.firebaseapp.com",
    databaseURL: "https://brantasdb-default-rtdb.firebaseio.com",
    projectId: "brantasdb",
    storageBucket: "brantasdb.appspot.com",
    messagingSenderId: "931123248743",
    appId: "1:931123248743:web:23dceffd1362b9b6aa1ec2",
    measurementId: "G-D0W5KXXY7Z"
  };


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

firebase.firestore()

export default firebase;