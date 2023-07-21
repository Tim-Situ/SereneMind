import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import Header from '../components/Header';

const Settings = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Pengaturan" btnLeft="enabled" btnRight="disabled" />
      <View style={{flex: 1}}></View>
      <TouchableOpacity style={styles.btnPrimary}>
        <Text style={{color: '#FFFFFF'}}>Simpan</Text>
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
  },
});

export default Settings;
