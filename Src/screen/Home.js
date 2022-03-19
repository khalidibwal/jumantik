

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  PermissionsAndroid
} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1,  title: "Profile",      color:"#FF4500", image:"https://img.icons8.com/color/70/000000/name.png", navigator:'Profile'},
        {id:2,  title: "Activity",     color:"#87CEEB", image:"https://img.icons8.com/office/70/000000/home-page.png", navigator:'activity'},
        {id:5,  title: "Friends",  color:"#FF69B4", image:"https://img.icons8.com/color/70/000000/groups.png"} ,
        {id:6,  title: "School",   color:"#00BFFF", image:"https://img.icons8.com/color/70/000000/classroom.png"} ,
        {id:7,  title: "Things",   color:"#00FFFF", image:"https://img.icons8.com/dusk/70/000000/checklist.png"} ,
        {id:8,  title: "World",    color:"#20B2AA", image:"https://img.icons8.com/dusk/70/000000/globe-earth.png"} ,
        {id:9,  title: "Remember", color:"#191970", image:"https://img.icons8.com/color/70/000000/to-do.png"} ,
        {id:10, title: "Game",     color:"#008080", image:"https://img.icons8.com/color/70/000000/basketball.png"} ,
      ],
      banner:[
        require('../../assets/image/banner/3m.jpg'),
        require('../../assets/image/banner/3m.jpeg'),
        require('../../assets/image/banner/3m.jpeg'),
        ]
    };
  }
  

 requestLocationPermission = async () => {
    try {
      let isPermitedAccessLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if(!isPermitedAccessLocation){
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "Jumantik, Needs Access To your Location To Collect Data from User",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You have access to Location");
      } else {
        props.navigation.navigate('Home')
        console.log("Location permission denied");
      }
    }
    }
     catch (err) {
      console.warn(err);
    }
  };

  componentDidMount(){
    this.requestLocationPermission();
  }

  clickEventListener(item) {
    if(item.navigator === undefined){
      Alert.alert(
        'Maintenance',
        'Fitur Dalam Perbaikan',
        [
          {
            text: 'Close',
            onPress: () => console.log('Failed')
          },
        ],
        {cancelable: false},
      );
    }
    else{
      this.props.navigation.navigate(item.navigator)
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
          <SliderBox
                images={this.state.banner}
                autoplay
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                circleLoop
                resizeMethod={'resize'}
                sliderBoxHeight={200}
                />
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {this.clickEventListener(item)}}>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={[styles.title, {color:item.color}]}>{item.title}</Text>
                  </View>
                </View>
              </View>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:1,
    backgroundColor:'#fff',
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#fff",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor:"#e2e2e2",
    //flexBasis: '42%',
    width:120,
    height:120,
    borderRadius:60,
    alignItems:'center',
    justifyContent:'center'
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 50,
    width: 50,
    alignSelf:'center'
  },
  title:{
    fontSize:24,
    flex:1,
    alignSelf:'center',
    fontWeight:'bold'
  },
});     