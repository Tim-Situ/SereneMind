import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Personalize = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7', padding: 20}}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: '#7286D3',
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          Personalisasi
        </Text>
        <Text
          style={{
            color: '#313131',
            fontSize: 16,
            marginBottom: 25,
            textAlign: 'center',
          }}>
          Hai Fauzein, yuk beritahu aku apa masalah yang kamu alami! Seren siap
          membantumu.
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}></View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#7286D3',
            width: '100%',
            height: 50,
            borderRadius: 10,
            elevation: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#FFFFFF'}}>Pilih</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Personalize;
