import React from "react";
import {View, Image, StyleSheet} from 'react-native'

const TitleHeader = () =>{
    return(
        <View>
            <Image style={Styles.iconSize} source={require('../../../assets/image/loading/loading.png')}/>
        </View>
    )
}

const Styles = StyleSheet.create({
    iconSize:{
        width:100,
        height:100,
        marginLeft:70,
        marginRight:80,
    }
})


export default TitleHeader