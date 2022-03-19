import React, {useEffect, useState} from 'react'
import {View, FlatList, Text, StyleSheet, Button, Image} from 'react-native'
import { db, auth } from '../../config/Brantas';
import { Card } from 'react-native-elements';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

class History extends React.Component{
    constructor(){
        super()
        this.state={
            UserData:[]
        }
    }
     exportDataToExcel = async() => {


    var ws = XLSX.utils.json_to_sheet(this.state.UserData);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cities");
    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });
    const uri = FileSystem.cacheDirectory + 'Jumantik.xlsx';
    console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64
    });
    
    await Sharing.shareAsync(uri, {
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      dialogTitle: 'MyWater data',
      UTI: 'com.microsoft.excel.xlsx'
    });
  
    }

    componentDidMount(){
        const subscriber = db
          .collection('activityDb')
          .where('id','==', auth.currentUser.uid)
          .onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            
            this.setState({UserData:users})
          });
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }
    render(){
        return(
            <View>
               {this.state.UserData === [] ? <Text style={Styles.fontCard}>No Recent Activity</Text> : 
               <FlatList
               data={this.state.UserData}
               renderItem={({ item }) => (
                 <Card containerStyle={{  flex: 1, borderRadius:10}}>
                   <Card.Title>HASIL FOTO</Card.Title>
                   <Card.Divider />
                   <Image source={{ uri: item.images }} style={{width: 'auto', height: 200}}/>
                   <Card.Title>DATA JENTIK</Card.Title>
                   <Card.Divider />
                   {/* <Card.Title>ID: {item.id}</Card.Title> */}
                   <Card.Title>TANGGAL: {item.datetime}</Card.Title>
                   <Card.Title>USERNAME: {item.fullname}</Card.Title>
                   <Card.Title>E-MAIL: {item.email}</Card.Title>
                   <Card.Title>ALAMAT: {item.address}</Card.Title>
                   <Card.Title>RT: {item.rt}</Card.Title>
                   <Card.Title>RW: {item.rw}</Card.Title>
                   <Card.Title>WADAH: {item.wabah}</Card.Title>
                   <Card.Title>TIPE: {item.tipe}</Card.Title>
                   <Button title='Export Data' onPress={()=> this.exportDataToExcel()}/>
                 </Card>
               )}
             />
               }
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    fontCard:{
        textAlign:'left'
    }
})

export default History