import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Welcome1 = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7', padding: 20}}>
      <StatusBar backgroundColor={'#F5F5F7'} barStyle={'dark-content'} />
      <View style={styles.flexCenter}>
        <Image
          style={{marginBottom: 15}}
          source={require('../images/starter-logo.png')}
        />
        <Text style={styles.welcomingTitle}>Hai, aku Serene!</Text>
        <Text style={styles.welcomingCaption}>
          Di aplikasi ini aku akan menjadi teman mengobrol untuk menenangkan
          pikiran mu!
        </Text>
        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => navigation.navigate('Welcome2')}>
          <Icon name="arrow-right" size={30} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
      <View style={styles.centerFooter}>
        <Text style={styles.footerText}>Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Login disini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomingTitle: {
    color: '#7286D3',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  welcomingCaption: {
    color: '#313131',
    fontSize: 16,
    marginBottom: 75,
    textAlign: 'center',
  },
  btnNext: {
    backgroundColor: '#7286D3',
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#313131',
  },
  footerLink: {
    fontSize: 16,
    color: '#7286D3',
    fontWeight: 'bold',
  },
});

export default Welcome1;
