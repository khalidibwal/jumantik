import * as React from 'react';
import {Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from '../Src/screen/Home';
import Activity from '../Src/screen/Activity'
import Menu from '../Src/component/Drawer/Menu';
import SignUp from '../Src/component/Auth/SignUp';
import Login from '../Src/component/Auth/Login';
import Plague from '../Src/screen/data/Plague';
import Profile from '../Src/screen/Profile';
import MyCamera from '../Src/screen/data/MyCamera'
import LocateMap from '../Src/screen/data/LocateMap';
import TitleHeader from '../Src/component/Head/TitleHeader';
import History from '../Src/screen/data/History';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

function myDrawer(){
  return(
      <Drawer.Navigator
      screenOptions={{headerShown:true, headerTitle: ()=><TitleHeader />}} 
      drawerContent={(props) => <Menu {...props} navigate={props.navigation} /> }>
          <Drawer.Screen name='Home' component={Home}
          options={{drawerIcon:()=>(
            <Image source={require('../assets/image/icon/home.png')}
            style={{width:50, height:50}}/>
          )}} />
          <Drawer.Screen name='activity' component={Activity}
          options={{title:'Aktifitas', drawerIcon:()=>(
            <Image source={require('../assets/image/icon/active.png')}
            style={{width:50, height:50}}/>
          )}} />
          <Drawer.Screen name='Profile' component={Profile}
          options={{
            drawerIcon:()=>(
              <Image source={require('../assets/image/icon/profile.png')}
              style={{width:50, height:50}}/>
            )
          }} />
          <Drawer.Screen name='History' component={History}
          options={{
            drawerIcon:()=>(
              <Image source={require('../assets/image/icon/profile.png')}
              style={{width:50, height:50}}/>
            )
          }} />
          {/* <Drawer.Screen name='Camera' component={MyCamera} /> */}
      </Drawer.Navigator>
  )
}

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown:false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown:false }}
        />
        <Stack.Screen
          name="Home"
          component={myDrawer}
          options={{headerShown:false }}
        />
        <Stack.Screen name="plague" component={Plague}
        options={{title:'Isi Aktifitas'}} />
        <Stack.Screen name="activity" component={Activity} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Camera" component={MyCamera} />
        <Stack.Screen name="maps" component={LocateMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator