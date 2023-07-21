import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

import Header from '../components/Header';

const EditProfile = () => {
  const {userProfile} = useContext(AuthContext);
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Edit Profil" btnLeft="enabled" btnRight="disabled" />
      <View style={{alignItems: 'center', padding: 20}}>
        <Image source={require('../images/profile.png')} />
      </View>
      <View style={{padding: 20, justifyContent: 'center'}}>
        <Text style={styles.defaultInputText}>Nama</Text>
        <TextInput
          style={styles.defaultInput}
          placeholder="Masukan nama"
          value={userProfile.name}
        />
        <Text style={styles.defaultInputText}>Email</Text>
        <TextInput
          style={styles.defaultInput}
          placeholder="Masukan email"
          value={userProfile.email}
        />
      </View>
      <TouchableOpacity style={styles.btnSecondary}>
        <Text style={{color: '#7286D3'}}>Ganti Password</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}></View>
      <TouchableOpacity style={styles.btnPrimary}>
        <Text style={{color: '#FFFFFF'}}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  btnSecondary: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderColor: '#7286D3',
    borderWidth: 1,
  },
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

export default EditProfile;
