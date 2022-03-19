import React from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import { Card, Input, Button} from 'react-native-elements'

export default class Activity extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            address:'',
            rt:0,
            rw:0,
            nameError:null,
            addError:null,
            rtError:null,
            rwError:null,
        }
    }


    gotoPlague = () =>{
        if (this.state.name.trim() === "") {
            this.setState(() => ({ nameError: "Nama Wajib Di Isi" }));
          }
        else if(this.state.address.trim() === ""){
            this.setState(() => ({ addError: "Alamat Wajib Di Isi" }));
        }  
        else if(this.state.rt.trim() === ""){
            this.setState(() => ({ rtError: "RT Wajib Di Isi" }));
        }  
        else if(this.state.rw.trim() === ""){
            this.setState(() => ({ rwError: "RW Wajib Di Isi" }));
        }  
          else {
            this.setState(() => ({ nameError: null, addError: null, rtError:null, rwError:null }));
            this.props.navigation.navigate('plague',  
        { name: this.state.name, address: this.state.address, rt: this.state.rt, rw: this.state.rw}
        )
          }
        
    }
    onTextChange = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
    render(){
        return(
            <ScrollView>
                <Card containerStyle={{borderRadius:10}}>
                    <Card.Title>BIODATA</Card.Title>
                    <Input
                        name='name'
                        placeholder='Nama Pemilik Rumah'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        value={this.state.name}
                        onChangeText={text => this.setState({name:text})} 
                    />
                    {!!this.state.nameError && (
                    <Text style={Styles.errvalidate}>{this.state.nameError}</Text>
                    )}
                    <Input
                        name='address'
                        placeholder='Alamat Lengkap'
                        leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
                        value={this.state.address}
                        onChangeText={(val) => this.onTextChange(val, 'address')}
                    />
                    {!!this.state.addError && (
                    <Text style={Styles.errvalidate}>{this.state.addError}</Text>
                    )}
                    <Input
                        name='rt'
                        placeholder='RT'
                        value={this.state.rt}
                        keyboardType='numeric'
                        onChangeText={(val) => this.onTextChange(val, 'rt')}
                    />
                    {!!this.state.rtError && (
                    <Text style={Styles.errvalidate}>{this.state.rtError}</Text>
                    )}
                    <Input
                        name='rw'
                        placeholder='RW'
                        value={this.state.rw}
                        keyboardType='numeric'
                        onChangeText={(val) => this.onTextChange(val, 'rw')}
                    />
                    <Button title='Selanjutnya' onPress={()=> this.gotoPlague()} />
                </Card>
            </ScrollView>
        )
    }
}

const Styles = StyleSheet.create({
    errvalidate:{
        color:'red',
        textAlign:'center'
    }
})