import { View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

export default function Personalisation({navigation}) {
  return (
    <View style={styles.root}>
        <View style={[styles.root, {flex: 1}]}>
            <Text style={styles.titleText}>Personalisasi</Text>
            <Text style={styles.blackText}>Hai Elsa, yuk beritahu aku apa masalah </Text>
            <Text style={{color: '#313131', fontFamily: 'Roboto-Regular', fontSize: 16,}}>yang kamu alami! Seren siap membantumu.</Text>
            <View style={[styles.item, {marginTop: 35}]}>
                <View style={styles.card}>
                    <Image source={require('../../assets/images/cemas.png')} />
                </View>
                <View style={styles.card}>
                    <Image source={require('../../assets/images/depresi.png')} />
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.card}>
                    <Image source={require('../../assets/images/stress.png')} />
                </View>
                <View style={styles.card}>
                    <Image source={require('../../assets/images/kehilangan.png')} />
                </View>
            </View>
        </View>
        
        <TouchableOpacity style={styles.button}>
            <Text style={{color: "#fff"}}>Pilih</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f5f5f7', 
    flexDirection: 'column', 
    height: '100%',
    alignItems: 'center',
  },
  mid:{
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
  },
  button:{
    bottom: 26,
    backgroundColor: '#7286D3', 
    width:'90%', 
    height: 50,
    borderRadius: 15,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  titleText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    color: '#7286D3',
    marginTop: 25,
  },
  blackText: {
    color: '#313131',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginTop: 25,
  },
  item: {
    flexDirection: 'row',
  },
  card:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    margin: 20,
  }
});