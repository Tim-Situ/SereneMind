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
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';

import {BASE_URL} from '../config';

const Login = () => {
  const navigation = useNavigation();
  const {session} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = (email, password) => {
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
      login();
    }
  };

  const login = () => {
    axios
      .post(`${BASE_URL}/login`, {
        email,
        password,
      })
      .then(res => {
        console.log(res.data);
        AsyncStorage.setItem('userToken', res.data.token);
        session();
      })
      .catch(err => {
        Alert.alert(
          'Login Gagal!',
          'Periksa kembali email dan password anda, kemudian coba login kembali.',
          [
            {
              text: 'Coba lagi',
              style: 'cancel',
            },
          ],
        );
      });
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View style={{flex: 1, backgroundColor: '#F5F5F7', padding: 20}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{marginBottom: 15}}
              source={require('../images/starter-logo.png')}
            />
            <Text style={styles.loginTitle}>Hai, login dulu yuk!</Text>
            <Text style={styles.loginCaption}>
              Seren akan mendengarkan semua masalah yang kamu hadapi.
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.defaultInputText}>Email</Text>
            <TextInput
              style={styles.defaultInput}
              placeholder="Masukan email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <Text style={styles.defaultInputText}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.defaultInput}
              placeholder="Masukan password"
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => validation(email, password)}>
            <Text style={{color: '#FFFFFF'}}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredFooter}>
          <Text style={styles.footerText}>Belum punya akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome1')}>
            <Text style={styles.footerLink}>Daftar disini</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginTitle: {
    color: '#7286D3',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  loginCaption: {
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

export default Login;
