import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import { Card, Input, Button} from 'react-native-elements'
import { Dropdown } from 'react-native-element-dropdown';
import { auth,db } from '../../config/Brantas';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import MyCamera from './MyCamera';
  const data = [
    { label: 'Ya', value: 'ya' },
    { label: 'Tidak', value: 'tidak' },
  ];
  const jeniswabah = [
    { label: 'Bak Kamar Mandi', value: 'Bak Kamar Mandi' },
    { label: 'Kolam', value: 'Kolam' },
    { label: 'Garasi', value: 'garasi' },
    { label: 'Botol bekas', value: 'Botol bekas' },
    { label: 'Lain-lain', value: 'Lain-lain' },
  ];
  const tipetmpt = [
    { label: 'Indoor', value: 'Indoor' },
    { label: 'Outdoor', value: 'Outdoor' },
  ];
export default class Plague extends React.Component{
    constructor(){
        super()
        this.state={
            value:null,
            jeniswbh:null,
            tipe:null,
            jentikErr:null
        }
    }
    

    sendToDatabase = () =>{
      const username = this.props.route.params.name
      const address = this.props.route.params.address
      const rw = this.props.route.params.rw
      const rt = this.props.route.params.rt
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      if(this.state.value === null){
        this.setState(() => ({ jentikErr: "Kolom Harus Di Pilih" }));
      }
      else{
        this.setState(() => ({ jentikErr: null }));
        db.collection('activityDb')
        .doc(firebase.auth().currentUser.uid)
        .update({ address:address,
          datetime:date, 
          rt:rt, 
          rw:rw, 
          valuess:this.state.value,
          wabah:this.state.jeniswbh,
          tipe:this.state.tipe})
        alert('Success Send to Database')
        this.props.navigation.navigate('maps')
      }
      
    }
    
    render(){
        return(
            <ScrollView>
                <Card>
                    <Card.Title>ISI AKTIVITAS</Card.Title>
                    <Card.Divider />
                    <Card.Title>Apakah Terdapat Jentik ?</Card.Title>
                    <Dropdown
                        style={styles.dropdown}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        value={this.state.value}
                        onChange={item =>{
                            this.setState({value:item.value})
                        }}
                        />
                        {!!this.state.jentikErr && (
                    <Text style={styles.errvalidate}>{this.state.jentikErr}</Text>
                    )}
                    <Card.Title>Jenis Wadah</Card.Title>
                    <Dropdown
                        style={styles.dropdown}
                        data={jeniswabah}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        value={this.state.jeniswbh}
                        onChange={item =>{
                            this.setState({jeniswbh:item.value})
                        }}
                        />
                    <Card.Title>Tipe Tempat</Card.Title>
                    <Dropdown
                        style={styles.dropdown}
                        data={tipetmpt}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        value={this.state.tipe}
                        onChange={item =>{
                            this.setState({tipe:item.value})
                        }}
                        />
                    <Card.Title>Jumlah Wadah</Card.Title>
                    <Input
                        keyboardType='numeric'
                        placeholder='Jumlah Wadah'
                    />
                    {/* <MyCamera /> */}
                    <Button title='Ambil Foto' onPress={()=>this.props.navigation.navigate('Camera')}/>
                    <Card.Divider />
                    <Button title='Kirim Data' onPress={()=> this.sendToDatabase()} />
                </Card>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom:10
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    errvalidate:{
      color:'red',
      textAlign:'center'
    }
  });