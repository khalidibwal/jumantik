import React from 'react'
import {View, StyleSheet, Button} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; 

const spesLocate = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}
class LocateMap extends React.Component{
    render(){
        return(
<>
    <View style={styles.container}>
            <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={spesLocate}
            mapType='hybrid'
            >
                <Marker coordinate={spesLocate}/>
            </MapView>
        
   </View>
   <Button title='Next'/>
</>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 900,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
export default LocateMap

