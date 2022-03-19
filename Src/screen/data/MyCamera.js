
import React from 'react';
import {
  ActivityIndicator,
  Button,
  Pressable,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  CameraRoll,
} from 'react-native';
import { Constants, Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import * as firebase from 'firebase';
import { db } from '../../config/Brantas';
import Expo from 'expo';

console.disableYellowBox = true;

const url =
  'https://firebasestorage.googleapis.com/v0/b/blobtest-36ff6.appspot.com/o/Obsidian.jar?alt=media&token=93154b97-8bd9-46e3-a51f-67be47a4628a';

const firebaseConfig = {
  apiKey: "AIzaSyBFU3BoTliLLGnDUOn46jA3yCAp1fyeQf4",
  authDomain: "myhajj-cloud-book-signin.firebaseapp.com",
  databaseURL: "https://myhajj-cloud-book-signin.firebaseio.com",
  projectId: "myhajj-cloud-book-signin",
  storageBucket: "myhajj-cloud-book-signin.appspot.com",
  messagingSenderId: "283941379992"  
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class MyCamera extends React.Component {
  state = {
    image: null,
    uploading: false,
  };
  
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;

    return (
      <View 
        ref={ref => (this.screenshotIt = ref)}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            Please Upload The Image
          </Text>
        )}

        <Pressable style={Styles.button} onPress={this._pickImage} >
            <Text>PICK AN IMAGE</Text>
        </Pressable>
        <Pressable style={Styles.button} onPress={this._takePhoto}>
            <Text>TAKE PHOTO</Text>
        </Pressable>

        {/* <Button onPress={this._takeScreenshot} title="Take a screenshot" /> */}

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takeScreenshot = async () => {
    console.log("pre..");
    this.screenshotIt;
    console.log(this.screenshotIt);
    console.log("pre.2");
    let ss = await Expo.takeSnapshotAsync(this.screenshotIt, {
      format: 'png',
      quality: 0.6,
      result: 'file',
      // width: Dimensions.get('screen').width,
      // height: Dimensions.get('screen').height,
      // snapshotContentContainer: true,
    });
    console.log("taking a snap");
    await CameraRoll.saveToCameraRoll(ss, 'photo');
    this._handleImagePicked(ss);
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log("taking a photo");
    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log("just picking... ");  
    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        db.collection('activityDb')
        .doc(firebase.auth().currentUser.uid)
        .update({ images:uploadUrl})
        alert('Photo Saved')
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();

}

const Styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 4,
    elevation: 3,
    marginBottom:5,
  },
})

