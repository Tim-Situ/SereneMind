import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Flow} from 'react-native-animated-spinkit';
import {AuthContext} from '../context/AuthContext';

const Splash = () => {
  const {session} = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      session();
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#8EA7E9'}}>
      <StatusBar backgroundColor={'#8EA7E9'} barStyle={'light-content'} />
      <View style={styles.splashLogo}>
        <Image source={require('../images/splash-logo.png')} />
      </View>
      <View style={styles.centeredItem}>
        <Flow size={48} color="#ffffff" />
        <Text style={styles.loadingText}>Memuat...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 20,
  },
});

export default Splash;
