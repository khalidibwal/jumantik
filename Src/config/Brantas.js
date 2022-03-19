import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyB92SlhBUmboyz2fHhbZmNiIGWlkIu098E",
    authDomain: "brantasdb.firebaseapp.com",
    databaseURL: "https://brantasdb-default-rtdb.firebaseio.com",
    projectId: "brantasdb",
    storageBucket: "brantasdb.appspot.com",
    messagingSenderId: "931123248743",
    appId: "1:931123248743:web:23dceffd1362b9b6aa1ec2",
    measurementId: "G-D0W5KXXY7Z"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };