
import firebase from 'firebase/app'
import 'firebase/auth'

import uuid from 'uuid';
class FirebaseSvc {
  constructor() {
    if (!firebase.app.length) { //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyB92SlhBUmboyz2fHhbZmNiIGWlkIu098E",
        authDomain: "brantasdb.firebaseapp.com",
        databaseURL: "https://brantasdb-default-rtdb.firebaseio.com",
        projectId: "brantasdb",
        storageBucket: "brantasdb.appspot.com",
        messagingSenderId: "931123248743",
        appId: "1:931123248743:web:23dceffd1362b9b6aa1ec2",
        measurementId: "G-D0W5KXXY7Z"
      });
     }
  }
login = async(user, success_callback, failed_callback) => {
     await firebase.auth()
       .signInWithEmailAndPassword(user.email, user.password)
     .then(success_callback, failed_callback);
  }
  createAccount = async (user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(function() {
        console.log("created user successfully. User email:" + user.email + " name:" + user.name);
        var userf = firebase.auth().currentUser;
        userf.updateProfile({ displayName: user.name})
        .then(function() {
          console.log("Updated displayName successfully. name:" + user.name);
          alert("User " + user.name + " was created successfully. Please login.");
        }, function(error) {
          console.warn("Error update displayName.");
        });
      }, function(error) {
        console.error("got error:" + typeof(error) + " string:" + error.message);
        alert("Create account failed. Error: "+error.message);
      });
  }
  onLogout = user => {
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log("An error happened when signing out");
    });
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('Messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.ref.push(message);
    }
  };

  refOff() {
    this.ref.off();
  }
}


const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;