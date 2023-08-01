import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import axios from 'axios';

import {BASE_URL} from '../config';

const SignUp = ({route}) => {
  const navigation = useNavigation();
  const {name} = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => {
    if (email == '' || email == ' ' || password == '' || password == ' ') {
      Alert.alert(
        'Input tidak valid',
        'Email dan password tidak boleh kosong!',
        [
          {
            text: 'Coba Lagi',
            style: 'cancel',
          },
        ],
      );
    } else {
      signup();
    }
  };

  const signup = () => {
    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      })
      .then(res => {
        Alert.alert(
          'Reistrasi Berhasil',
          'Silahkan login menggunakan akun yang telah di daftarkan.',
          [
            {
              text: 'Login',
              onPress: () => navigation.dispatch(StackActions.replace('Login')),
            },
          ],
        );
      })
      .catch(err => {
        Alert.alert('Registrasi Gagal', 'Silahkan coba kembali.', [
          {
            text: 'Coba lagi',
            style: 'cancel',
          },
        ]);
      });
  };

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#F5F5F7', padding: 20}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{marginBottom: 15}}
              source={require('../images/starter-logo.png')}
            />
            <Text style={styles.signUpTitle}>Selangkah lagi!</Text>
            <Text style={styles.signUpCaption}>
              Halo {name}! yuk selesaikan pendaftaranmu. Jangan sampai riwayat
              percakapan kita <Text style={{fontWeight: 'bold'}}>hilang.</Text>
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.defaultInputText}>Email</Text>
            <TextInput
              style={styles.defaultInput}
              placeholder="Masukan nama"
              onChangeText={text => setEmail(text)}
            />
            <Text style={styles.defaultInputText}>Password</Text>
            <TextInput
              style={styles.defaultInput}
              placeholder="Masukan password"
              onChangeText={text => setPassword(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => validation()}>
            <Text style={{color: '#FFFFFF'}}>Daftar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredFooter}>
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
  signUpTitle: {
    color: '#7286D3',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  signUpCaption: {
    color: '#313131',
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
  defaultInput: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 2,
    fontSize: 16,
    color: '#313131',
    marginBottom: 20,
  },
  defaultInputText: {
    color: '#313131',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  btnPrimary: {
    backgroundColor: '#7286D3',
    height: 50,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  centeredFooter: {
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

export default SignUp;
