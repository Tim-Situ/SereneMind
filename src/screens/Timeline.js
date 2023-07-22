import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import React from 'react';

import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const location = 'Timeline';

const Timeline = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Timeline" btnLeft="disabled" btnRight="disabled" />
      <View style={{flex: 1}}>
        <View style={styles.create}>
          <Image
            style={styles.image}
            source={require('../images/user.png')}
          />
          <TextInput style={{marginLeft: 25}} placeholder='Tulis cerita...'/>  
          <View style={{justifyContent: 'center', marginLeft: 160}}>
             <Image style={{width: 25, height: 25}} source={require('../images/paper-plane.png')} />
          </View>
        </View>
        <View style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center'}}>
          <Image style={{marginTop: 2}} source={require('../images/camera.png')}/>
          <Text style={{marginLeft: 7,marginBottom: 5,color: '#7286D3'}}>Tambah gambar</Text>
        </View>

      </View>
      <BottomNav screenName={location} />
    </View>
  );
};

const styles = StyleSheet.create({
  create:{
    backgroundColor: 'white',
    width: '100%',
    marginTop: 25,
    flexDirection: 'row',
  },
  image:{
    marginLeft: 25,
    marginTop: 25,
    marginBottom: 25,
    width: 60,
    height: 60,
  }
});

export default Timeline;
