import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Welcome2 = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  const goSignUp = () => {
    if (username == '' || username == ' ') {
      Alert.alert('Input tidak valid', 'Nama tidak boleh kosong!', [
        {
          text: 'Coba Lagi',
          style: 'cancel',
        },
      ]);
    } else {
      navigation.navigate('SignUp', {name: username});
    }
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View style={{flex: 1, backgroundColor: '#F5F5F7', padding: 20}}>
        <StatusBar backgroundColor={'#F5F5F7'} barStyle={'dark-content'} />
        <View style={styles.flexCenter}>
          <Image
            style={{marginBottom: 15}}
            source={require('../images/starter-logo.png')}
          />
          <Text style={styles.welcomingTitle}>Kenalan dulu yuk!</Text>
          <Text style={styles.welcomingCaption}>
            Aku adalah teman mu! Supaya kita lebih akrab mari kita berkenalan
            dulu. <Text style={{fontWeight: 'bold'}}>Siapa nama mu?</Text>
          </Text>
          <TextInput
            style={styles.defaulInput}
            placeholder="Masukan nama mu"
            onChangeText={text => setUsername(text)}
          />
          <TouchableOpacity style={styles.btnNext} onPress={() => goSignUp()}>
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
    </ScrollView>
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
    marginBottom: 50,
    textAlign: 'center',
  },
  defaulInput: {
    backgroundColor: '#FFFFFF',
    marginBottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 2,
    width: '100%',
    fontSize: 16,
    color: '#313131',
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

export default Welcome2;
