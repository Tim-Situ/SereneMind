import { View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

export default function App({navigation}) {
  return (
    <View style={styles.root}>
        <View style={styles.mid}>
            <Image style={{justifyContent: 'center', alignItems: 'center'}} source={require('../../assets/images/Logo.png')}/>
            <Text style={styles.titleText}>Hai, aku Seren!</Text>
            <Text style={styles.blackText}>Disini aku akan memenemani</Text>
            <Text style={{color: '#313131',fontFamily: 'Roboto-Regular',fontSize: 16,}}>menenangkan pikiranmu!</Text>
             <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <Image style={{marginTop: 75}} source={require('../../assets/images/Tombol.png')}/>
            </TouchableOpacity>
        </View>
       
        <Text style={{bottom: 38,color: '#7286D3', fontSize: 16, fontFamily: 'Roboto-Regular'}}>Sudah punya akun?</Text>
       
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
  absoluteView: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
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
  }
});