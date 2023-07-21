import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/Header';

const Help = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Bantuan" btnLeft="enabled" btnRight="disabled" />
      <View style={{flex: 1}}></View>
      <TouchableOpacity style={styles.btnPrimary}>
        <Icon name="whatsapp" size={20} color={'#ffffff'} />
        <Text style={{color: '#FFFFFF', marginLeft: 10}}>Hubungi Kami</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: '#7286D3',
    height: 50,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    flexDirection: 'row',
  },
});

export default Help;
