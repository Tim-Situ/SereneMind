import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import React, { useState } from 'react'

export default function Registration({navigation}) {
  const onPressNama = () => {
    navigation.navigate('Personalisation')
  };
  const [name, setName]= useState('');

  return (
    <View style={styles.root}>
        <View style={styles.mid}>
            <Image style={{justifyContent: 'center', alignItems: 'center'}} source={require('../../assets/images/Logo.png')}/>
            <Text style={styles.titleText}>Kenalan dulu yuk!</Text>
            <Text style={styles.blackText}>Percakapan kita adalah privasi,</Text>
            <Text style={{color: '#313131',fontFamily: 'Roboto-Regular',fontSize: 16,}}>jadi
              ayo berkenalan terlebih dahulu.</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                onChangeText={value => setName(value)}
                placeholder="Masukkan nama"
                placeholderTextColor="#003f5c"
              />
            </View>
            <TouchableOpacity onPress={onPressNama}>
                <Image style={{marginTop: 75}} source={require('../../assets/images/Tombol.png')}/>
            </TouchableOpacity>
        </View>       
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f5f5f7', 
    flexDirection: 'column', 
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  mid:{
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
   
  },
  titleText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    color: '#7286D3'
  },
  blackText: {
    color: '#313131',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginTop: 25,
  },
  inputView:{
    width:340,
    backgroundColor:"#ffffff",
    borderRadius:25,
    height:50,
    marginTop: 25,
    marginBottom:25,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
  },
});